import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  AUTH_USER_NOT_FOUND,
  AUTH_USER_EXISTS,
  AUTH_USER_BY_ID,
  AUTH_USER_PASSWORD_WRONG,
} from './auth.constant';
import { SiteUserEntity } from '../site-user/site-user.entity';
import { UserInterface } from '../../common/shared-types';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import databaseConfig from '../../config/database.config';
import { ConfigType } from '@nestjs/config';
import { SiteUserRepository } from '../site-user/site-user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly siteUserRepository: SiteUserRepository,
    @Inject(databaseConfig.KEY)
    private readonly mongoConfig: ConfigType<typeof databaseConfig>,
  ) {
  }

  async register(dto: CreateUserDto) {
    const {firstname, lastname, email, password} = dto;
    const siteUser: UserInterface = {
      firstname,
      lastname,
      email,
      avatar: '',
      passwordHash: '',
    };

    const existUser = await this.siteUserRepository.findByEmail(email);

    if (existUser) {
      throw new Error(AUTH_USER_EXISTS);
    }

    const userEntity = await new SiteUserEntity(siteUser).setPassword(password);

    return this.siteUserRepository.create(userEntity);
  }

  async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.siteUserRepository.findByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND);
    }

    const siteUserEntity = new SiteUserEntity(existUser);
    if (!(await siteUserEntity.comparePassword(password))) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return siteUserEntity.toObject();
  }

  async getUser(id: string) {
    const user = await this.siteUserRepository.findById(id);

    if (!user) {
      throw new Error(AUTH_USER_BY_ID);
    }

    return user;
  }

  async loginUser(user: UserInterface) {
    const payload = {
      sub: user._id,
      email: user.email,
      name: user.firstname + ' ' + user.lastname,
    };

    return {payload};
  }

  async deleteUser(id: string): Promise<void> {
    await this.siteUserRepository.destroy(id);
  }
}
