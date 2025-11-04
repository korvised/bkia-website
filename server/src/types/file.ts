// ==========================================
// CORE S3 INTERFACES
// ==========================================

export interface S3UploadOptions {
  folder: string; // 'POC', 'employees/<id>/profile', etc.
  fileName?: string; // Custom filename
  preserveOriginalName?: boolean; // Keep original filename (e.g., UUID-prefixed)
  metadata?: Record<string, string>;
}

export interface S3UploadResult {
  key: string; // S3 object key
  bucket: string; // S3 bucket
  location: string; // Public URL (if applicable)
  etag: string; // S3 ETag
  originalName: string; // Original filename
  uploadedAt: Date; // Upload timestamp
}

export interface S3ListResult {
  files: S3FileItem[];
  totalCount: number;
}

export interface S3FileItem {
  key: string;
  lastModified: Date;
  size: number;
  storageClass: string;
}

// ==========================================
// FILE VALIDATION TYPES
// ==========================================

export type FileCategory = 'image' | 'document' | 'other';

export interface FileValidationConfig {
  maxSize: number;
  allowedTypes: string[];
  category: FileCategory;
}
