import {SearchRolesResponseDto} from '../dtos/SearchRolesResponse.dto';

export class RoleMapper {
    static toSearchResponse(items: { id: string; label: string }[]): SearchRolesResponseDto {
        return {
            items: items.map(role => ({
                id: role.id,
                label: role.label,
            })),
        };
    }
}
