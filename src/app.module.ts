import { Module } from '@nestjs/common';
import { CatsModule } from './bikeramp/trip.module';

@Module({
  imports: [CatsModule],
})
export class AppModule {}
