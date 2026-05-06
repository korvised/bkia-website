import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@/common/config';
import { S3Service } from './s3.service';

const mockConfigService = {
  get: jest.fn((key: string) => {
    const map: Record<string, string> = {
      'aws.bucket': 'test-bucket',
      'aws.region': 'ap-southeast-7',
      'aws.accessKeyId': 'test-key',
      'aws.secretAccessKey': 'test-secret',
    };
    return map[key] ?? '';
  }),
};

describe('S3Service', () => {
  let service: S3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        S3Service,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<S3Service>(S3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
