import prismaClient from "../prisma";
interface DeleteCustomerProps {
    id: string;
}

class DeleteCustomerService {
    async execute({id}: DeleteCustomerProps) {

        if(!id){
            throw new Error("ID obrigatório");
        }
        const findCustomer = await prismaClient.customer.findFirst({
            where:{
                id: id
            }            
        })

        if(!findCustomer){
            throw new Error("Cliente não encontrado");
        }
        //deletando
        await prismaClient.customer.delete({
            where: {
                id: findCustomer.id
            }
        })

        return {message: "Cliente deletado com sucesso"}

    }
}

export {DeleteCustomerService}