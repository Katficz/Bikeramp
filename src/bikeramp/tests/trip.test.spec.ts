import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import Trip from '../model/trip.model';
import 'dotenv/config';
import { TripService } from '../services/trip.service';
import { TripController } from '../routes/trip.controller';

describe('TripServiceTest', () => {
  let mockedSequelize: Sequelize;
  let t: Transaction;

  let tripController: TripController;
  let tripService: TripService;
  beforeEach(async () => {
    tripService = new TripService(Trip);
    tripController = new TripController(tripService);

    mockedSequelize = new Sequelize(
      `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      {
        models: [Trip],
        logging: false,
      },
    );
    t = await mockedSequelize.transaction();
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await t.rollback();
    await mockedSequelize.close();
  });

  it('test method get all', async () => {
    const trips = await tripService.findAll();
    expect(trips).toBeTruthy();
  });

  it('test method create', async () => {
    const newTrip = {
      distance: 15,
      start_address: 'Test address 1',
      destination_address: 'Test address 2',
      date: new Date(),
      price: 2.5,
    };

    const trip = await tripService.createOneTrip(newTrip, {
      transaction: t,
    });

    expect(trip).toBeTruthy();
  });
});
