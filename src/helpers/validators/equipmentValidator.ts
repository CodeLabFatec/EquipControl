import {Equipment} from '../models';

function validateEquipment(equipment: Equipment): string | null {
  if (!equipment.name || equipment.name === '' || equipment.name === ' ')
    return 'name' ;
  if (!equipment.domain || equipment.domain === '' || equipment.domain === ' ')
    return 'domain';
  if (!equipment.serial || equipment.serial === '' || equipment.serial === ' ')
    return 'serial';
  if (!equipment.longitude || equipment.longitude === '0') return 'longitude';
  if (!equipment.latitude || equipment.latitude === '0') return 'latitude';

  return null;
}

const defaultEquipment: Equipment = {
  domain: '',
  files: undefined,
  latitude: '',
  longitude: '',
  name: '',
  notes: undefined,
  serial: '',
  _id: '',
};

export {validateEquipment, defaultEquipment};
