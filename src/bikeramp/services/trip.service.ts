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
}
