import { z } from 'zod';

export const CatalogItemStatusSchema = z.enum([
    'ACTIVE',
    'INACTIVE',
    'PENDING_APPROVAL',
]);

export const CatalogItemSchema = z.object({
    id: z.string().min(1),
    label: z.string().min(1),
    category: z.string().min(1),
    status: CatalogItemStatusSchema,
    synonyms: z.array(z.string()).optional(),
});

export type CatalogItem = z.infer<typeof CatalogItemSchema>;
export type CatalogItemStatus = z.infer<typeof CatalogItemStatusSchema>;
