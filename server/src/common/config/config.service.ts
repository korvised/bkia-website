import { Injectable } from '@nestjs/common';
import { ConfigService as CfgService } from '@nestjs/config';
import { IConfig } from '@/types/config';

type Leaves<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never
        ? ''
        : `.${Leaves<T[K]>}`}`;
    }[keyof T]
  : never;

type LeafTypes<T, S extends string> = S extends `${infer T1}.${infer T2}`
  ? T1 extends keyof T
    ? LeafTypes<T[T1], T2>
    : never
  : S extends keyof T
    ? T[S]
    : never;

@Injectable()
export class ConfigService {
  constructor(private configService: CfgService) {}

  get<T extends Leaves<IConfig>>(propertyPath: T): LeafTypes<IConfig, T> {
    return this.configService.get(propertyPath)!;
  }
}
