import { Test, TestingModule } from '@nestjs/testing';
import { TefpayController } from '../payments/tefpay/tefpay.controller';
import { TefpayService } from '../payments/tefpay/tefpay.service';

describe('TefpayController', () => {
  let controller: TefpayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TefpayController],
      providers: [TefpayService],
    }).compile();

    controller = module.get<TefpayController>(TefpayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
