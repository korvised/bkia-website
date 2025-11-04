import { FileCategory } from '@/types/file';
import {
  FILE_SIZES,
  FILE_TYPE_GROUPS,
  FILE_VALIDATION_CONFIGS,
} from '@/constants';

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/** Check if file type is allowed */
export function isFileTypeAllowed(
  mimeType: string,
  allowedTypes: readonly string[],
): boolean {
  return allowedTypes.includes(mimeType);
}

/** Get file category from MIME type */
export function getFileCategory(mimeType: string): FileCategory {
  if (FILE_TYPE_GROUPS.IMAGES.includes(mimeType as any)) return 'image';
  if (FILE_TYPE_GROUPS.DOCUMENTS.includes(mimeType as any)) return 'document';
  return 'other';
}

/** Get max file size for MIME type */
export function getMaxFileSize(mimeType: string): number {
  const config = FILE_VALIDATION_CONFIGS[mimeType];
  return config ? config.maxSize : FILE_SIZES.DEFAULT_MAX;
}

/** Human-readable size */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/** Generate unique filename */
export function generateUniqueFileName(originalName: string): string {
  const ext = (originalName.split('.').pop() || '').trim();
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 8);
  return ext ? `${timestamp}-${random}.${ext}` : `${timestamp}-${random}`;
}

/** Validate uploaded file (Multer) */
export function validateFile(
  file: Express.Multer.File,
  options: {
    allowedTypes?: readonly string[];
    maxSize?: number;
    category?: FileCategory;
  } = {},
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!file) {
    errors.push('No file provided');
    return { isValid: false, errors };
  }

  const allowedTypes = options.allowedTypes || FILE_TYPE_GROUPS.ALL_ALLOWED;
  if (!isFileTypeAllowed(file.mimetype, allowedTypes)) {
    errors.push(`File type ${file.mimetype} is not allowed`);
  }

  const maxSize = options.maxSize || getMaxFileSize(file.mimetype);
  if (file.size > maxSize) {
    errors.push(
      `File size ${formatFileSize(file.size)} exceeds ${formatFileSize(maxSize)}`,
    );
  }

  if (options.category) {
    const cat = getFileCategory(file.mimetype);
    if (cat !== options.category) {
      errors.push(`File must be of type ${options.category}, got ${cat}`);
    }
  }

  return { isValid: errors.length === 0, errors };
}
