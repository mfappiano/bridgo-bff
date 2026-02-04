import { z } from 'zod';

export const SearchCatalogRequestSchema = z.object({
    q: z.string().nullable().optional(),
    category: z.string().nullable().optional(),
    limit: z.number().min(1).max(50).default(10),
});

export type SearchCatalogRequestDto = z.infer<typeof SearchCatalogRequestSchema>;
