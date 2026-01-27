import { z } from "zod";

/**
 * Enums
 */
export const ProfessionalCategorySchema = z.enum([
    "HEALTHCARE",
]);

export const VerificationStatusSchema = z.enum([
    "VERIFIED",
]);

export const LicenseInfoSchema = z.object({
    region: z.string().nullable(),
    number: z.string().nullable(),
    authority: z.string().nullable(),
});

/**
 * Item de profesional sugerido
 */
export const ProfessionalItemSchema = z.object({
    id: z.string().uuid(),

    firstName: z.string(),
    lastName: z.string(),

    categories: z.array(ProfessionalCategorySchema),

    talents: z.array(z.string().uuid()),

    professionalProfile: z.object({
        verificationStatus: VerificationStatusSchema,
    }),

    healthProfile: z.object({
        license: LicenseInfoSchema.nullable(),
    }),
});

export const SearchProfessionalsResponseSchema = z.object({
    professionalItems: z.array(ProfessionalItemSchema),
});

export type ProfessionalItemDto =
    z.infer<typeof ProfessionalItemSchema>;

export type SearchProfessionalsResponseDto =
    z.infer<typeof SearchProfessionalsResponseSchema>;
