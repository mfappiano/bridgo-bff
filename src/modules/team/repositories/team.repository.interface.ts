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
    TeamSlotAssignmentResponseType,
    TeamSlotAssignmentUpdateRequestType,
    TeamSlotCreateRequestType,
    TeamSlotResponseType,
    TeamSlotUpdateRequestType
} from "~/api/team-slot/team-slot.model";


export interface ITeamRepository {
    createDraft(payload: TeamDraftCreateRequestType): Promise<TeamResponseType>;
    updateTeam(teamId: string, payload: TeamUpdateRequestType): Promise<TeamResponseType>;
    publishTeam(teamId: string): Promise<TeamResponseType>;
    associateTeamWithPatient(teamId: string, patientId: string): Promise<void>;
    createSlot(teamId: string, payload: TeamSlotCreateRequestType): Promise<TeamSlotResponseType>;
    updateSlot(teamId: string, slotId: string, payload: TeamSlotUpdateRequestType): Promise<TeamSlotResponseType>;
    assignSlot(teamId: string, slotId: string, payload: TeamSlotAssignRequestType): Promise<TeamSlotAssignmentResponseType>;
    updateAssignment(
        teamId: string,
        slotId: string,
        assignmentId: string,
        payload: TeamSlotAssignmentUpdateRequestType
    ): Promise<TeamSlotAssignmentResponseType>;
    vacateSlot(teamId: string, slotId: string): Promise<TeamSlotResponseType>;
    cancelAssignment(teamId: string, slotId: string, assignmentId: string): Promise<void>;
    getCurrentDraft(payload: TeamDraftGetCurrentRequestType): Promise<TeamSnapshotResponseType>;
    archiveTeam(teamId: string): Promise<TeamResponseType>;
}
