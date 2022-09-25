import { Module } from '@nestjs/common';
import { TripController } from './routes/trip.controller';
import { TripService } from './services/trip.service';
import { tripProviders } from './model/trip.providers';
import { DatabaseModule } from 'src/config/database/database.config.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TripController],
  providers: [TripService, ...tripProviders],
})
export class CatsModule {}
