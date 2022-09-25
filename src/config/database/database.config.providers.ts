import { Sequelize } from 'sequelize-typescript';
import Trip from 'src/bikeramp/model/trip.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'nest',
      });
      sequelize.addModels([Trip]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
