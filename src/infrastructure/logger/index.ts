/* eslint-disable @typescript-eslint/no-explicit-any */

import { FastifyInstance } from 'fastify';

export const logger = (app: FastifyInstance) => ({
  debug: (...args: any[]) => args.forEach((arg) => app.log.debug(arg)),
  info: (...args: any[]) => args.forEach((arg) => app.log.info(arg)),
  warn: (...args: any[]) => args.forEach((arg) => app.log.warn(arg)),
  error: (...args: any[]) => args.forEach((arg) => app.log.error(arg)),
});
