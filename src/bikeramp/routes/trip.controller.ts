import {
  InternalServerErrorException,
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import sequelize from 'sequelize';
import { Op } from 'sequelize';
import { validateCreateBody } from '../helpers/bikeramp.validators';
import { calculateTwoAddressesDistance } from '../helpers/calculateDistance.api';
import { TripService } from '../services/trip.service';
import {
  IMonthlyStatsResponseBodyCell,
  IWeeklyStatsResponseBody,
} from '../types/trip.types';
const moment = require('moment'); // using import causes CommonJS vs SystemJS problem

@Controller('api/')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get('stats/weekly')
  async getWeeklyStats(): Promise<IWeeklyStatsResponseBody> {
    const weekStart = moment().startOf('week').toDate();
    const weekEnd = moment().endOf('week');
    try {
      const downloadedData: unknown = await this.tripService.findAll({
        where: {
          date: {
            [Op.between]: [weekStart, weekEnd],
          },
        },
        attributes: [
          [sequelize.fn('sum', sequelize.col('distance')), 'total_distance'],
          [sequelize.fn('sum', sequelize.col('price')), 'total_price'],
        ],
      });
      let totalDistance = downloadedData[0].dataValues.total_distance;
      let totalPrice = downloadedData[0].dataValues.total_price;

      if (!totalDistance) totalDistance = 0;
      if (!totalPrice) totalPrice = 0;

      return {
        total_distance: `${totalDistance}km`,
        total_price: `${totalPrice}PLN`,
      };
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  @Get('stats/monthly')
  async getMonthlyStats(): Promise<Array<IMonthlyStatsResponseBodyCell>> {
    const weekStart = moment().startOf('month').toDate();
    const weekEnd = moment().endOf('month');
    try {
      const downloadedData: any = await this.tripService.findAll({
        group: ['date'],
        where: {
          date: {
            [Op.between]: [weekStart, weekEnd],
          },
        },
        attributes: [
          [sequelize.fn('date_trunc', 'day', sequelize.col('date')), 'date'],
          [sequelize.fn('sum', sequelize.col('distance')), 'total_distance'],
          [sequelize.fn('avg', sequelize.col('distance')), 'avg_ride'],
          [sequelize.fn('avg', sequelize.col('price')), 'avg_price'],
        ],
      });
      return downloadedData.map((rideDay): IMonthlyStatsResponseBodyCell => {
        return {
          day: moment(rideDay.dataValues.date ?? '').format('MMM, Do'),
          total_distance: `${rideDay.dataValues.total_distance ?? 0}km`,
          avg_ride: `${Math.floor(rideDay.dataValues.avg_ride) ?? 0}km`,
          avg_price: `${
            Math.floor(rideDay.dataValues.avg_price * 100) / 100 ?? 0
          }PLN`,
        };
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Server Error');
    }
  }

  @Post('/trips')
  async createTrip(
    @Body('start_address') start_address: string,
    @Body('destination_address') destination_address: string,
    @Body('price') price: number,
    @Body('date') date: string,
  ): Promise<string> {
    const isBodyValid = validateCreateBody(
      start_address,
      destination_address,
      date,
      price,
    );
    if (!isBodyValid) throw new BadRequestException('Validation failed');

    const travelDistance = await calculateTwoAddressesDistance(
      start_address,
      destination_address,
    );

    try {
      const createdTrip = await this.tripService.createOneTrip({
        distance: travelDistance,
        start_address: start_address,
        destination_address: destination_address,
        date: new Date(parseInt(date)),
        price: price,
      });
      return createdTrip.id;
    } catch (createServerError) {
      throw new InternalServerErrorException('Server Error');
    }
  }
}
