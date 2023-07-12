import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserResponse {
  @Expose()
  @ApiProperty({
    description: 'Token of user',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  public token!: string;

  @Expose({ name: '_id' })
  @ApiProperty({
    description: 'The uniq user ID',
    example: '0667dea8-fbb7-41d0-8ff3-5b44539dbfad',
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'User email',
    example: 'user@user.local',
  })
  public email: string;

  @Expose()
  @ApiProperty({
    description: 'Access token',
    example: 'eyJhbGciOiJIUzI8NiIsInR6cCI6IkpXVCJ8...',
  })
  public accessToken: string;
}
