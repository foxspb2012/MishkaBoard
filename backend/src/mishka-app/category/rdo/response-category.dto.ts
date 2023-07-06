import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryRdo {
  @ApiProperty({
    description: 'The uniq category ID',
    example: '7847dea8-fbb7-41d0-8ff3-54b45db39fad',
  })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
    description: 'Name of category',
    example: 'Cats',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Count offers in category',
    example: 17,
  })
  @Expose()
  public offerCount: string;

  @ApiProperty({
    description: 'Image of category',
    example: 'cat-auto.jpg',
  })
  @Expose()
  public image: string;
}
