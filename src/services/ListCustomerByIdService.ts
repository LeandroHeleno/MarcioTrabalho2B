import prismaClient from "../prisma";

interface ListCustomerById {
    id: string;
}

class ListCustomerByIdService {
    async execute({ id }: ListCustomerById) {
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
            throw new Error("customer does not exist!");
        }

        return findCustomer;
    }
}

export { ListCustomerByIdService };