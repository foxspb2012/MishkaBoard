import { ApiTags, ApiResponse } from '@nestjs/swagger';
import {
  Controller,
  Post,
  HttpStatus,
  Body,
  HttpCode,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { fillObject } from '../../common/core';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OfferService } from './offer.service';
import { OfferResponse } from './rdo/response-offer.dto';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { DEFAULT_NEW_OFFER_COUNT } from './offer.constant.js';

@ApiTags('offers')
@Controller('offers')
export class OfferController {

  constructor(
    private readonly offerService: OfferService,
  ) {
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

  @Post('/')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Offers has been created.'
  })
  async create(@Body() dto: CreateOfferDto) {
    const newOffer = await this.offerService.create(dto);
    return fillObject(OfferResponse, newOffer);
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
