import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { CONNECTION } from 'src/modules/tenency/tenancy.symbols';

@Injectable()
export class UserService {
  private readonly usermodel: Repository<User>;
  private readonly connection: DataSource;
  constructor(@Inject(CONNECTION) connection: DataSource) {
    this.usermodel = connection.getRepository(User);
    this.connection = connection;
  }
  async find() {
    const users = await this.usermodel.find();
    console.info(users);
    return users;
  }
}
