import { Sequelize } from 'sequelize-typescript';
import Trip from 'src/bikeramp/model/trip.model';
import 'dotenv/config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(
        `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        {
          models: [Trip],
          logging: false,
        },
      );
      await sequelize.sync();
      return sequelize;
    },
  },
];
