import { PaginatedResponse } from '../dtos/Pagination.dto';
import { IBaseRepository } from './base.repository';

/**
 * Interfaz para repositorios que soportan operaciones paginadas
 */
export interface IPaginatedRepository<T, ID> extends IBaseRepository<T, ID> {
  /**
   * Encuentra entidades con soporte de paginación
   * @param page Número de página
   * @param limit Número de elementos por página
   * @param filters Filtros para la búsqueda
   */
  findPaginated(
    page: number,
    limit: number,
    filters?: Record<string, any>,
  ): Promise<PaginatedResponse<T>>;
}
