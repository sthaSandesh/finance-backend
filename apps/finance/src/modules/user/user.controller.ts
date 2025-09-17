import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from './dto/create-user.request';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser() {
    return this.userService.getUser();
  }

  @Post()
  async createUser(@Body() request: CreateUserRequest) { //
    return this.userService.CreateUser(request); 
  }

  
}
