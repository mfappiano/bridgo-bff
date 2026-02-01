import { FastifyInstanceToken, Inject, Service } from 'fastify-decorators';
import { FastifyInstance } from 'fastify';
import HttpClient from '~/cross-cutting/communication/http-client.communication';
import config from '~/cross-cutting/config';

@Service()
export class AuthRepository {
  private readonly baseUrl = `${config.kongUrl}/auth`;

  @Inject(FastifyInstanceToken)
  private readonly app: FastifyInstance;

  @Inject(HttpClient)
  private readonly httpClient: HttpClient;

  async register(payload: Record<string, unknown>) {
    const logger = this.app.log.child({ module: 'AuthRepository.register' });
    logger.debug('Registrando usuario');
    const { data } = await this.httpClient.post(`${this.baseUrl}/register`, payload);
    return data;
  }

  async login(payload: Record<string, unknown>) {
    const logger = this.app.log.child({ module: 'AuthRepository.login' });
    logger.debug('Login de usuario');
    const { data } = await this.httpClient.post(`${this.baseUrl}/login`, payload);
    return data;
  }

  async google(payload: Record<string, unknown>) {
    const logger = this.app.log.child({ module: 'AuthRepository.google' });
    logger.debug('Login con Google');
    const { data } = await this.httpClient.post(`${this.baseUrl}/google`, payload);
    return data;
  }

  async assignRole(payload: Record<string, unknown>) {
    const logger = this.app.log.child({ module: 'AuthRepository.assignRole' });
    logger.debug('Asignando rol');
    const { data } = await this.httpClient.post(`${this.baseUrl}/roles/assign`, payload);
    return data;
  }

  async removeRole(payload: Record<string, unknown>) {
    const logger = this.app.log.child({ module: 'AuthRepository.removeRole' });
    logger.debug('Removiendo rol');
    const { data } = await this.httpClient.post(`${this.baseUrl}/roles/remove`, payload);
    return data;
  }

  async listRoles() {
    const logger = this.app.log.child({ module: 'AuthRepository.listRoles' });
    logger.debug('Listando roles');
    const { data } = await this.httpClient.get(`${this.baseUrl}/roles`);
    return data;
  }

  async me() {
    const logger = this.app.log.child({ module: 'AuthRepository.me' });
    logger.debug('Obteniendo perfil actual');
    const { data } = await this.httpClient.get(`${this.baseUrl}/me`);
    return data;
  }

  async updateMe(payload: Record<string, unknown>) {
    const logger = this.app.log.child({ module: 'AuthRepository.updateMe' });
    logger.debug('Actualizando perfil actual');
    const { data } = await this.httpClient.patch(`${this.baseUrl}/me`, payload);
    return data;
  }
}
