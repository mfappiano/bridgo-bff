import { FastifyInstance } from 'fastify';
import { configureControllerTest } from 'fastify-decorators/testing';
import fastify from 'fastify';
import { initSchemas } from '~/api';

/**
 * Crea una instancia de Fastify configurada para testing con un controlador específico
 * @param controller El controlador a registrar en la instancia de Fastify
 * @returns La instancia de Fastify configurada
 */
export async function setupControllerTest(controller: any): Promise<FastifyInstance> {
  const app = fastify();
  initSchemas(app);

  return await configureControllerTest({
    instance: app,
    controller,
  });
}

/**
 * Genera un objeto con datos de paginación para tests
 * @param overrides Valores para sobreescribir los defaults
 * @returns Objeto de paginación para usar en tests
 */
export function createPaginationTestData(overrides: Record<string, any> = {}) {
  return {
    offset: 0,
    limit: 10,
    sort: null,
    filters: null,
    ...overrides,
  };
}

/**
 * Genera una respuesta paginada para tests
 * @param results Array de resultados
 * @param overrides Valores para sobreescribir los defaults
 * @returns Objeto de respuesta paginada para usar en tests
 */
export function createPaginatedResponseTestData<T>(
  results: T[],
  overrides: Record<string, any> = {},
) {
  return {
    results,
    totalCount: results.length,
    offset: 0,
    limit: 10,
    ...overrides,
  };
}

/**
 * Mockea una función que retorna una promesa
 * @param returnValue El valor que debe retornar la promesa
 * @returns Una función jest mock que resuelve con el valor especificado
 */
export function mockPromiseFunction<T>(returnValue: T) {
  return vi.fn().mockResolvedValue(returnValue);
}

/**
 * Mockea un error en una función que retorna una promesa
 * @param error El error a lanzar
 * @returns Una función jest mock que rechaza con el error especificado
 */
export function mockPromiseRejection(error: Error) {
  return vi.fn().mockRejectedValue(error);
}
