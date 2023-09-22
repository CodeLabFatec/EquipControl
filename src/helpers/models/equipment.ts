import {Files} from './files';

export interface Equipment {
  _id: string;
  name: string;
  domain: string;
  longitude: number;
  latitude: number;
  serial: string;
  notes?: string;
  files?: Files[];
  isActive?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
