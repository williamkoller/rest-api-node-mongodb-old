import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInputDTO } from './dtos/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async create(@Body() data: AuthInputDTO) {
    return await this.authService.login(data);
  }
}
