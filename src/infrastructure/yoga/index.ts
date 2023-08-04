import resolvers from '@/presentation/resolvers';
import typeDefs from '@/presentation/typeDefs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { createYoga } from 'graphql-yoga';
import { logger } from '../logger';

export const createYogaInstance = (fastify: FastifyInstance) =>
  createYoga<{
    req: FastifyRequest;
    reply: FastifyReply;
  }>({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers,
    }),
    logging: logger(fastify),
    parserAndValidationCache: true,
  });
