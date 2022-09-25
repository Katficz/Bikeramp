import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { validateCreateBody } from '../helpers/bikeramp.validators';
import { calculateTwoAddressesDistance } from '../helpers/calculateDistance.api';
import Trip from '../model/trip.model';
import { TripService } from '../services/trip.service';

@Controller('bikeramp')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get()
  async findAll(): Promise<Trip[]> {
    return await this.tripService.findAll();
  }

  @Post()
  async createTrip(
    @Body('start_address') start_address: string,
    @Body('destination_address') destination_address: string,
    @Body('date') date: string,
  ): Promise<Trip> {
    const isBodyValid = validateCreateBody(
      start_address,
      destination_address,
      date,
    );
    if (!isBodyValid) throw new BadRequestException('Validation failed');

    const travelDistance = await calculateTwoAddressesDistance(
      start_address,
      destination_address,
    );

    return this.tripService.createOneTrip({
      distance: travelDistance,
      start_address: start_address,
      destination_address: destination_address,
      date: new Date(parseInt(date)),
    });
  }
}
