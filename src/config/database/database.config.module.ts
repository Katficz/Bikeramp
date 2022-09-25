import { Module } from '@nestjs/common';
import { databaseProviders } from './database.config.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
