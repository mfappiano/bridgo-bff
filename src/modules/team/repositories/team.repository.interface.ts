import {
    TeamDraftCreateRequestType,
    TeamDraftGetCurrentRequestType,
    TeamSnapshotResponseType
} from "~/api/team-draft/team-draft.model";
import {
    TeamResponseType,
    TeamUpdateRequestType
} from "~/api/team/team.model";
import {
    TeamSlotAssignRequestType,
    TeamSlotCreateRequestType,
    TeamSlotResponseType,
    TeamSlotUpdateRequestType
} from "~/api/team-slot/team-slot.model";


export interface ITeamRepository {
    createDraft(payload: TeamDraftCreateRequestType): Promise<TeamResponseType>;
    updateTeam(teamId: string, payload: TeamUpdateRequestType): Promise<TeamResponseType>;
    publishTeam(teamId: string): Promise<TeamResponseType>;
    createSlot(teamId: string, payload: TeamSlotCreateRequestType): Promise<TeamSlotResponseType>;
    updateSlot(teamId: string, slotId: string, payload: TeamSlotUpdateRequestType): Promise<TeamSlotResponseType>;
    assignSlot(teamId: string, slotId: string, payload: TeamSlotAssignRequestType): Promise<TeamSlotResponseType>;
    vacateSlot(teamId: string, slotId: string): Promise<TeamSlotResponseType>;
    getCurrentDraft(payload: TeamDraftGetCurrentRequestType): Promise<TeamSnapshotResponseType>;
    archiveTeam(teamId: string): Promise<TeamResponseType>;
}
