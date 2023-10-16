import {User} from '../models';

class UserValidator {
  public validateUser(user: User): string | null {
    let validation = null;
    if (!this.validateEmptyString(user.name)) validation = 'name';
    if (!this.validateEmptyString(user.lastName))
      validation = validation ? validation + 'lastName' : 'lastName';
    if (!this.validateEmptyString(user.email))
      validation = validation ? validation + 'email' : 'email';
    if (!this.validateEmptyString(user.phone))
      validation = validation ? validation + 'phone' : 'phone';
    if (!this.validateEmptyString(user.registration))
      validation = validation ? validation + 'registration' : 'registration';
    if (!this.validateEmptyString(user.password))
      validation = validation ? validation + 'password' : 'password';
    if (!this.validateEmptyString(user.username))
      validation = validation ? validation + 'username' : 'username';
    if (!this.validateEmptyString(user.cpf))
      validation = validation ? validation + 'cpf' : 'cpf';

    if (!this.validateEmail(user.email))
      validation = validation ? validation + 'email' : 'email';
    if (!this.validatePassword(user.password))
      validation = validation ? validation + 'password' : 'password';
    if (!this.validatePhoneNumber(user.phone))
      validation = validation ? validation + 'phone' : 'phone';
    if (!this.validateCPF(user.cpf))
      validation = validation ? validation + 'cpf' : 'cpf';

    return validation;
  }

  public validateEmptyString(field: string): boolean {
    return field != null && field.trim() !== '';
  }

  public validateEmail(email: string): boolean {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  }

  public validatePassword(password: string): boolean {
    if (!password || password.length < 10 || password.length > 20) {
      return false;
    }

    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const symbolRegex = /[!@#$_]/;

    if (
      !upperCaseRegex.test(password) ||
      !lowerCaseRegex.test(password) ||
      !digitRegex.test(password) ||
      !symbolRegex.test(password)
    ) {
      return false;
    }

    return true;
  }

  public validatePhoneNumber(phone: string): boolean {
    if (phone.length < 10 || phone.length > 11) {
      return false;
    }
    return true;
  }

  public validateCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) {
      return false;
    }

    const isAllDigitsEqual = /^(.)\1+$/.test(cpf);
    if (isAllDigitsEqual) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf[i]) * (10 - i);
    }

    const remainder = (sum * 10) % 11;
    const firstVerifierDigit = remainder === 10 ? 0 : remainder;

    if (parseInt(cpf[9]) !== firstVerifierDigit) {
      return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf[i]) * (11 - i);
    }

    const secondRemainder = (sum * 10) % 11;
    const secondVerifierDigit = secondRemainder === 10 ? 0 : secondRemainder;

    return parseInt(cpf[10]) === secondVerifierDigit;
  }

  public formatPhone(text: string) {
    if (!text) return '';
    const cleanedText = text.replace(/\D/g, '');

    const formattedText = cleanedText.replace(
      /^(\d{2})(\d{0,5})(\d{0,4})/,
      '($1) $2-$3',
    );

    return formattedText;
  }

  public formatCPF(text: string) {
    if (!text) return '';
    const cleanedText = text.replace(/\D/g, '');

    const formattedText = cleanedText.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4',
    );

    return formattedText;
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
  password: '',
  image: undefined,
};

const userValidator = new UserValidator();

export {userValidator, defaultUser};
