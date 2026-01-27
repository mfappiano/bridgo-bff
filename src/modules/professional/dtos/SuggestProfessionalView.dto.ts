import {z} from "zod";
import {CategoryUnion} from "~/modules/catalogItem/domain/catalog-item";

export const SearchSuggestedProfessionalsRequestSchema = z.object({
    context:
        z.object({
            category: CategoryUnion,
            catalogItemId: z.string(),
        }),
    query: z.object({
        text: z.string().min(1),
    }),
    filters: z
        .object({
            talent:
                z.object({
                    obras_sociales: z.string().optional(),
                    guardias: z.boolean().optional(),
                })
                    .optional(),
            professional:
                z.object({
                    verified: z.boolean().optional(),
                })
                    .optional(),
        })
        .optional(),
    limit: z.number().min(1).max(50).default(10),
});

export type SearchSuggestedProfessionalsDto = z.infer<typeof SearchSuggestedProfessionalsRequestSchema>;

