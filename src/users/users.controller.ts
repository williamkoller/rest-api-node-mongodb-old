import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AddUserDTO } from './dtos/add-user';
import { IdentifyUserDTO } from './dtos/identify-user';
import { UpdateUserDTO } from './dtos/update-user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async index() {
    return await this.usersService.findUsers();
  }
  @Post()
  public async create(@Body() data: AddUserDTO) {
    return await this.usersService.addUser(data);
  }

  @Get(':id')
  public async show(@Param() identifyUser: IdentifyUserDTO) {
    return await this.usersService.findUserById(identifyUser);
  }

  @Get('show-email/:email')
  public async showEmail(@Param() identifyUser: IdentifyUserDTO) {
    return await this.usersService.findUserByEmail(identifyUser.email);
  }

  @Put(':id')
  public async update(
    @Param() identifyUser: IdentifyUserDTO,
    @Body() updateUser: UpdateUserDTO,
  ) {
    return await this.usersService.updateUser(identifyUser, updateUser);
  }

  @Delete(':id')
  public async destroy(@Param() identifyUser: IdentifyUserDTO) {
    return await this.usersService.removeUser(identifyUser);
  }
}
