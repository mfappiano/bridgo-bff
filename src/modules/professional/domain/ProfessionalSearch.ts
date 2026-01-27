export interface ProfessionalSearch {
    context: SearchContext;
    query: SearchQuery;
    filters?: SearchFilters;
    limit: number;
}

export interface SearchContext {
    category: string;
    catalogItemId: string;
}

export interface SearchQuery {
    text: string;
}

export type SearchFilters = Record<string, unknown>;
