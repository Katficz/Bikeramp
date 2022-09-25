import { Injectable, Inject } from '@nestjs/common';
import Trip from '../model/trip.model';

@Injectable()
export class TripService {
  constructor(
    @Inject('TRIP_REPOSITORY')
    private tripRepository: typeof Trip,
  ) {}

  async findAll(): Promise<Trip[]> {
    return this.tripRepository.findAll<Trip>();
  }

  async createOneTrip(createValues: {
    distance: string;
    date: Date;
    start_address: string;
    destination_address: string;
  }): Promise<Trip> {
    return await this.tripRepository.create(createValues);
  }
}
