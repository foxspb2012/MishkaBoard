import { UserInterface } from '../../common/shared-types';
import { genSalt, hash, compare } from 'bcrypt';
import { SALT_ROUNDS } from './site-user.constant';

export class SiteUserEntity implements UserInterface {
  public _id: string;
  public email: string;
  public firstname: string;
  public lastname: string;
  public passwordHash: string;

  constructor(siteUser: UserInterface) {
    this.fillEntity(siteUser);
  }

  public toObject() {
    return { ...this };
  }

  public async setPassword(password: string): Promise<SiteUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public fillEntity(siteUser: UserInterface) {
    this._id = siteUser._id;
    this.email = siteUser.email;
    this.firstname = siteUser.firstname;
    this.lastname = siteUser.lastname;
    this.passwordHash = siteUser.passwordHash;
  }
}
