import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateCustomerService } from "../services/UpdateCustomerService";

class UpdateCustomerController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        
        try {
            const { id ,name, email, status } = request.body as { id: string, name: string, email: string, status: boolean};

            const customerService = new UpdateCustomerService(); 

            const customer = await customerService.execute({ id, name, email, status  });

            reply.send(customer);
        } catch (error) {
            console.error("Error occurred while updating customer:", error);
            reply.code(500).send({ error: "Internal server error" });
        }
    }
}

export { UpdateCustomerController };
