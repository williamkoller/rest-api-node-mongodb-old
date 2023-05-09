import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInputDTO } from './dtos/create-auth.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  public async create(@Body() data: AuthInputDTO) {
    return await this.authService.login(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  public async me(@Req() req: Request) {
    return await this.usersService.findUserLoggedById(req.user._id);
  }
}
