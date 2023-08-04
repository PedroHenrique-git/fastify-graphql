import { yogaRegister } from '@/infrastructure/fastify/registers/graphql';
import { createYogaInstance } from '@/infrastructure/yoga';
import { fastify } from 'fastify';
import { createServer } from 'http';

const app = fastify({
  logger: true,
  serverFactory: (handler) => {
    const server = createServer((req, res) => {
      handler(req, res);
    });

    return server;
  },
});

const yoga = createYogaInstance(app);

app.register(yogaRegister(yoga), { prefix: 'api' });

app.listen({ port: Number(process.env.PORT ?? 8000) }).catch((error) => {
  console.error(error);
  process.exit(1);
});
