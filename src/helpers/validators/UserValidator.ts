import {User} from '../models';

class UserValidator {
  public validateEquipment(user: User): string | null {
    let validation = null;
    if (!this.validateEmptyString(user.name)) validation = 'name';
    if (!this.validateEmptyString(user.lastName))
      validation = validation ? validation + 'lastName' : 'lastName';
    if (!this.validateEmptyString(user.email))
      validation = validation ? validation + 'email' : 'email';

    return validation;
  }

  public validateEmptyString(field: string): boolean {
    return field != null && field.trim() !== '';
  }
}

const defaultUser: User = {
  _id: '',
  cpf: '',
  email: '',
  lastName: '',
  name: '',
  username: '',
  phone: '',
  registration: '',
};

const userValidator = new UserValidator();

export {userValidator, defaultUser};
