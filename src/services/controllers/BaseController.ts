export abstract class BaseController<T> {
  private entityName: string;

  constructor(entityName: string) {
    this.entityName = entityName;
  }

  abstract list(): Promise<T[]>;
  abstract get(id: string): Promise<T | null>;
  abstract post(data: T): Promise<any>;
  abstract delete(id: string): Promise<any>;
  abstract update(id: string, data: T): Promise<any>;

  public handleErrors(message: string) {
    let error = 'Erro de comunicação com o servidor.';
    if (message.includes('Username or email already exist'))
      error = 'Username ou email já estão cadastrados em outro usuário.';
    if (message.includes('401'))
      error = 'Sem autorização, acesse o aplicativo novamente.';
    if (message.includes('404')) error = `${this.entityName} não encontrado.`;
    if (message.includes('422')) error = 'Dados inválidos.';
    if (message.includes('413'))
      error = 'Arquivo(s) enviado(s) excederam o tamanho máximo permitido.';

    return {errorMessage: error};
  }
}
