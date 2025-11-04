import { validate, ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export interface FormattedValidationError {
  field: string;
  message: string;
}

export function formatValidationErrors(
  errors: ValidationError[],
): FormattedValidationError[] {
  const result: FormattedValidationError[] = [];

  const traverse = (error: ValidationError, parentPath = '') => {
    const fieldPath = parentPath
      ? `${parentPath}.${error.property}`
      : error.property;

    if (error.constraints) {
      for (const msg of Object.values(error.constraints)) {
        result.push({
          field: fieldPath,
          message: msg,
        });
      }
    }

    if (error.children?.length) {
      for (const child of error.children) {
        traverse(child, fieldPath);
      }
    }
  };

  for (const err of errors) {
    traverse(err);
  }

  return result;
}

export async function validateDtOrReject<T extends object>(dto: T): Promise<T> {
  const errors = await validate(dto);
  if (errors.length > 0) {
    throw new BadRequestException(formatValidationErrors(errors));
  }

  return dto;
}

export async function validateDtoArrayOrReject<T extends object>(
  dtos: T[],
): Promise<T[]> {
  const validationResults = await Promise.all(
    dtos.map((dto, index) =>
      validate(dto).then((errors) => ({
        index,
        errors,
      })),
    ),
  );

  const allErrors = validationResults
    .filter(({ errors }) => errors.length > 0)
    .flatMap(({ index, errors }) =>
      formatValidationErrors(errors).map((err) => ({
        field: `[${index}].${err.field}`,
        message: err.message,
      })),
    );

  if (allErrors.length > 0) {
    throw new BadRequestException(allErrors);
  }

  return dtos;
}
