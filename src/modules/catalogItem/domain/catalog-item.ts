import { z } from 'zod';

export const CatalogItemStatusUnion = z.union([
    z.literal('ACTIVE'),
    z.literal('INACTIVE'),
    z.literal('PENDING_APPROVAL'),
]);

export const CategoryUnion = z.union([
    z.literal('IT'),
    z.literal('HEALTHCARE'),
]);

export const CatalogItemSchema = z.object({
    id: z.string().min(1),
    label: z.string().min(1),
    category: z.string().min(1),
    status: CategoryUnion,
    synonyms: z.array(z.string()).optional(),
});

export type CatalogItem = z.infer<typeof CatalogItemSchema>;
export type CatalogItemStatus = z.infer<typeof CatalogItemStatusUnion>;
