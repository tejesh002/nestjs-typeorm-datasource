import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MasterAccount } from './account.entity';
import { AppDataSource } from 'src/data-source';
import { getTenantConnection } from 'src/modules/tenency/tenancy.utils';
import { User } from 'src/modules/tenented/user/user.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectDataSource()
    private readonly dateSource: DataSource,
  ) {}

  async createTenent(account: string, slug: string) {
    const masterquery = await this.dateSource.createQueryRunner();
    try {
      await masterquery.connect();
      await masterquery.startTransaction();
      const _account = new MasterAccount();
      _account.email = 'test@gmail.com';
      _account.name = account;
      const schemaName = `tenent_${account}`;
      await masterquery.manager.save(_account);
      const querymanager = await AppDataSource.initialize();
      await querymanager.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);

      const tenentconnection = await getTenantConnection(schemaName);
      await tenentconnection.runMigrations();

      const tenentQuerryRunner = await tenentconnection.createQueryRunner();
      try {
        await tenentQuerryRunner.connect();
        await tenentQuerryRunner.startTransaction();

        await tenentconnection
          .createQueryBuilder(tenentQuerryRunner)
          .insert()
          .into('user')
          .values({
            name: schemaName,
            email: 'test@gmail.com',
            phone_number: '+9198983332234',
          })
          .execute();
        await tenentQuerryRunner.commitTransaction();
      } catch (error) {
        await tenentQuerryRunner.rollbackTransaction();
        throw new BadRequestException(error);
      }

      await masterquery.commitTransaction();

      return { account, slug };
    } catch (error) {
      await masterquery.rollbackTransaction();
      throw new BadRequestException(error);
    }
  }
}
