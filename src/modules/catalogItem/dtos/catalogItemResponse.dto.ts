import { z } from 'zod';

export const CatalogItemStatusSchema = z.enum([
    'ACTIVE',
    'INACTIVE',
    'PENDING_APPROVAL',
]);

export const CatalogItemSchema = z.object({
    id: z.string().min(1),
    type: z.string().min(1),
    label: z.string().min(1),
    categories: z.array(z.string()).optional(),
    status: z.string().min(1),//CatalogItemStatusSchema,
});

export const CatalogSearchBackendResponseSchema = z.object({
    catalogItemResponses: z.array(CatalogItemSchema),
});

export type CatalogItem = z.infer<typeof CatalogItemSchema>;
export type CatalogItemStatus = z.infer<typeof CatalogItemStatusSchema>;
export type CatalogSearchResponseDto = z.infer<typeof CatalogSearchBackendResponseSchema>;
