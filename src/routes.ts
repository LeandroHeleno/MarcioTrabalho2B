import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerController } from "./controllers/CreateCustomerController";
import { ListCustomersController } from "./controllers/ListCustomersController";
import { DeleteCustomerController } from "./controllers/DeleteCustomerController";
import { ListCustomerByIdController } from "./controllers/ListCustomerByIdController";
import { UpdateCustomerController } from "./controllers/UpdateCustomerController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post("/customer", {
    schema: {
      description: 'Criar novo cliente',
      tags: ['Clientes'],
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
        },
        required: ['name', 'email']
      },
      response: {
        200: {
          description: 'Cliente cadastrado com sucesso',
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' } // Corrigido de 'demail' para 'email'
          }
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateCustomerController().handle(request, reply);
  });

  fastify.get("/customers", {
    schema: {
      description: 'Lista todos Clientes',
      tags: ['Clientes'],
      response: {
        200: {
          description: 'Lista de Clientes',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              status: { type: 'boolean' },
              created_at: { type: 'string', format: 'date-time' }, 
              updated_at: { type: 'string', format: 'date-time' }  
            }
          }
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListCustomersController().handle(request, reply);
  });

  fastify.delete("/customerDelete", {
    schema: {
      description: 'Delete cliente',
      tags: ['Clientes'],
      querystring: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      },
      response: {
        200: {
          description: 'Cliente Deletado com sucesso',
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new DeleteCustomerController().handle(request, reply);
  });

  fastify.get("/customerById", {
    schema: {
      description: 'Lista cliente por ID',
      tags: ['Clientes'],
      querystring: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      },
      response: {
        200: {
          description: 'Detalhe do cliente',
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            status: { type: 'boolean' },
            created_at: { type: 'string', format: 'date-time' }, 
            updated_at: { type: 'string', format: 'date-time' }  
          }
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListCustomerByIdController().handle(request, reply);
  });

  fastify.put("/customerUpdate", {
    schema: {
      description: 'Alterar Cliente',
      tags: ['Clientes'],
      body: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          status: { type: 'boolean' },
          created_at: { type: 'string', format: 'date-time' }, 
          updated_at: { type: 'string', format: 'date-time' }  
        },
        required: ['id']
      },
      response: {
        200: {
          description: 'Cliente alterado com sucesso',
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            status: { type: 'boolean' },
            created_at: { type: 'string', format: 'date-time' }, 
            updated_at: { type: 'string', format: 'date-time' }  
          }
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new UpdateCustomerController().handle(request, reply);
  });
}
