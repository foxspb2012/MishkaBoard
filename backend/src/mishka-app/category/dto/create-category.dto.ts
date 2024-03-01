import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Name of category',
    example: 'Cats'
  })
  @IsString({message: 'name is required'})
  @Length(3, 12, {message: 'Min length is 3, max is 20'})
  public name: string;

  @ApiProperty({
    description: 'Image of category',
    example: 'cat-auto.jpg',
  })
  @IsString({message: 'image is required'})
  @Length(3, 36, {message: 'Min length is 3, max is 36'})
  public image: string;
}
