import { FileValidationConfig } from '@/types/file';

export const MIME_TYPES = {
  // Images
  JPEG: 'image/jpeg',
  JPG: 'image/jpg',
  PNG: 'image/png',
  GIF: 'image/gif',
  WEBP: 'image/webp',

  // Documents
  PDF: 'application/pdf',
} as const;

export const FILE_TYPE_GROUPS = {
  IMAGES: [
    MIME_TYPES.JPEG,
    MIME_TYPES.JPG,
    MIME_TYPES.PNG,
    MIME_TYPES.GIF,
    MIME_TYPES.WEBP,
  ],

  DOCUMENTS: [MIME_TYPES.PDF],

  // All allowed types
  ALL_ALLOWED: [
    // Images
    MIME_TYPES.JPEG,
    MIME_TYPES.JPG,
    MIME_TYPES.PNG,
    MIME_TYPES.GIF,
    MIME_TYPES.WEBP,
    // Documents
    MIME_TYPES.PDF,
  ],
} as const;

export const FILE_SIZES = {
  // Base units
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,

  // Common limits
  SMALL_IMAGE: 2 * 1024 * 1024, // 2MB
  MEDIUM_IMAGE: 5 * 1024 * 1024, // 5MB
  LARGE_IMAGE: 10 * 1024 * 1024, // 10MB
  DOCUMENT: 25 * 1024 * 1024, // 25MB
  LARGE_DOCUMENT: 50 * 1024 * 1024, // 50MB
  ARCHIVE: 100 * 1024 * 1024, // 100MB
  VIDEO: 500 * 1024 * 1024, // 500MB
  AUDIO: 50 * 1024 * 1024, // 50MB

  // Default
  DEFAULT_MAX: 10 * 1024 * 1024, // 10MB
} as const;

export const FILE_VALIDATION_CONFIGS: Record<string, FileValidationConfig> = {
  // Images
  [MIME_TYPES.JPEG]: {
    maxSize: FILE_SIZES.LARGE_IMAGE,
    allowedTypes: [MIME_TYPES.JPEG],
    category: 'image',
  },
  [MIME_TYPES.JPG]: {
    maxSize: FILE_SIZES.LARGE_IMAGE,
    allowedTypes: [MIME_TYPES.JPG],
    category: 'image',
  },
  [MIME_TYPES.PNG]: {
    maxSize: FILE_SIZES.LARGE_IMAGE,
    allowedTypes: [MIME_TYPES.PNG],
    category: 'image',
  },
  [MIME_TYPES.GIF]: {
    maxSize: FILE_SIZES.SMALL_IMAGE,
    allowedTypes: [MIME_TYPES.GIF],
    category: 'image',
  },
  [MIME_TYPES.WEBP]: {
    maxSize: FILE_SIZES.LARGE_IMAGE,
    allowedTypes: [MIME_TYPES.WEBP],
    category: 'image',
  },

  // Documents
  [MIME_TYPES.PDF]: {
    maxSize: FILE_SIZES.LARGE_DOCUMENT,
    allowedTypes: [MIME_TYPES.PDF],
    category: 'document',
  },
};

export type AllowedMimeType = (typeof MIME_TYPES)[keyof typeof MIME_TYPES];
export type FileTypeGroup = keyof typeof FILE_TYPE_GROUPS;
export type FileSizeLimit = keyof typeof FILE_SIZES;
