import { z } from 'zod';

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

const paginateSchema = z.object({
  offset: z.number(),
  limit: z.number(),
});

const sortSchema = z.nativeEnum(SortDirection);

/**
 * Crea un schema base para respuestas con data con paginado
 * @param itemSchema schema de un item del listado
 * @returns Schema de paginado tomando el schema del item
 */
export function createPaginatedResponseSchema<ItemType extends z.ZodTypeAny>(itemSchema: ItemType) {
  return z.object({
    totalCount: z.number(),
    totalPages: z.number(),
    prev: paginateSchema.optional(),
    next: paginateSchema.optional(),
    data: z.array(itemSchema),
  });
}

/*
 * Crea un schema base para respuestas exitosas
 * @param itemSchema schema de un item del listado
 * @returns Schema de paginado tomando el schema del item
 */
export function createSuccessResponseDataSchema<ItemType extends z.ZodTypeAny>(
  itemSchema: ItemType,
) {
  return z.object({
    data: itemSchema,
  });
}

/**
 * Crea un schema base para body params para paginado
 * @param SortableFields enum con valores habilitados para ordenar
 * @param FilterableFields enum con valores habilitados para filtar
 * @returns Schema de paginado tomando filtros y ordenamiento
 */
export function createPaginatedRequestSchema<
  SortableFields extends z.ZodNativeEnum<any>,
  FilterableFields extends z.ZodNativeEnum<any>,
>(sortFieldsSchema?: SortableFields, filterFieldsSchema?: FilterableFields) {
  return z.object({
    offset: z.number().nullable(),
    limit: z.number().nullable(),
    sort: z
      .array(
        z.object({
          sortBy: sortFieldsSchema ?? z.string(),
          direction: sortSchema,
        }),
      )
      .nullable(),
    filters: z
      .array(
        z.object({
          field: filterFieldsSchema ?? z.string(),
          value: z.string(),
        }),
      )
      .nullable(),
  });
}

export type PaginatedRequestDto = z.infer<ReturnType<typeof createPaginatedRequestSchema>>;

/**
 * Interfaz base para opciones de paginación en servicios
 * Puede ser extendida por cada servicio según sus necesidades
 */
export interface PaginationOptions {
  page: number;
  limit: number;
  filters?: Record<string, string | number | boolean>;
  sort?: Array<{
    sortBy: string;
    direction: SortDirection;
  }>;
}

/**
 * Mapeador de un filtro de búsqueda
 * @param searchValue Valor de búsqueda
 * @returns Objeto con las propiedades de búsqueda
 */
const mapSearchFilter = (searchValue: string) => ({
  'owner.documentNumber': searchValue,
  'owner.personCode': searchValue,
  exclusive: true,
});

/**
 * Convierte los parámetros de request de paginación a las opciones para servicios
 * @param requestParams Parámetros de paginación del request (offset, limit, etc)
 * @returns Opciones de paginación para servicios (page, limit, etc)
 */
export function convertRequestParamsToPaginationOptions(
  requestParams: Partial<PaginatedRequestDto> = {},
): PaginationOptions {
  // Usar valores predeterminados para offset y limit si son nulos o undefined
  const offset =
    requestParams.offset !== undefined && requestParams.offset !== null
      ? Number(requestParams.offset)
      : 0;

  const limit =
    requestParams.limit !== undefined && requestParams.limit !== null
      ? Number(requestParams.limit)
      : 10;

  // Convertir offset a page
  const page = Math.floor(offset / limit);

  // Procesar filtros
  let filtersRecord: Record<string, string> = {};

  if (Array.isArray(requestParams.filters)) {
    filtersRecord = requestParams.filters.reduce(
      (previous, { field, value }) => {
        if (field === 'search') return { ...previous, ...mapSearchFilter(value) };

        return { ...previous, [field]: value };
      },
      {} as Record<string, string>,
    );
  }

  // Procesar ordenamiento
  let sortArray;
  if (Array.isArray(requestParams.sort)) {
    sortArray = requestParams.sort
      .filter((s) => s && s.sortBy && s.direction)
      .map((s) => ({
        sortBy: s.sortBy,
        direction: s.direction,
      }));

    if (sortArray.length === 0) {
      sortArray = undefined;
    }
  }

  return {
    page,
    limit,
    filters: filtersRecord,
    sort: sortArray,
  };
}

/**
 * Interfaz para respuestas paginadas en servicios
 */
export interface PaginatedResponse<T> {
  results: T[];
  totalCount: number;
  offset: number;
  limit: number;
  sort?: Array<{
    sortBy: string;
    direction: SortDirection;
  }>;
}

/**
 * Convierte una respuesta paginada de servicio al formato de respuesta de API
 * @param response Respuesta paginada del servicio
 * @returns Formato estandar para respuesta de API
 */
export function convertServiceResponseToPaginatedResponse<T, U>(
  response: PaginatedResponse<T>,
  mapperFn: (item: T) => U,
): z.infer<ReturnType<typeof createPaginatedResponseSchema>> {
  const { results, totalCount, offset, limit } = response;

  const totalPages = Math.ceil(totalCount / limit);
  const currentPage = Math.floor(offset / limit);

  // Calcular paginación previa y siguiente
  const prev = currentPage > 0 ? { offset: (currentPage - 1) * limit, limit } : undefined;

  const next =
    currentPage < totalPages - 1 ? { offset: (currentPage + 1) * limit, limit } : undefined;

  return {
    totalCount,
    totalPages,
    prev,
    next,
    data: results.map(mapperFn),
  };
}
