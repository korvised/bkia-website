import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

const execAsync = promisify(exec);

// 512 MB – enough for typical airport DB dumps
const MAX_DUMP_BUFFER = 512 * 1024 * 1024;

export interface BackupInfo {
  fileName: string;
  sizeBytes: number;
  createdAt: string;
}

@Injectable()
export class BackupService {
  private readonly logger = new Logger(BackupService.name);
  private readonly backupDir: string;

  constructor() {
    this.backupDir = path.join(process.cwd(), 'backups');
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
      this.logger.log(`Backup directory created: ${this.backupDir}`);
    }
  }

  private getDbConfig() {
    return {
      host: process.env.DB_HOST ?? 'localhost',
      port: process.env.DB_PORT ?? '5432',
      user: process.env.DB_USER ?? 'postgres',
      pass: process.env.DB_PASS ?? '',
      name: process.env.DB_NAME ?? 'postgres',
      // When set, pg commands run via `docker exec <container>`.
      // No local pg client needed – pg_dump/psql come from the container.
      pgContainer: process.env.PG_CONTAINER ?? '',
      // Used only when PG_CONTAINER is empty (production image has pg client installed)
      pgDump: process.env.PG_DUMP_PATH ?? 'pg_dump',
      psql: process.env.PSQL_PATH ?? 'psql',
    };
  }

  // ── List ──────────────────────────────────────────────────────────────────

  async list(): Promise<BackupInfo[]> {
    const files = fs
      .readdirSync(this.backupDir)
      .filter((f) => f.endsWith('.sql') || f.endsWith('.sql.gz'))
      .sort()
      .reverse();

    return files.map((fileName) => {
      const stat = fs.statSync(path.join(this.backupDir, fileName));
      return { fileName, sizeBytes: stat.size, createdAt: stat.mtime.toISOString() };
    });
  }

  // ── Create ────────────────────────────────────────────────────────────────

  async create(): Promise<BackupInfo> {
    const now = new Date();
    const ts = now.toISOString().slice(0, 19).replace('T', '_').replace(/:/g, '-');
    const fileName = `backup_${ts}.sql`;
    const filePath = path.join(this.backupDir, fileName);
    const cfg = this.getDbConfig();

    try {
      if (cfg.pgContainer) {
        // ── docker exec: capture stdout, write locally ────────────────────
        // pg_dump writes to stdout (no -f flag) → captured by execAsync →
        // written to the local backups/ folder. Avoids all docker cp path issues.
        // encoding: 'buffer' keeps stdout as a Buffer so binary content
        // (bytea columns, non-UTF-8 encoding headers) is never mangled.
        const { stdout } = await execAsync(
          `docker exec -e PGPASSWORD="${cfg.pass}" ${cfg.pgContainer} pg_dump -h localhost -U "${cfg.user}" -d "${cfg.name}"`,
          { maxBuffer: MAX_DUMP_BUFFER, timeout: 5 * 60 * 1000, encoding: 'buffer' },
        );
        fs.writeFileSync(filePath, stdout);
      } else {
        // ── direct pg_dump: write to file ─────────────────────────────────
        await execAsync(
          `"${cfg.pgDump}" -h "${cfg.host}" -p ${cfg.port} -U "${cfg.user}" -d "${cfg.name}" -f "${filePath}"`,
          { env: { ...process.env, PGPASSWORD: cfg.pass }, timeout: 5 * 60 * 1000 },
        );
      }

      const stat = fs.statSync(filePath);
      this.logger.log(`Backup created: ${fileName} (${stat.size} bytes)`);
      return { fileName, sizeBytes: stat.size, createdAt: now.toISOString() };
    } catch (err: any) {
      this.logger.error(`Backup failed: ${err.message}`);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      throw new InternalServerErrorException(
        `Backup failed: ${err.stderr ?? err.message}`,
      );
    }
  }

  // ── Resolve path (with path-traversal guard) ──────────────────────────────

  resolve(fileName: string): string {
    const safe = path.basename(fileName);
    const filePath = path.join(this.backupDir, safe);
    if (!fs.existsSync(filePath)) throw new NotFoundException(`Backup not found: ${safe}`);
    return filePath;
  }

  // ── Delete ────────────────────────────────────────────────────────────────

  async delete(fileName: string): Promise<void> {
    const filePath = this.resolve(fileName);
    fs.unlinkSync(filePath);
    this.logger.log(`Backup deleted: ${fileName}`);
  }

  // ── Restore ───────────────────────────────────────────────────────────────

  async restoreFromBuffer(buffer: Buffer): Promise<void> {
    const tmp = path.join(this.backupDir, `restore_tmp_${Date.now()}.sql`);
    fs.writeFileSync(tmp, buffer);
    try {
      await this.runPsql(tmp);
    } finally {
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    }
  }

  async restoreFromExisting(fileName: string): Promise<void> {
    const filePath = this.resolve(fileName);
    await this.runPsql(filePath);
  }

  private async runPsql(sqlFile: string): Promise<void> {
    const cfg = this.getDbConfig();

    try {
      let stderr: string;

      if (cfg.pgContainer) {
        // ── docker exec: copy local file → container, run psql, cleanup ───
        const tmpInContainer = `/tmp/restore_${Date.now()}.sql`;

        // Forward-slash path for docker cp destination (works on all platforms)
        await execAsync(
          `docker cp "${sqlFile}" ${cfg.pgContainer}:${tmpInContainer}`,
          { timeout: 60 * 1000 },
        );

        ({ stderr } = await execAsync(
          `docker exec -e PGPASSWORD="${cfg.pass}" ${cfg.pgContainer} psql -h localhost -U "${cfg.user}" -d "${cfg.name}" -f "${tmpInContainer}"`,
          { timeout: 10 * 60 * 1000 },
        ));

        execAsync(`docker exec ${cfg.pgContainer} rm -f "${tmpInContainer}"`).catch(() => null);
      } else {
        // ── direct psql ───────────────────────────────────────────────────
        ({ stderr } = await execAsync(
          `"${cfg.psql}" -h "${cfg.host}" -p ${cfg.port} -U "${cfg.user}" -d "${cfg.name}" -f "${sqlFile}"`,
          { env: { ...process.env, PGPASSWORD: cfg.pass }, timeout: 10 * 60 * 1000 },
        ));
      }

      if (stderr) this.logger.warn(`psql stderr: ${stderr}`);
      if (stderr && /error:/i.test(stderr)) {
        throw new InternalServerErrorException(
          `Restore completed with errors: ${stderr.slice(0, 600)}`,
        );
      }

      this.logger.log(`Restore completed from: ${sqlFile}`);
    } catch (err: any) {
      if (err instanceof InternalServerErrorException) throw err;
      throw new InternalServerErrorException(
        `Restore failed: ${err.stderr ?? err.message}`,
      );
    }
  }
}
