import { DataTypes, Sequelize } from 'sequelize';
import { Column, DataType, Table, Model } from 'sequelize-typescript';

interface ITripAttributes {
  id?: string;
  distance?: string;
  date?: number; //timestamp
  start_address?: string;
  destination_address?: string;
}

@Table({
  tableName: 'trip',
  schema: 'bikeramp',
})
export default class Trip extends Model implements ITripAttributes {
  @Column({
    primaryKey: true,
    type: DataTypes.STRING(36),
    defaultValue: Sequelize.literal('uuid_generate_v4()'),
  })
  id?: string;

  @Column({
    field: 'distance',
    type: DataType.STRING,
  })
  distance?: string;

  @Column({
    field: 'date',
    type: DataType.STRING,
  })
  date?: number; //timestamp

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
