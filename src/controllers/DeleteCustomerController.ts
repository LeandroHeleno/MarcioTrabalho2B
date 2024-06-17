import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteCustomerService } from "../services/DeleteCustomerService";

class DeleteCustomerConstroller{
    async handle(request: FastifyRequest, reply: FastifyReply) {

        const {id} = request.query as {id: string};

        const costumerService = new DeleteCustomerService();

        const customer = await costumerService.execute({id});

        reply.send(customer);
    }
}

export {DeleteCustomerConstroller}