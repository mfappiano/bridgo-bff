import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Controller, FastifyInstanceToken, GET, Inject } from 'fastify-decorators';
import configuration from '~/cross-cutting/config';
import { HealthResponseSchemaType, healthSchema } from '~/api/health/health.api';

@Controller({ route: '/health' })
export default class HealthController {
  @Inject(FastifyInstanceToken)
  app!: FastifyInstance;

  // Se puede enviar el request o el reply en la firma de la funcion
  // tambien se puede injectarlo en el servicio
  @GET({
    url: '/',
    options: {
      schema: healthSchema,
    },
  })
  async success(
    _: FastifyRequest<{
      Reply: HealthResponseSchemaType;
    }>,
    reply: FastifyReply,
  ) {
    return reply.status(200).send({ ok: true, message: `running at port: ${configuration.port}` });
  }
}
