import { Test, TestingModule } from '@nestjs/testing';
import { TefpayService } from '../payments/tefpay/tefpay.service';

describe('TefpayService', () => {
  let service: TefpayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TefpayService],
    }).compile();

    service = module.get<TefpayService>(TefpayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
