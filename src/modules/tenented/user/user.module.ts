import { Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request as ExpressRequest } from 'express';
import { getTenantConnection } from 'src/modules/tenency/tenancy.utils';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const connectionFactory = [
  {
    provide: 'CONNECTION',
    scope: Scope.REQUEST,
    useFactory: async (request: ExpressRequest) => {
      const { tenantId }: any = request;
      if (tenantId) {
        return await getTenantConnection(tenantId);
      }

      return null;
    },
    inject: [REQUEST],
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [...connectionFactory, UserService],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
