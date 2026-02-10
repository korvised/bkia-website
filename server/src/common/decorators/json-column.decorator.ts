import { applyDecorators } from '@nestjs/common';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { IsArray, IsObject, ValidateNested } from 'class-validator';

type Constructor<T = object> = new (...args: any[]) => T;

export function IsJsonColumn(type: Constructor): PropertyDecorator {
  return applyDecorators(
    IsObject(),
    ValidateNested(),
    Type(() => type), // Keep this for metadata
    Transform(({ value }): unknown => {
      if (typeof value === 'string') {
        try {
          const parsed = JSON.parse(value) as Record<string, unknown>;
          // FORCE the plain object to become a Class Instance
          return plainToInstance(type, parsed);
        } catch {
          return value;
        }
      }

      // If it's already an object, ensure it's converted to an instance
      if (value && typeof value === 'object' && !(value instanceof type)) {
        return plainToInstance(type, value);
      }

      return value;
    }),
  ) as PropertyDecorator;
}

export function IsJsonArrayColumn(type: Constructor): PropertyDecorator {
  return applyDecorators(
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => type),
    Transform(({ value }): unknown => {
      if (typeof value === 'string') {
        try {
          // Cast to unknown first to satisfy ESLint
          const parsed = JSON.parse(value) as unknown;

          if (Array.isArray(parsed)) {
            return parsed.map((item: unknown) =>
              plainToInstance(type, item as object),
            );
          }
          return [plainToInstance(type, parsed as object)];
        } catch {
          return value;
        }
      }

      if (Array.isArray(value)) {
        return value.map((item: unknown) =>
          item instanceof type ? item : plainToInstance(type, item as object),
        );
      }

      return value;
    }),
  ) as PropertyDecorator;
}
