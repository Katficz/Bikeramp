import { Controller } from '@nestjs/common';
import { TripService } from '../services/trip.service';

@Controller()
export class TripController {
  constructor(private readonly appService: TripService) {}
}
