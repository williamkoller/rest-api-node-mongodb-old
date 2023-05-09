import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AddUserDTO } from './dtos/add-user.dto';
import { IdentifyUserDTO } from './dtos/identify-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async index() {
    return await this.usersService.findUsers();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() data: AddUserDTO) {
    return await this.usersService.addUser(data);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async show(@Param() identifyUser: IdentifyUserDTO) {
    return await this.usersService.findUserById(identifyUser.id);
  }

  @Get('show-email/:email')
  @HttpCode(HttpStatus.OK)
  public async showEmail(@Param() identifyUser: IdentifyUserDTO) {
    return await this.usersService.findUserByEmail(identifyUser.email);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param() identifyUser: IdentifyUserDTO,
    @Body() updateUser: UpdateUserDTO,
  ) {
    return await this.usersService.updateUser(identifyUser.id, updateUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param() identifyUser: IdentifyUserDTO) {
    return await this.usersService.removeUser(identifyUser.id);
  }
}
