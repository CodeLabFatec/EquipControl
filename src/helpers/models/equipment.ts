import {Files} from './files';

export interface Equipment {
  _id?: string;
  name: string | undefined;
  domain: string | undefined;
  longitude: number | undefined;
  latitude: number | undefined;
  serial: string | undefined;
  notes: string | undefined;
  files: Files[] | undefined;
  created_at?: Date;
  updated_at?: Date;
  state: boolean;
}
