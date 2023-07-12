import { ApiProperty } from '@nestjs/swagger';
import { OfferType } from '../../../common/shared-types';
import { IsDateString, IsEnum, IsInt, IsMongoId, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class UpdateOfferDto {
  @ApiProperty({
    description: 'Title of offer',
    example: 'I sell a table',
  })
  @IsOptional()
  @MinLength(10,{message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title?: string;

  @ApiProperty({
    description: 'Description of offer',
    example: 'I sell a table in good condition'
  })
  @IsOptional()
  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description?: string;

  @ApiProperty({
    description: 'Date of post in ISO format',
    example: '2023-07-19T18:00:00.782Z'
  })
  @IsOptional()
  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public postDate?: Date;

  @ApiProperty({
    description: 'The field of image',
    example: './cat.jpg'
  })
  @IsOptional()
  @IsString({message: 'image is required'})
  @MaxLength(256, {message: 'Too short for field «image»'})
  public image?: string;

  @ApiProperty({
    description: 'The type of offer from enum',
    example: 'Sell'
  })
  @IsOptional()
  @IsEnum(OfferType, {message: 'type must be Buy and Sell'})
  public type?: OfferType;

  @ApiProperty({
    description: 'The price of offer',
    example: 100500
  })
  @IsOptional()
  @IsInt({message: 'Price must be an integer'})
  @Min(100, {message: 'Minimum price is 100'})
  @Max(200000, {message: 'Maximum price is 200000'})
  public price?: number;

  @ApiProperty({
    description: 'The array of id`s categories',
    example: '[634971d0351d0b51b90a004e, 634971d0351d0b51b90a004b]'
  })
  @IsOptional()
  @IsMongoId({each: true, message: 'Categories field must be an array of valid id'})
  public categories?: string[];
}
