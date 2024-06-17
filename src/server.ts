import Fastify from "fastify";
import { routes } from "./routes";
import cors from "@fastify/cors";
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

const app = Fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  try {
    await app.register(cors);

    await app.register(swagger, {
      swagger: {
        info: {
          title: 'Fastify API',
          description: 'API documentation for the Fastify server',
          version: '1.0.0'
        },
        host: 'localhost:3333',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
      }
    });

    await app.register(swaggerUi, {
      routePrefix: '/documentation',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
      },
      uiHooks: {
        onRequest: function (request, reply, next) { next(); },
        preHandler: function (request, reply, next) { next(); },
      },
      staticCSP: true,
      transformStaticCSP: (header) => header,
      transformSpecification: (swaggerObject, request, reply) => { return swaggerObject; },
      transformSpecificationClone: true,
    });

    await app.register(routes);

    await app.listen({ port: 3333 });
    console.log('Server is running on http://localhost:3333');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
