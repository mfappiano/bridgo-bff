import {FastifyInstance} from 'fastify';
import {bootstrap} from 'fastify-decorators';
import HealthController from './controllers/health.controller';
import ProfessionalController from "~/controllers/professional.controller";
import AuthController from "~/controllers/auth.controller";
import CatalogController from "~/controllers/catalog.controller";
import TeamController from "~/controllers/team.controller";
import TeamDraftController from "~/controllers/team-draft.controller";
import PatientController from "~/controllers/patient.controller";

function initRoutes(app: FastifyInstance) {
    app.register(bootstrap, {
        controllers: [
            CatalogController,
            HealthController,
            ProfessionalController,
            AuthController,
            TeamController,
            TeamDraftController,
            PatientController,
        ],
    });
}

export default initRoutes;
