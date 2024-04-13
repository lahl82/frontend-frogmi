import { ICoordinates } from './icoordinates.model';

export interface IAttributes {
  external_id?: string;
  magnitude?: number,
  place?: string,
  time?: string,
  tsunami?: boolean,
  mag_type?: string,
  title?: string
  coordinates?: ICoordinates;
}
