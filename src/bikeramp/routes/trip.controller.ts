import { Controller, Get } from '@nestjs/common';
import Trip from '../model/trip.model';
import { TripService } from '../services/trip.service';

@Controller('bikeramp')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get()
  async findAll(): Promise<Trip[]> {
    return await this.tripService.findAll();
  }
}
