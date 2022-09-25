import Trip from './trip.model';

export const tripProviders = [
  {
    provide: 'TRIP_REPOSITORY',
    useValue: Trip,
  },
];
