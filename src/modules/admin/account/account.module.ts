import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterAccount } from './account.entity';


@Module({
  imports: [TypeOrmModule.forFeature([MasterAccount])],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
