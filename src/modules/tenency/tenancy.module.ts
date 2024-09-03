import { Global, MiddlewareConsumer, Module, Scope } from '@nestjs/common';
import { CONNECTION } from './tenancy.symbols';
import { REQUEST } from '@nestjs/core';
import { getTenantConnection } from './tenancy.utils';
import { Request as ExpressRequest } from 'express';
import { tenancyMiddleware } from './tenancy.middleware';
import { UserModule } from '../tenented/user/user.module';

const connectionFactory = {
  provide: CONNECTION,
  scope: Scope.REQUEST,
  useFactory: async (request: ExpressRequest) => {
    const { tenantId }: any = request;
    if (tenantId) {
      return await getTenantConnection(tenantId);
    }

    return null;
  },
  inject: [REQUEST],
};

@Global()
@Module({
  imports: [UserModule],
  providers: [connectionFactory],
  exports: [CONNECTION],
})
export class TenancyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(tenancyMiddleware).forRoutes('/v1');
  }
}
