import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from './dto/create-user.request';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}


  @UseGuards(AuthGuard('Jwt'))
  @Get()
  async getUser() {
    return this.userService.getUser();
  }

  @Post()
  async createUser(@Body() request: CreateUserRequest) { //
    return this.userService.CreateUser(request); 
  }

  
}
