import prismaClient from "../prisma";

interface UpdateCustomerProps {
    id: string;
    name: string;
    email: string;
    status: boolean;
}

class UpdateCustomerService {
    async execute({ id, name, email, status}: UpdateCustomerProps) {
        try {
            // Check if ID is provided
            if (!id) {
                throw new Error("Invalid request");
            }

            const findCustomer = await prismaClient.customer.findFirst({
                where: {
                    id: id
                }
            });

            if (!findCustomer) {
                throw new Error("customer not found!");
            }

            await prismaClient.customer.update({
                where: {
                    id: id
                },
                data: {
                    name,
                    email,
                    status,
                }
            });

            return { message: 'customer updated successfully' };
        } catch (error) {
            throw new Error('Error updating client');
        }
    }
}

export { UpdateCustomerService };
