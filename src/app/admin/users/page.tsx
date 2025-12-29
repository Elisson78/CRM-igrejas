import prisma from "@/lib/prisma";
import UsersClient from "./UsersClient";

export default async function UsersManagementPage() {
    // Buscar usuários e incluir informações do membro associado
    const users = await prisma.user.findMany({
        include: {
            member: true
        },
        orderBy: { name: 'asc' }
    });

    // Buscar lista de membros para o dropdown
    const members = await prisma.member.findMany({
        select: {
            id: true,
            fullName: true,
            status: true,
            city: true
        },
        orderBy: { fullName: 'asc' }
    });

    return <UsersClient users={users} members={members} />;
}
