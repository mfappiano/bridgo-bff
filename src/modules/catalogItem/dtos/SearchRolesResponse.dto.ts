import { z } from 'zod';

export const SearchRolesResponseSchema = z.object({
    items: z.array(
        z.object({
            id: z.string(),
            label: z.string(),
        }),
    ),
});

export type SearchRolesResponseDto = z.infer<typeof SearchRolesResponseSchema>;
