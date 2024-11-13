import { Test, TestingModule } from '@nestjs/testing';
import { GameroundService } from './round.service';

describe('GameroundService', () => {
  let service: GameroundService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameroundService],
    }).compile();

    service = module.get<GameroundService>(GameroundService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
