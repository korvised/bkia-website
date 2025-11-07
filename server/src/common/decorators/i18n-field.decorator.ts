import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { Lang } from '@/types/language';

export function IsLocalizedObject(
  locales: readonly Lang[],
  opts?: ValidationOptions,
) {
  // Type guard: checks if a string is a Lang from the provided locales
  const isLang = (k: string): k is Lang =>
    (locales as readonly string[]).includes(k);

  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsLocalizedObject',
      target: object.constructor,
      propertyName,
      options: opts,
      validator: {
        validate(value: unknown) {
          if (value == null) return true;
          if (typeof value !== 'object' || Array.isArray(value)) return false;

          const obj = value as Record<string, unknown>;
          for (const [k, v] of Object.entries(obj)) {
            if (!isLang(k)) return false;
            if (typeof v !== 'string') return false;
            const t = v.trim();
            if (t.length < 1 || t.length > 255) return false;
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be an object with keys in ${JSON.stringify(
            locales,
          )} and 1–255 char string values.`;
        },
      },
    });
  };
}
