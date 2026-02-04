import { z } from 'zod';

export const SearchCatalogResponseSchema = z.object({
    items: z.array(
        z.object({
            id: z.string(),
            label: z.string(),
        }),
    ),
});

export type SearchCatalogResponseDto = z.infer<typeof SearchCatalogResponseSchema>;
