import {
    SearchProfessionalsResponseDto
} from '~/modules/professional/dtos/ProfessionalResponse.dto';
import {ProfessionalSearch} from '~/modules/professional/domain/ProfessionalSearch';
import type {
    ProfessionalInviteAcceptRequestType,
    ProfessionalInviteCreateRequestType,
    ProfessionalInviteResponseType,
} from '~/api';

export interface IProfessionalRepository {
    search(search: ProfessionalSearch): Promise<SearchProfessionalsResponseDto>;
    createInvite(payload: ProfessionalInviteCreateRequestType): Promise<ProfessionalInviteResponseType>;
    validateInvite(token: string): Promise<ProfessionalInviteResponseType>;
    acceptInvite(payload: ProfessionalInviteAcceptRequestType): Promise<ProfessionalInviteResponseType>;
}
