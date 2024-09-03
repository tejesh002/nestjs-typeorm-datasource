import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';

const TENANT_HEADER = 'x-tenant-id';

@Injectable()
export class tenancyMiddleware implements NestMiddleware {
  constructor() {}
  public async use(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const header = req.headers[TENANT_HEADER] as string;

    // if (!parseInt(header)) {
    //   throw new ForbiddenException('Invalid Organization Code');
    // }
    req['tenantId'] = 'test';

    next();
  }
}
