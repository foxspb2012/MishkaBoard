import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Post, HttpStatus, Body, HttpCode, Get, Param, Delete, Patch } from '@nestjs/common';
import { fillObject } from '../../common/core';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryResponse } from './rdo/response-category.dto';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) {
  }

  @Get('/')
  @ApiResponse({
    type: CategoryResponse,
    status: HttpStatus.OK,
    description: 'Categories has been found.'
  })
  async index() {
    const categories = await this.categoryService.getCategories();
    return fillObject(CategoryResponse, categories);
  }

  @Get('/:id')
  @ApiResponse({
    type: CategoryResponse,
    status: HttpStatus.OK,
    description: 'Categories has been found.'
  })
  async findById(@Param('id', MongoidValidationPipe) id: string) {
    const categories = await this.categoryService.findByCategoryId(id);
    return fillObject(CategoryResponse, categories);
  }

  @Post('/')
  async create(@Body() dto: CreateCategoryDto) {
    const newCategory = await this.categoryService.createCategory(dto);
    return fillObject(CategoryResponse, newCategory);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', MongoidValidationPipe) id: string) {
    await this.categoryService.deleteCategory(id);
  }

  @Patch('/:id')
  async update(@Param('id', MongoidValidationPipe) id: string, @Body() dto: UpdateCategoryDto) {
    const updatedCategory = await this.categoryService.updateCategory(id, dto)
    return fillObject(CategoryResponse, updatedCategory);
  }
}
