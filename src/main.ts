import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source';
import { getTenantConnection } from './modules/tenency/tenancy.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const querymanager = await AppDataSource.initialize();
  await querymanager.runMigrations();
  const schemas = await querymanager.query(
    'select schema_name as name from information_schema.schemata;',
  );

  for (let i = 0; i <= 1; i += 1) {
    const { name: schema } = schemas[i];
    if (schema.startsWith('tenent_')) {
      const tenantId = schema.replace('tenant_', '');
      const connection = await getTenantConnection(tenantId);
      // console.info(connection.createQueryRunner().getTables());
      await connection.runMigrations();
    }
  }
  await querymanager.destroy();

  await app.listen(3000);
}
bootstrap();
