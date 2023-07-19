import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserResponse {
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  @ApiProperty({
    description: 'The uniq user ID',
    example: '0667dea8-fbb7-41d0-8ff3-5b44539dbfad',
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'User first name',
    example: 'Fox',
  })
  @IsString()
  public firstname: string;

  @Expose()
  @ApiProperty({
    description: 'User last name',
    example: 'Smith',
  })
  @IsString()
  public lastname: string;

  @Expose()
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  public email: string;
}
