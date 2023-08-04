import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import { YogaServerInstance } from 'graphql-yoga';

export const yogaRegister =
  (
    yoga: YogaServerInstance<
      {
        req: FastifyRequest;
        reply: FastifyReply;
      },
      Record<string, string>
    >,
  ): FastifyPluginCallback =>
  (instance, _, next) => {
    instance.route({
      url: yoga.graphqlEndpoint,
      method: ['GET', 'POST', 'OPTIONS'],

      handler: async (req, reply) => {
        const response = await yoga.handleNodeRequest(req, {
          req,
          reply,
        });

        response.headers.forEach((value, key) => {
          reply.header(key, value);
        });

        reply.status(response.status);

        reply.send(response.body);

        return reply;
      },
    });

    next();
  };
