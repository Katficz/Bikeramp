import { Injectable, Inject } from '@nestjs/common';
import Trip from '../model/trip.model';

@Injectable()
export class TripService {
  constructor(
    @Inject('TRIP_REPOSITORY')
    private tripRepository: typeof Trip,
  ) {}

  async findAll(options?: object): Promise<Trip[]> {
    return this.tripRepository.findAll<Trip>(options || {});
  }

  async createOneTrip(
    createValues: {
      distance: number;
      date: Date;
      start_address: string;
      destination_address: string;
      price: number;
    },
    options?: object,
  ): Promise<Trip> {
    return await this.tripRepository.create(createValues, options || {});
  }
}
