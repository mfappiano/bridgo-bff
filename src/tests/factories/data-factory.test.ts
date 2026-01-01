import {
  loanRequestFactory,
  paginationOptionsFactory,
  paginatedResponseFactory,
  errorFactory,
} from './data-factory';
import { SortDirection } from '~/modules/shared/dtos/Pagination.dto';

describe('Data Factory', () => {
  describe('loanRequestFactory', () => {
    describe('createDefault', () => {
      it('should create a default loan request', () => {
        const loanRequest = loanRequestFactory.createDefault();

        expect(loanRequest).toHaveProperty('id', 'loan-123456');
        expect(loanRequest).toHaveProperty('personCode', 'person-123');
        expect(loanRequest).toHaveProperty('amount', 1000000);
        expect(loanRequest).toHaveProperty('term', 24);
        expect(loanRequest).toHaveProperty('status', 'PENDING');
        expect(loanRequest).toHaveProperty('createdAt');
        expect(loanRequest).toHaveProperty('updatedAt');
      });
    });

    describe('createWithStatus', () => {
      it('should create a loan request with custom status', () => {
        const status = 'APPROVED';
        const loanRequest = loanRequestFactory.createWithStatus(status);

        expect(loanRequest).toHaveProperty('id', 'loan-123456');
        expect(loanRequest).toHaveProperty('status', status);
      });
    });

    describe('createBatch', () => {
      it('should create a batch of loan requests', () => {
        const count = 3;
        const batch = loanRequestFactory.createBatch(count);

        expect(batch).toHaveLength(count);
        expect(batch[0]).toHaveProperty('id', 'loan-123456');
        expect(batch[1]).toHaveProperty('id', 'loan-123457');
        expect(batch[2]).toHaveProperty('id', 'loan-123458');

        expect(batch[0]).toHaveProperty('personCode', 'person-123');
        expect(batch[1]).toHaveProperty('personCode', 'person-124');
        expect(batch[2]).toHaveProperty('personCode', 'person-125');
      });
    });
  });

  describe('paginationOptionsFactory', () => {
    describe('createDefault', () => {
      it('should create default pagination options', () => {
        const options = paginationOptionsFactory.createDefault();

        expect(options).toHaveProperty('page', 0);
        expect(options).toHaveProperty('limit', 10);
      });
    });

    describe('createWithFilters', () => {
      it('should create pagination options with filters', () => {
        const filters = { status: 'APPROVED', amount: 5000 };
        const options = paginationOptionsFactory.createWithFilters(filters);

        expect(options).toHaveProperty('page', 0);
        expect(options).toHaveProperty('limit', 10);
        expect(options).toHaveProperty('filters', filters);
      });
    });

    describe('createWithSort', () => {
      it('should create pagination options with default ASC sort direction', () => {
        const sortBy = 'createdAt';
        const options = paginationOptionsFactory.createWithSort(sortBy);

        expect(options).toHaveProperty('page', 0);
        expect(options).toHaveProperty('limit', 10);
        expect(options.sort).toHaveLength(1);
        expect(options.sort[0]).toHaveProperty('sortBy', sortBy);
        expect(options.sort[0]).toHaveProperty('direction', SortDirection.ASC);
      });

      it('should create pagination options with specified sort direction', () => {
        const sortBy = 'createdAt';
        const direction = SortDirection.DESC;
        const options = paginationOptionsFactory.createWithSort(sortBy, direction);

        expect(options).toHaveProperty('page', 0);
        expect(options).toHaveProperty('limit', 10);
        expect(options.sort).toHaveLength(1);
        expect(options.sort[0]).toHaveProperty('sortBy', sortBy);
        expect(options.sort[0]).toHaveProperty('direction', direction);
      });
    });
  });

  describe('paginatedResponseFactory', () => {
    describe('create', () => {
      it('should create a paginated response with default values', () => {
        const results = [{ id: 1 }, { id: 2 }];
        const response = paginatedResponseFactory.create(results);

        expect(response).toHaveProperty('results', results);
        expect(response).toHaveProperty('totalCount', results.length);
        expect(response).toHaveProperty('offset', 0);
        expect(response).toHaveProperty('limit', 10);
      });

      it('should create a paginated response with custom values', () => {
        const results = [{ id: 1 }, { id: 2 }];
        const options = {
          totalCount: 100,
          offset: 20,
          limit: 15,
        };
        const response = paginatedResponseFactory.create(results, options);

        expect(response).toHaveProperty('results', results);
        expect(response).toHaveProperty('totalCount', options.totalCount);
        expect(response).toHaveProperty('offset', options.offset);
        expect(response).toHaveProperty('limit', options.limit);
      });
    });
  });

  describe('errorFactory', () => {
    describe('createApiError', () => {
      it('should create an API error with default values', () => {
        const error = errorFactory.createApiError();

        expect(error).toHaveProperty('statusCode', 400);
        expect(error).toHaveProperty('message', 'Bad Request');
        expect(error).toHaveProperty('error', 'Bad Request');
      });

      it('should create an API error with custom values', () => {
        const statusCode = 404;
        const message = 'Not Found';
        const error = errorFactory.createApiError(statusCode, message);

        expect(error).toHaveProperty('statusCode', statusCode);
        expect(error).toHaveProperty('message', message);
        expect(error).toHaveProperty('error', message);
      });
    });

    describe('createDomainError', () => {
      it('should create a domain error with default values', () => {
        const error = errorFactory.createDomainError();

        expect(error).toHaveProperty('code', 'VALIDATION_ERROR');
        expect(error).toHaveProperty('message', 'Validation error');
      });

      it('should create a domain error with custom values', () => {
        const code = 'NOT_FOUND';
        const message = 'Resource not found';
        const error = errorFactory.createDomainError(code, message);

        expect(error).toHaveProperty('code', code);
        expect(error).toHaveProperty('message', message);
      });
    });
  });
});
