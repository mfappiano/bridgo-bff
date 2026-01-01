import { z } from 'zod';
import {
  SortDirection,
  createPaginatedRequestSchema,
  convertRequestParamsToPaginationOptions,
  convertServiceResponseToPaginatedResponse,
} from '../Pagination.dto';
import { paginatedResponseFactory } from '~/tests/factories/data-factory';

describe('Pagination DTOs', () => {
  describe('createPaginatedRequestSchema', () => {
    enum TestSortFields {
      NAME = 'name',
      DATE = 'date',
      ID = 'id',
    }

    enum TestFilterFields {
      STATUS = 'status',
      TYPE = 'type',
    }

    it('should validate a valid pagination request', () => {
      const schema = createPaginatedRequestSchema(
        z.nativeEnum(TestSortFields),
        z.nativeEnum(TestFilterFields),
      );

      const validData = {
        offset: 0,
        limit: 10,
        sort: [{ sortBy: TestSortFields.NAME, direction: SortDirection.ASC }],
        filters: [{ field: TestFilterFields.STATUS, value: 'active' }],
      };

      const result = schema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid sort fields', () => {
      const schema = createPaginatedRequestSchema(
        z.nativeEnum(TestSortFields),
        z.nativeEnum(TestFilterFields),
      );

      const invalidData = {
        offset: 0,
        limit: 10,
        sort: [{ sortBy: 'invalidField', direction: SortDirection.ASC }],
        filters: null,
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject invalid filter fields', () => {
      const schema = createPaginatedRequestSchema(
        z.nativeEnum(TestSortFields),
        z.nativeEnum(TestFilterFields),
      );

      const invalidData = {
        offset: 0,
        limit: 10,
        sort: null,
        filters: [{ field: 'invalidField', value: 'active' }],
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('convertRequestParamsToPaginationOptions', () => {
    it('should convert request params to pagination options with defaults', () => {
      const params = {};
      const options = convertRequestParamsToPaginationOptions(params);

      expect(options).toEqual({
        page: 0,
        limit: 10,
        filters: {},
        sort: undefined,
      });
    });

    it('should convert filters to a record object', () => {
      const params = {
        offset: 20,
        limit: 5,
        filters: [
          { field: 'status', value: 'active' },
          { field: 'type', value: 'loan' },
        ],
      };

      const options = convertRequestParamsToPaginationOptions(params);

      expect(options).toEqual({
        page: 4, // 20 / 5 = 4
        limit: 5,
        filters: {
          status: 'active',
          type: 'loan',
        },
        sort: undefined,
      });
    });

    it('should handle sort options correctly', () => {
      const params = {
        offset: 0,
        limit: 10,
        sort: [
          { sortBy: 'name', direction: SortDirection.ASC },
          { sortBy: 'date', direction: SortDirection.DESC },
        ],
      };

      const options = convertRequestParamsToPaginationOptions(params);

      expect(options).toEqual({
        page: 0,
        limit: 10,
        filters: {},
        sort: [
          { sortBy: 'name', direction: SortDirection.ASC },
          { sortBy: 'date', direction: SortDirection.DESC },
        ],
      });
    });

    it('should handle null or undefined values', () => {
      const params = {
        offset: null,
        limit: undefined,
        filters: null,
        sort: undefined,
      };

      const options = convertRequestParamsToPaginationOptions(params);

      expect(options).toEqual({
        page: 0,
        limit: 10,
        filters: {},
        sort: undefined,
      });
    });
  });

  describe('convertServiceResponseToPaginatedResponse', () => {
    const testItems = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ];

    const mapperFn = (item: { id: number; name: string }) => ({
      id: `ID-${item.id}`,
      displayName: item.name.toUpperCase(),
    });

    it('should convert service response to API response format', () => {
      const serviceResponse = paginatedResponseFactory.create(testItems);

      const apiResponse = convertServiceResponseToPaginatedResponse(serviceResponse, mapperFn);

      expect(apiResponse).toEqual({
        totalCount: 3,
        totalPages: 1,
        prev: undefined,
        next: undefined,
        data: [
          { id: 'ID-1', displayName: 'ITEM 1' },
          { id: 'ID-2', displayName: 'ITEM 2' },
          { id: 'ID-3', displayName: 'ITEM 3' },
        ],
      });
    });

    it('should calculate prev and next pagination correctly', () => {
      // Page 1 (second page) with total of 3 pages
      const serviceResponse = paginatedResponseFactory.create(testItems, {
        totalCount: 30,
        offset: 10,
        limit: 10,
      });

      const apiResponse = convertServiceResponseToPaginatedResponse(serviceResponse, mapperFn);

      expect(apiResponse).toEqual({
        totalCount: 30,
        totalPages: 3,
        prev: { offset: 0, limit: 10 },
        next: { offset: 20, limit: 10 },
        data: [
          { id: 'ID-1', displayName: 'ITEM 1' },
          { id: 'ID-2', displayName: 'ITEM 2' },
          { id: 'ID-3', displayName: 'ITEM 3' },
        ],
      });
    });

    it('should handle first page correctly', () => {
      // First page with more pages available
      const serviceResponse = paginatedResponseFactory.create(testItems, {
        totalCount: 30,
        offset: 0,
        limit: 10,
      });

      const apiResponse = convertServiceResponseToPaginatedResponse(serviceResponse, mapperFn);

      expect(apiResponse).toEqual({
        totalCount: 30,
        totalPages: 3,
        prev: undefined,
        next: { offset: 10, limit: 10 },
        data: [
          { id: 'ID-1', displayName: 'ITEM 1' },
          { id: 'ID-2', displayName: 'ITEM 2' },
          { id: 'ID-3', displayName: 'ITEM 3' },
        ],
      });
    });

    it('should handle last page correctly', () => {
      // Last page
      const serviceResponse = paginatedResponseFactory.create(testItems, {
        totalCount: 30,
        offset: 20,
        limit: 10,
      });

      const apiResponse = convertServiceResponseToPaginatedResponse(serviceResponse, mapperFn);

      expect(apiResponse).toEqual({
        totalCount: 30,
        totalPages: 3,
        prev: { offset: 10, limit: 10 },
        next: undefined,
        data: [
          { id: 'ID-1', displayName: 'ITEM 1' },
          { id: 'ID-2', displayName: 'ITEM 2' },
          { id: 'ID-3', displayName: 'ITEM 3' },
        ],
      });
    });
  });
});
