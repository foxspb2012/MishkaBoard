import { ApiProperty } from '@nestjs/swagger';
import { OfferType } from '../../../common/shared-types';
import { IsArray, IsDateString, IsEnum, IsInt, IsMongoId, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateOfferDto {
  @ApiProperty({
    description: 'Title of offer',
    example: 'I sell a table',
  })
  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title: string;

  @ApiProperty({
    description: 'Description of offer',
    example: 'I sell a table in good condition'
  })
  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description: string;

  @ApiProperty({
    description: 'Date of post in ISO format',
    example: '2023-07-19T18:00:00.782Z'
  })
  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public postDate: Date;

  @ApiProperty({
    description: 'The type of offer from enum',
    example: 'Sell'
  })
  @IsEnum(OfferType, {message: 'type must be Buy and Sell'})
  public type: OfferType;

  @ApiProperty({
    description: 'Image of offer',
    example: './picture.img'
  })
  @MinLength(5, {message: 'Minimum image path length must be 5'})
  @MaxLength(100, {message: 'Maximum image path length must be 100'})
  public image: string;

  @ApiProperty({
    description: 'The price of offer',
    example: 100500
  })
  @IsInt({message: 'Price must be an integer'})
  @Min(100, {message: 'Minimum price is 100'})
  @Max(200000, {message: 'Maximum price is 200000'})
  public price: number;

  @ApiProperty({
    description: 'The array of id categories',
    example: '[634971d0351d0b51b90a004e, 634971d0351d0b51b90a004b]'
  })
  @IsArray({message: 'Field categories must be an array'})
  @IsMongoId({each: true, message: 'Categories field must be an array of valid id'})
  public categories: string[];

  @ApiProperty({
    description: 'UserId in mongo id format',
    example: '634971d0351d0b51b90a0048'
  })
  @IsMongoId({message: 'User id must be valid id'})
  public userId: string;
}
