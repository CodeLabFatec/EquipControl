import {Equipment} from '../models';

function validateEquipment(equipment: Equipment): boolean {
  if (!equipment.name || equipment.name === '' || equipment.name === ' ')
    return false;
  if (!equipment.domain || equipment.domain === '' || equipment.domain === ' ')
    return false;
  if (!equipment.serial || equipment.serial === '' || equipment.serial === ' ')
    return false;
  if (!equipment.longitude || equipment.longitude === 0) return false;
  if (!equipment.latitude || equipment.latitude === 0) return false;

  return true;
}

const defaultEquipment: Equipment = {
  domain: undefined,
  files: undefined,
  latitude: undefined,
  longitude: undefined,
  name: undefined,
  notes: undefined,
  serial: undefined,
};

export {validateEquipment, defaultEquipment};
