import { FastifyRequest, FastifyReply } from "fastify";
import { ListCustomerByIdService } from "../services/ListCustomerByIdService";

class ListCustomerById {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Extract id from request query
        const { id } = request.query as { id: string };

        const vacationService = new ListCustomerByIdService();

        const vacation = await vacationService.execute({ id });

        // Send response
        reply.send(vacation);
    }
}

export { ListCustomerById };
