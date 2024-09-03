import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './orm.config';
import { TenancyModule } from 'src/modules/tenency/tenancy.module';
import { UserModule } from 'src/modules/tenented/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TenancyModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
