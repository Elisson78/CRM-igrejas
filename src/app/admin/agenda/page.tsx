import prisma from "@/lib/prisma";
import Image from "next/image";
import AdminAgendaClient from "@/components/AdminAgendaClient";

export default async function AdminAgendaPage() {
    const events = await prisma.agendaEvent.findMany({
        where: {
            date: { gte: new Date() }
        },
        orderBy: { date: 'asc' }
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Agenda & Créatifs</h1>
                    <p className="text-gray-500 mt-1">Gérez les événements et flyers du site</p>
                </div>
            </div>

            <AdminAgendaClient initialEvents={events} />
        </div>
    );
}
