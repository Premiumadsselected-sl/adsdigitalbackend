import { Test, TestingModule } from '@nestjs/testing';
import { EmailsController } from '../emails/emails.controller';
import { EmailsService } from '../emails/emails.service';

describe('EmailsController', () => {
  let controller: EmailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailsController],
      providers: [EmailsService],
    }).compile();

    controller = module.get<EmailsController>(EmailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
