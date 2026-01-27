import { SearchProfessionalsResponseDto } from "~/modules/professional/dtos/ProfessionalResponse.dto";
import { SuggestProfessionalResponseDto } from "~/modules/professional/dtos/SearchSuggestedProffesionalResponse.dto";

export class SuggestProfessionalMapper {
    static toSearchResponse(
        backendResponse: SearchProfessionalsResponseDto
    ): SuggestProfessionalResponseDto {
        return backendResponse.professionalItems.map((p) => {
            const license = p.healthProfile?.license;
            return {
                id: p.id,
                name: p.firstName,
                lastName: p.lastName,
                healthProfile: license
                    ? {
                        license: {
                            number: license.number!,
                            authority: license.authority!,
                            region: license.region!,
                        },
                    }
                    : null,
            };
        });
    }
}
