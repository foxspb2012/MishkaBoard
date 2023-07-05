import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryRdo {
  @Expose({name: 'id'})
  @ApiProperty({
    description: 'Category ID',
    example: '62823cb2c5a64ce9f1b50eba',
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    description: 'Name of category',
    example: 'Cats',
  })
  public name!: string;

  @Expose()
  @ApiProperty({
    description: 'Count offers in category',
    example: '15',
  })
  public offerCount!: string;

  @Expose()
  @ApiProperty({
    description: 'Image of category',
    example: 'cat-auto.jpg',
  })
  public image!: string;
}
