/**
 * Interfaz base para todos los repositorios que define operaciones CRUD comunes
 */
export interface IBaseRepository<T, ID> {
  /**
   * Encuentra una entidad por su ID
   * @param id ID de la entidad a buscar
   */
  findById(id: ID): Promise<T | null>;

  /**
   * Guarda una nueva entidad o actualiza una existente
   * @param entity Entidad a guardar
   */
  save(entity: T): Promise<T>;

  /**
   * Actualiza parcialmente una entidad existente
   * @param id ID de la entidad a actualizar
   * @param partialEntity Datos parciales para actualizar
   */
  update(id: ID, partialEntity: Partial<T>): Promise<T>;

  /**
   * Elimina una entidad por su ID
   * @param id ID de la entidad a eliminar
   */
  delete(id: ID): Promise<boolean>;

  /**
   * Encuentra todas las entidades que cumplen con ciertos criterios
   * @param criteria Criterios de búsqueda
   */
  findByCriteria(criteria: Record<string, any>): Promise<T[]>;
}
