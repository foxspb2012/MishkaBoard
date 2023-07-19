import { ApiTags, ApiResponse } from '@nestjs/swagger';
import {
  Controller,
  Post,
  HttpStatus,
  Body,
  HttpCode,
  Get,
  Param,
  Query,
  Delete,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { fillObject } from '../../common/core';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OfferService } from './offer.service';
import { OfferResponse } from './rdo/response-offer.dto';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { DEFAULT_NEW_OFFER_COUNT } from './offer.constant.js';
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PostQuery } from './query/post.query';

@ApiTags('offers')
@Controller('offers')
export class OfferController {

  constructor(
    private readonly offerService: OfferService,
  ) {
  }

  static imgName: string;

  @Post('/')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Offers has been created.'
  })
  @UseInterceptors(FilesInterceptor('image', 1, {
      storage: diskStorage({
        destination: './public/',
        filename: (req, file, cb) => {
          const imgType = file.mimetype.split('/')
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const imgName = uniqueSuffix + '.' + imgType[1];

          cb(null, imgName);
          OfferController.imgName = imgName;
        }
      })
    })
  )
  async create(@Body() dto: CreateOfferDto) {
    dto.image = OfferController.imgName;
    const result = await this.offerService.create(dto);
    const offer = await this.offerService.getOffer(result.id);
    return fillObject(OfferResponse, offer);
  }

  @Get('/')
  @ApiResponse({
    type: OfferResponse,
    status: HttpStatus.OK,
    description: 'Offers has been found.'
  })
  async index() {
    const offers = await this.offerService.getOffers();
    return fillObject(OfferResponse, offers);
  }

  @Get('/bundles/new')
  @ApiResponse({
    type: OfferResponse,
    status: HttpStatus.OK,
    description: 'Offers has been found.'
  })
  async getNew() {
    const newOffers = await this.offerService.getNewOffers(DEFAULT_NEW_OFFER_COUNT);
    return fillObject(OfferResponse, newOffers);
  }

  @Get('/:id')
  @ApiResponse({
    type: OfferResponse,
    status: HttpStatus.OK,
    description: 'Offer by id has been found.'
  })
  async show(@Param('id', MongoidValidationPipe) id: string) {
    const offer = await this.offerService.getOffer(id);
    return fillObject(OfferResponse, offer);
  }

  @Get('/:categoryId/offers')
  @ApiResponse({
    type: OfferResponse,
    status: HttpStatus.OK,
    description: 'Offer by id has been found.'
  })
  async getOffersFromCategory(
    @Param('categoryId', MongoidValidationPipe) id: string, @Query() query: PostQuery
  ) {
    const offers = await this.offerService.findByCategoryId(id, query.limit);
    return fillObject(OfferResponse, offers);
  }

  @Patch('/:id')
  async update(@Param('id', MongoidValidationPipe) id: string, @Body() dto: UpdateOfferDto) {
    const updatedPost = await this.offerService.updateOffer(id, dto);
    return fillObject(OfferResponse, updatedPost);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', MongoidValidationPipe) id: string) {
    await this.offerService.deleteById(id);
  }
}
