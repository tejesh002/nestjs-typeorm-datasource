import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService){ }

  @Post()
  async createTenent(@Body() body: any){
    return this.accountService.createTenent(body.account, body.slug);
  } 
}