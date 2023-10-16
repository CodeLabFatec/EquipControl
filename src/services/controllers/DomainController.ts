import {Domain} from '@/helpers/models';
import {api, endpoints} from '../api';
import {BaseController} from './BaseController';

class DomainController extends BaseController<Domain> {
  constructor() {
    super('Domínio');
  }

  async get(id: string): Promise<Domain | null> {
    try {
      return (await api.get(endpoints.GET_DOMAIN + id)).data.domain;
    } catch (e) {
      return null;
    }
  }

  async delete(id: string): Promise<any> {
    try {
      return (await api.delete(endpoints.DELETE_DOMAIN + id)).data.domain;
    } catch (e) {
      return this.handleErrors(e.message);
    }
  }

  public list = async (): Promise<Domain[]> => {
    try {
      return (await api.get(endpoints.GET_ALL_DOMAINS)).data.domains;
    } catch (e) {
      return [];
    }
  };

  public post = async (data: Domain) => {
    try {
      const {_id, createdAt, updatedAt, ...eq} = data;
      const result = (await api.post(endpoints.POST_DOMAIN, eq)).data;

      return result;
    } catch (e) {
      return this.handleErrors(e.message);
    }
  };

  public update = async (domainIn: string, domain: Domain) => {
    const {_id, createdAt, updatedAt, ...eq} = domain;
    try {
      const result = (
        await api.patch(endpoints.PATCH_DOMAIN_UPDATE + domainIn, eq)
      ).data;

      return result;
    } catch (e) {
      return this.handleErrors(e.message);
    }
  };
}

const domainController = new DomainController();

export default domainController;
