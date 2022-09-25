import sequelize from 'sequelize';
import { Column, DataType, Table, Model } from 'sequelize-typescript';

export interface ITripAttributes {
  id?: string;
  distance?: string;
  date?: Date;
  start_address?: string;
  destination_address?: string;
}

@Table({
  tableName: 'trip',
  schema: 'bikeramp',
  timestamps: false,
})
export default class Trip extends Model implements ITripAttributes {
  @Column({
    primaryKey: true,
    type: DataType.STRING(36),
    defaultValue: sequelize.UUIDV4,
  })
  id?: string;

  @Column({
    field: 'distance',
    type: DataType.STRING,
  })
  distance?: string;

  @Column({
    field: 'date',
    type: DataType.DATE,
  })
  date?: Date;

  @Column({
    field: 'start_address',
    type: DataType.STRING,
  })
  start_address?: string;

  @Column({
    field: 'destination_address',
    type: DataType.STRING,
  })
  destination_address?: string;
}
