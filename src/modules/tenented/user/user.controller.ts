import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('v1/users')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @Get()
  async getUser() {
    return await this.userservice.find();
  }
}
