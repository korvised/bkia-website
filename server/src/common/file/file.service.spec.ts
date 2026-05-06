import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { File } from '@/database';
import { StorageService } from '@/common/storage/storage.abstract';
import { FileService } from './file.service';

const mockStorageService: Partial<StorageService> = {
  uploadFile: jest.fn().mockResolvedValue({
    key: 'test/uuid.png',
    bucket: 'test-bucket',
    location: 'https://example.com/test/uuid.png',
    etag: 'etag',
    originalName: 'test.png',
    uploadedAt: new Date(),
  }),
  deleteFile: jest.fn().mockResolvedValue(true),
  fileExists: jest.fn().mockResolvedValue(false),
};

const mockFileRepository = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockImplementation((entity) => Promise.resolve({ id: 'uuid', ...entity })),
  findOneBy: jest.fn().mockResolvedValue(null),
  remove: jest.fn().mockResolvedValue(undefined),
};

describe('FileService', () => {
  let service: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        { provide: StorageService,              useValue: mockStorageService },
        { provide: getRepositoryToken(File),    useValue: mockFileRepository },
      ],
    }).compile();

    service = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('uploadFile — saves entity with key from storage', async () => {
    const fakeFile = {
      originalname: 'test.png',
      mimetype: 'image/png',
      size: 1024,
      buffer: Buffer.from(''),
    } as Express.Multer.File;

    const result = await service.uploadFile(fakeFile, 'test-folder');

    expect(mockStorageService.uploadFile).toHaveBeenCalledWith(fakeFile, expect.objectContaining({ folder: 'test-folder' }));
    expect(mockFileRepository.save).toHaveBeenCalled();
    expect(result.path).toBe('test/uuid.png');
  });

  it('deleteFile — skips when file not found', async () => {
    mockFileRepository.findOneBy.mockResolvedValueOnce(null);
    await service.deleteFile('non-existent-id');
    expect(mockStorageService.deleteFile).not.toHaveBeenCalled();
  });

  it('deleteFile — removes DB record then deletes from storage', async () => {
    const fakeFile = { id: 'uuid', path: 'test/uuid.png' };
    mockFileRepository.findOneBy.mockResolvedValueOnce(fakeFile);
    await service.deleteFile('uuid');
    expect(mockFileRepository.remove).toHaveBeenCalledWith(fakeFile);
    expect(mockStorageService.deleteFile).toHaveBeenCalledWith('test/uuid.png');
  });

  it('deleteFile — does not throw when storage deletion fails', async () => {
    const fakeFile = { id: 'uuid', path: 'test/uuid.png' };
    mockFileRepository.findOneBy.mockResolvedValueOnce(fakeFile);
    (mockStorageService.deleteFile as jest.Mock).mockRejectedValueOnce(new Error('S3 error'));
    await expect(service.deleteFile('uuid')).resolves.toBeUndefined();
    expect(mockFileRepository.remove).toHaveBeenCalledWith(fakeFile);
  });
});
