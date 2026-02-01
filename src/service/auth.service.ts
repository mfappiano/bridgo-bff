import { Inject, Service } from 'fastify-decorators';
import { AuthRepository } from '~/modules/auth/repositories/auth.repository';

@Service()
export class AuthService {
  @Inject(AuthRepository)
  private readonly authRepository!: AuthRepository;

  register(payload: Record<string, unknown>) {
    return this.authRepository.register(payload);
  }

  login(payload: Record<string, unknown>) {
    return this.authRepository.login(payload);
  }

  google(payload: Record<string, unknown>) {
    return this.authRepository.google(payload);
  }

  assignRole(payload: Record<string, unknown>) {
    return this.authRepository.assignRole(payload);
  }

  removeRole(payload: Record<string, unknown>) {
    return this.authRepository.removeRole(payload);
  }

  listRoles() {
    return this.authRepository.listRoles();
  }

  me() {
    return this.authRepository.me();
  }

  updateMe(payload: Record<string, unknown>) {
    return this.authRepository.updateMe(payload);
  }
}
