import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@/common/config';
import { RedisService } from '@/common/redis';
import { Employee } from '@/types/hrms';

@Injectable()
export class HrmsService {
  private readonly logger = new Logger(HrmsService.name);
  private readonly apiBaseUrl: string;
  private readonly apiKey: string;
  private readonly ttlSeconds: number;

  constructor(
    private readonly http: HttpService,
    private readonly redis: RedisService,
    private readonly configService: ConfigService,
  ) {
    this.apiBaseUrl = this.configService.get('igt.hrmsApiUrl');
    this.apiKey = this.configService.get('igt.hrmsApiKey');
    this.ttlSeconds = Number(600);
  }

  private async fetchEmployeeById(employeeId: string) {
    const url = `${this.apiBaseUrl}/api/v1/hrms/integration/employees/${employeeId}`;

    try {
      const { data } = await firstValueFrom(
        this.http.get<Employee>(url, {
          headers: {
            'x-api-key': this.apiKey,
          },
          params: { lang: 'en' },
          timeout: 8000,
        }),
      );

      return typeof data === 'object' && data !== null ? data : null;
    } catch (error) {
      this.logger.error(`Failed to fetch employee ${employeeId}: ${error}`);
      return null;
    }
  }

  async getEmployeeById(employeeId: string) {
    const key = `employee:${employeeId.trim()}`;
    // await this.redis.del(key);
    const cached = await this.redis.getJSON<Employee>(key);
    if (cached) return cached;

    const employee = await this.fetchEmployeeById(employeeId);
    if (employee) {
      await this.redis.setJSON(key, employee, this.ttlSeconds);
      return employee;
    }

    return null;
  }
}
