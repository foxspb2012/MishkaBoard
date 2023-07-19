import { randomUUID } from 'crypto';
import { Inject, Injectable } from '@nestjs/common';
import { SiteUserEntity } from '../site-user/site-user.entity';
import { UserInterface, RefreshTokenPayload, TokenPayload } from '../../common/shared-types';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SiteUserRepository } from '../site-user/site-user.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from '../../config/jwt.config';
import {
  UserNotFoundException, UserExistsException, UserNotRegisteredException, UserPasswordWrongException
} from './exceptions';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly siteUserRepository: SiteUserRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
  ) {
  }

  async register(dto: CreateUserDto) {
    const {firstname, lastname, email, password} = dto;
    const siteUser: UserInterface = {
      firstname,
      lastname,
      email,
      passwordHash: '',
    };

    const existUser = await this.siteUserRepository.findByEmail(email);

    if (existUser) {
      throw new UserExistsException(email);
    }

    const userEntity = await new SiteUserEntity(siteUser).setPassword(password);

    return this.siteUserRepository.create(userEntity);
  }

  async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.siteUserRepository.findByEmail(email);

    if (!existUser) {
      throw new UserNotRegisteredException(email);
    }

    const siteUserEntity = new SiteUserEntity(existUser);
    if (!(await siteUserEntity.comparePassword(password))) {
      throw new UserPasswordWrongException();
    }

    return siteUserEntity.toObject();
  }

  async getUser(id: string) {
    const existUser = await this.siteUserRepository.findById(id);
    if (!existUser) {
      throw new UserNotFoundException(id);
    }

    return existUser;
  }

  async loginUser(user: Pick<UserInterface, '_id' | 'email' | 'lastname' | 'firstname'>, refreshTokenId?: string) {
    const payload: TokenPayload = {
      sub: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname
    };

    await this.refreshTokenService
      .deleteRefreshSession(refreshTokenId);

    const refreshTokenPayload: RefreshTokenPayload = {
      ...payload, refreshTokenId: randomUUID()
    }

    await this.refreshTokenService
      .createRefreshSession(refreshTokenPayload);

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn,
      }),
      user: {
        name: user.firstname + " " + user.lastname,
        id: user._id
      }
    };
  }

  async deleteUser(id: string): Promise<void> {
    await this.siteUserRepository.destroy(id);
  }
}
