import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Додано імпорти
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth') // Групує ендпоінти під заголовком "Auth"
@Controller('api/auth') // Виправлено шлях на api/auth, щоб збігалося з іншими контролерами
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Реєстрація нового користувача' })
  @ApiResponse({ status: 201, description: 'Користувач успішно зареєстрований' })
  @ApiResponse({ status: 400, description: 'Помилка валідації' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Логін та отримання JWT-токена' })
  @ApiResponse({ status: 200, description: 'Успішний вхід, повертає токен' })
  @ApiResponse({ status: 401, description: 'Невірні дані' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}