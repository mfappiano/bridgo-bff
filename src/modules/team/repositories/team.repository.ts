import { FastifyInstance } from "fastify";
import { FastifyInstanceToken, Inject, Service } from "fastify-decorators";
import HttpClient from "~/cross-cutting/communication/http-client.communication";
import config from "~/cross-cutting/config";
import { ITeamRepository } from "~/modules/team/repositories/team.repository.interface";
import {
    TeamDraftCreateRequestType,
    TeamDraftGetCurrentRequestType,
    TeamSnapshotResponseType
} from "~/api/team-draft/team-draft.model";
import {
    TeamResponseType,
    TeamUpdateRequestType,
} from "~/api/team/team.model";
import {
    TeamSlotAssignRequestType,
    TeamSlotCreateRequestType,
    TeamSlotAssignmentResponseType,
    TeamSlotAssignmentUpdateRequestType,
    TeamSlotResponseType,
    TeamSlotUpdateRequestType
} from "~/api/team-slot/team-slot.model";

@Service()
export class TeamRepository implements ITeamRepository {
    private readonly baseUrl = `${config.kongUrl}/teams`;

    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(HttpClient)
    private readonly httpClient!: HttpClient;

    async createDraft(payload: TeamDraftCreateRequestType): Promise<TeamResponseType> {
        const logger = this.app.log.child({ module: "TeamRepository.createDraft" });
        logger.debug("Creating team draft");
        const { data } = await this.httpClient.post(`${this.baseUrl}/drafts`, payload);
        return data as TeamResponseType;
    }

    async updateTeam(teamId: string, payload: TeamUpdateRequestType): Promise<TeamResponseType> {
        const logger = this.app.log.child({ module: "TeamRepository.updateTeam" });
        logger.debug("Updating team draft");
        const { data } = await this.httpClient.patch(`${this.baseUrl}/${teamId}`, payload);
        return data as TeamResponseType;
    }

    async publishTeam(teamId: string): Promise<TeamResponseType> {
        const logger = this.app.log.child({ module: "TeamRepository.publishTeam" });
        logger.debug("Publishing team");
        const { data } = await this.httpClient.post(`${this.baseUrl}/${teamId}/publish`);
        return data as TeamResponseType;
    }

    async createSlot(teamId: string, payload: TeamSlotCreateRequestType): Promise<TeamSlotResponseType> {
        const logger = this.app.log.child({ module: "TeamRepository.createSlot" });
        logger.debug("Creating team slot");
        const { data } = await this.httpClient.post(`${this.baseUrl}/${teamId}/slots`, payload);
        return data as TeamSlotResponseType;
    }

    async updateSlot(
        teamId: string,
        slotId: string,
        payload: TeamSlotUpdateRequestType
    ): Promise<TeamSlotResponseType> {
        const logger = this.app.log.child({ module: "TeamRepository.updateSlot" });
        logger.debug("Updating team slot");
        const { data } = await this.httpClient.patch(
            `${this.baseUrl}/${teamId}/slots/${slotId}`,
            payload
        );
        return data as TeamSlotResponseType;
    }

    async assignSlot(
        teamId: string,
        slotId: string,
        payload: TeamSlotAssignRequestType
    ): Promise<TeamSlotAssignmentResponseType> {
        const logger = this.app.log.child({ module: "TeamRepository.assignSlot" });
        logger.debug("Assigning team slot");
        const { data } = await this.httpClient.post(
            `${this.baseUrl}/${teamId}/slots/${slotId}/assign`,
            payload
        );
        return data as TeamSlotAssignmentResponseType;
    }

    async updateAssignment(
        teamId: string,
        slotId: string,
        assignmentId: string,
        payload: TeamSlotAssignmentUpdateRequestType
    ): Promise<TeamSlotAssignmentResponseType> {
        const logger = this.app.log.child({ module: "TeamRepository.updateAssignment" });
        logger.debug("Updating team slot assignment");
        const { data } = await this.httpClient.patch(
            `${this.baseUrl}/${teamId}/slots/${slotId}/assignments/${assignmentId}`,
            payload
        );
        return data as TeamSlotAssignmentResponseType;
    }

    async vacateSlot(teamId: string, slotId: string): Promise<TeamSlotResponseType> {
        const logger = this.app.log.child({ module: "TeamRepository.vacateSlot" });
        logger.debug("Vacating team slot");
        const { data } = await this.httpClient.post(
            `${this.baseUrl}/${teamId}/slots/${slotId}/vacate`
        );
        return data as TeamSlotResponseType;
    }

    async cancelAssignment(
        teamId: string,
        slotId: string,
        assignmentId: string
    ): Promise<void> {
        const logger = this.app.log.child({ module: "TeamRepository.cancelAssignment" });
        logger.debug("Cancelling team slot assignment");
        await this.httpClient.post(
            `${this.baseUrl}/${teamId}/slots/${slotId}/assignments/${assignmentId}`
        );
    }

    async getCurrentDraft(payload: TeamDraftGetCurrentRequestType): Promise<TeamSnapshotResponseType> {
        const logger = this.app.log.child({ module: "TeamRepository.getCurrentDraft" });
        logger.debug("Getting current team draft");
        const { data } = await this.httpClient.get(`${this.baseUrl}/drafts/current`, {
            type: payload.type,
            category: payload.category,
        });
        return data as TeamSnapshotResponseType;
    }

    async archiveTeam(teamId: string): Promise<TeamResponseType> {
        const logger = this.app.log.child({ module: "TeamRepository.archiveTeam" });
        logger.debug("Archiving team");
        const { data } = await this.httpClient.post(`${this.baseUrl}/${teamId}/archive`);
        return data as TeamResponseType;
    }
}
