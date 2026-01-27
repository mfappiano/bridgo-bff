import { FastifyInstanceToken, Inject, Service } from "fastify-decorators";
import { FastifyInstance } from "fastify";

import { ProfessionalService } from "~/service/professional.service";
import { SuggestProfessionalMapper } from
        "~/modules/professional/mappers/suggestProfessional.mapper";

import { SuggestProfessionalResponseDto } from
        "~/modules/professional/dtos/SearchSuggestedProffesionalResponse.dto";
import {SearchSuggestedProfessionalsDto} from "~/modules/professional/dtos/SuggestProfessionalView.dto";

@Service()
export class SuggestProfessionalUseCase {

    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(ProfessionalService)
    private readonly professionalSearchService!: ProfessionalService;

    async execute(
        input: SearchSuggestedProfessionalsDto
    ): Promise<SuggestProfessionalResponseDto> {

        const logger = this.app.log.child({
            useCase: "SuggestProfessionalUseCase",
            input,
        });

        logger.info("Searching suggested professionals");

        const { context, query, filters, limit } = input;
        const searchText = query.text.trim().toLowerCase();

        // UX guardrail
        if (!searchText) {
            return [];
        }

        const backendResponse =
            await this.professionalSearchService.searchSuggestedProfessionals({
                context: {
                    category: context.category,
                    catalogItemId: context.catalogItemId,
                },
                query: { text: searchText },
                filters,
                limit,
            });

        return SuggestProfessionalMapper.toSearchResponse(
            backendResponse
        );
    }
}
