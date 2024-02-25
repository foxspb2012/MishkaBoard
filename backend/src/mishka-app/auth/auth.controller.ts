import { Body, Controller, Get, Delete, HttpCode, HttpStatus, Param, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '../../common/core';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './rdo/response-user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedUserResponse } from './rdo/response-logger-user.rdo';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { HttpExceptionFilter } from './http.exception-filter';

@UseFilters(HttpExceptionFilter)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserResponse, newUser);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoggedUserResponse,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  public async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.verifyUser(dto);
    return this.authService.loginUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    type: UserResponse,
    status: HttpStatus.OK,
    description: 'User found',
  })
  async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return fillObject(UserResponse, existUser);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', MongoidValidationPipe) id: string) {
    await this.authService.deleteUser(id);
  }
}
