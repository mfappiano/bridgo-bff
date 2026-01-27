import {FastifyInstance} from 'fastify';
import {healthSchemas, professionalSearchSchemas, roleSearchSchemas,} from '~/api/index';

/**
 * Se encarga de registrar todos los schemas de la aplicacion
 * Note: Luego ese schema puede ser utilizado usando el parametro $ref y el id del schema
 * @link https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/#core-concepts
 * Note: En caso de utilizar fastify-zod para crear schemas, el id por defecto es el nombre de la variable
 * @link https://github.com/elierotenberg/fastify-zod?tab=readme-ov-file#api
 * @param app
 */
export const initSchemas = async (app: FastifyInstance) => {
    const schemas = [
        ...healthSchemas,
        ...roleSearchSchemas,
        ...professionalSearchSchemas
    ];
    for (const schema of schemas) {
        app.addSchema(schema);
    }
};
