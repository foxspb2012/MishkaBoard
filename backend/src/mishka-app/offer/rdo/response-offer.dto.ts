import { Expose, Transform, Type } from 'class-transformer';
import { UserResponse } from '../../auth/rdo/response-user.rdo.js';
import { CategoryInOfferResponse } from '../../category/rdo/response-category.dto.js';
import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class OfferResponse {

  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  @ApiProperty({
    description: 'The uniq offer ID',
    example: '7847dea8-fbb7-41d0-8ff3-54b45db39fad',
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'Title of offer',
    example: 'I sell a table',
  })
  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title: string;

  @Expose()
  @ApiProperty({
    description: 'Description of offer',
    example: 'I sell a table in good condition'
  })
  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description: string;

  @Expose()
  @ApiProperty({
    description: 'The field of image',
    example: './cat.jpg'
  })
  @MaxLength(256, {message: 'Too short for field «image»'})
  public image: string;

  @Expose()
  @ApiProperty({
    description: 'Date of post in ISO format',
    example: '2023-07-19T18:00:00.782Z'
  })
  public postDate: string;

  @Expose()
  @ApiProperty({
    description: 'The price of offer',
    example: 100500
  })
  public price: number;

  @Expose()
  @ApiProperty({
    description: 'The type of offer from enum',
    example: 'Sell'
  })
  public type: string;

  @Expose()
  @ApiProperty({
    description: 'The uniq category id',
    example: '634971d0351d0b51b90a004b'
  })
  @Type(() => CategoryInOfferResponse)
  public categories!: CategoryInOfferResponse[];

  @Expose({name: 'userId'})
  @ApiProperty({
    description: 'The uniq user id',
    example: '64a572113c982381512b3d71',
  })
  @Type(() => UserResponse)
  public user!: UserResponse;
}
