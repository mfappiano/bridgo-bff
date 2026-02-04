import {SearchCatalogResponseDto} from '../dtos/SearchCatalogResponse.dto';

export class CatalogMapper {
    static toSearchResponse(items: { id: string; label: string }[]): SearchCatalogResponseDto {
        return {
            items: items.map(catalog => ({
                id: catalog.id,
                label: catalog.label,
            })),
        };
    }
}
