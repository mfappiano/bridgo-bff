/**
 * Factory para generar datos de prueba consistentes
 *
 * Esta fábrica permite crear objetos de datos comunes usados en las pruebas
 * siguiendo el patrón Object Mother.
 */

import { SortDirection } from '~/modules/shared/dtos/Pagination.dto';

/**
 * Genera datos para un préstamo de prueba
 */
export const loanRequestFactory = {
  createDefault: () => ({
    id: 'loan-123456',
    personCode: 'person-123',
    amount: 1000000,
    term: 24,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),

  createWithStatus: (status: string) => ({
    ...loanRequestFactory.createDefault(),
    status,
  }),

  createBatch: (count: number) => {
    return Array.from({ length: count }, (_, index) => ({
      ...loanRequestFactory.createDefault(),
      id: `loan-${123456 + index}`,
      personCode: `person-${123 + index}`,
    }));
  },
};

/**
 * Genera datos para opciones de paginación
 */
export const paginationOptionsFactory = {
  createDefault: () => ({
    page: 0,
    limit: 10,
  }),

  createWithFilters: (filters: Record<string, string | number | boolean>) => ({
    ...paginationOptionsFactory.createDefault(),
    filters,
  }),

  createWithSort: (sortBy: string, direction: SortDirection = SortDirection.ASC) => ({
    ...paginationOptionsFactory.createDefault(),
    sort: [
      {
        sortBy,
        direction,
      },
    ],
  }),
};

/**
 * Genera datos para respuestas paginadas
 */
export const paginatedResponseFactory = {
  create: <T>(
    results: T[],
    {
      totalCount,
      offset = 0,
      limit = 10,
    }: { totalCount?: number; offset?: number; limit?: number } = {},
  ) => ({
    results,
    totalCount: totalCount ?? results.length,
    offset,
    limit,
  }),
};

/**
 * Genera errores comunes para pruebas
 */
export const errorFactory = {
  createApiError: (statusCode = 400, message = 'Bad Request') => ({
    statusCode,
    message,
    error: message,
  }),

  createDomainError: (code = 'VALIDATION_ERROR', message = 'Validation error') => ({
    code,
    message,
  }),
};
