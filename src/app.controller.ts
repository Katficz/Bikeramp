import {
  Body,
  Controller,
  Get,
  Post,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { validateCreateBody } from './bikeramp/helpers/bikeramp.validators';
import { calculateTwoAddressesDistance } from './bikeramp/helpers/calculateDistance.api';
import Trip from './bikeramp/model/trip.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
