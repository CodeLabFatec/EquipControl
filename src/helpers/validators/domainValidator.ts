import { Domain } from "../models/domain";

class DomainValidator {
    public validateDomain(domain: Domain): string | null {
        let validation = null;
        if (!this.validateEmptyString(domain.name)) validation = 'name';

        return validation;
    }

    public validateEmptyString(field: string): boolean {
        return field != null && field.trim() !== '';
    }
}

    const defaultDomain: Domain = {
        name: '',
        _id: '',
    };

const domainValidator = new DomainValidator();

export { domainValidator, defaultDomain };
