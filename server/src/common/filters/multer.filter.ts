import type { Request } from 'express';
import { FILE_SIZES, FILE_TYPE_GROUPS } from '@/constants';
import { FileCategory } from '@/types/file';
import { validateFile } from '@/utils';

/**
 * Generic factory: build a Multer fileFilter using our validateFile() utility.
 */
export function makeFileFilter(options?: {
  allowedTypes?: readonly string[];
  maxSize?: number;
  category?: FileCategory;
}) {
  return function fileFilter(
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void,
  ) {
    const { isValid, errors } = validateFile(file, {
      allowedTypes: options?.allowedTypes,
      maxSize: options?.maxSize,
      category: options?.category,
    });

    if (!isValid) {
      return cb(new Error(errors.join('; ')), false);
    }
    cb(null, true);
  };
}

/**
 * Images only (png, jpeg, gif, webp). Uses default LARGE_IMAGE limit.
 */
export const imageFileFilter = makeFileFilter({
  allowedTypes: FILE_TYPE_GROUPS.IMAGES,
  maxSize: FILE_SIZES.LARGE_IMAGE,
  category: 'image',
});

/**
 * PDF documents only. Uses LARGE_DOCUMENT limit.
 */
export const documentFileFilter = makeFileFilter({
  allowedTypes: FILE_TYPE_GROUPS.DOCUMENTS,
  maxSize: FILE_SIZES.LARGE_DOCUMENT,
  category: 'document',
});
