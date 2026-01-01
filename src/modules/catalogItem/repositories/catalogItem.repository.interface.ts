import {CatalogSearchResponseDto} from "~/modules/catalogItem/dtos/catalogItemResponse.dto";

export interface ICatalogItemRepository {

    searchByCategory(
        category: string,
        query?: string,
        limit?: number
    ): Promise<CatalogSearchResponseDto>;
}
