import {Equipment} from '../models';

class EquipmentValidator {
  public validateEquipment(equipment: Equipment): string | null {
    let validation = null;
    if (!this.validateEmptyString(equipment.name)) validation = 'name';
    if (!this.validateEmptyString(equipment.domain))
      validation = validation ? validation + 'domain' : 'domain';
    if (!this.validateEmptyString(equipment.serial))
      validation = validation ? validation + 'serial' : 'serial';
    if (!this.validateLongitude(equipment.longitude))
      validation = validation ? validation + 'longitude' : 'longitude';
    if (!this.validateLatitude(equipment.latitude))
      validation = validation ? validation + 'latitude' : 'latitude';

    return validation;
  }

  public validateEmptyString(field: string): boolean {
    return field != null && field.trim() !== '';
  }

  public validateLongitude(longitude: string): boolean {
    const longitudeValue = parseFloat(longitude);
    const checkSplit = longitude.split('.');

    return !(
      isNaN(longitudeValue) ||
      longitudeValue < -180 ||
      longitudeValue > 180 ||
      (checkSplit && checkSplit.length > 2)
    );
  }

  public validateLatitude(latitude: string): boolean {
    const latitudeValue = parseFloat(latitude);
    const checkSplit = latitude.split('.');

    return !(
      isNaN(latitudeValue) ||
      latitudeValue < -90 ||
      latitudeValue > 90 ||
      (checkSplit && checkSplit.length > 2)
    );
  }
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
  isActive: true,
};

const equipmentValidator = new EquipmentValidator();

export {equipmentValidator, defaultEquipment};
