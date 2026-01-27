import {
    SearchProfessionalsResponseDto
} from '~/modules/professional/dtos/ProfessionalResponse.dto';
import {ProfessionalSearch} from '~/modules/professional/domain/ProfessionalSearch';

export interface IProfessionalRepository {
    search(search: ProfessionalSearch): Promise<SearchProfessionalsResponseDto>;
}
