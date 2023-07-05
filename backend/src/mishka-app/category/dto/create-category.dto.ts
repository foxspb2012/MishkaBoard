import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Name of category',
    example: 'Cats'
  })
  @IsString({message: 'name is required'})
  @Length(4, 12, {message: 'Min length is 4, max is 12'})
  public name: string;

  @ApiProperty({
    description: 'Image of category',
    example: 'cat-auto.jpg',
  })
  @IsString({message: 'image is required'})
  @Length(4, 36, {message: 'Min length is 4, max is 36'})
  public image: string;
}
