import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponse {

  @Expose({ name: 'id' })
  @ApiProperty({
    description: 'The uniq category ID',
    example: '7847dea8-fbb7-41d0-8ff3-54b45db39fad',
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'Name of category',
    example: 'Cats',
  })
  public name: string;

  @Expose()
  @ApiProperty({
    description: 'Count offers in category',
    example: 17,
  })
  public offerCount: string;

  @Expose()
  @ApiProperty({
    description: 'Image of category',
    example: 'cat-auto.jpg',
  })
  public image: string;
}

export class CategoryListResponse {

  @Expose({ name: 'id' })
  @ApiProperty({
    description: 'The uniq category ID',
    example: '7847dea8-fbb7-41d0-8ff3-54b45db39fad',
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'Name of category',
    example: 'Cats',
  })
  public name: string;
}
