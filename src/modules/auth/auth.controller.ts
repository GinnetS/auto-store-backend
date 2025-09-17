import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.auth.register(dto);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: '"access_token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... ' })
  login(@Body() body: LoginDto) {
    return this.auth.login(body.email, body.password);
  }
}
