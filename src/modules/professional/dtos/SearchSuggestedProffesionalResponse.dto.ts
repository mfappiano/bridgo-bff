// SuggestProfessionalView.dto.ts
import { z } from "zod";

export const SuggestProfessionalViewSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    lastName: z.string(),
    healthProfile: z
        .object({
            license: z
                .object({
                    number: z.string(),
                    authority: z.string(),
                    region: z.string(),
                })
                .nullable(),
        })
        .nullable(),
});

export const SuggestProfessionalResponseSchema =
    z.array(SuggestProfessionalViewSchema);

export type SuggestProfessionalViewDto =
    z.infer<typeof SuggestProfessionalViewSchema>;

export type SuggestProfessionalResponseDto =
    z.infer<typeof SuggestProfessionalResponseSchema>;
