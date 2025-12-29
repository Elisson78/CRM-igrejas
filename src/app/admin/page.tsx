import prisma from "@/lib/prisma";
import { MemberStatus } from "@prisma/client";

export default async function AdminDashboard() {
    const totalMembers = await prisma.member.count({
        where: { status: MemberStatus.MEMBRE_ACTIF }
    });

    const pendingApprovals = await prisma.member.count({
        where: { status: MemberStatus.VISITEUR }
    });

    // Since birthDate is now a String field, we'll skip the birthday count for now
    // or implement a client-side filter later
    const monthBirthdays = 0;

    const prayerRequestsCount = await prisma.prayerRequest.count({
        where: { status: "PENDING" }
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm shadow-blue-900/5">
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Total Membres Actifs</p>
                    <p className="text-4xl font-bold text-gray-900">{totalMembers}</p>
                    <div className="mt-4 text-xs text-green-600 font-bold bg-green-50 inline-block px-2 py-1 rounded-full">+0 ce mois</div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm shadow-blue-900/5">
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Inscriptions en Attente</p>
                    <p className="text-4xl font-bold text-primary">{pendingApprovals}</p>
                    <div className="mt-4 text-xs text-primary font-bold bg-blue-50 inline-block px-2 py-1 rounded-full">Nouveaux</div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm shadow-blue-900/5">
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Anniversaires du Mois</p>
                    <p className="text-4xl font-bold text-pink-500">{monthBirthdays}</p>
                    <div className="mt-4 text-xs text-pink-500 font-bold bg-pink-50 inline-block px-2 py-1 rounded-full">Fêtes</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold mb-6">Inscriptions Récentes</h2>
                    <div className="text-center py-10 text-gray-400 italic">
                        {pendingApprovals === 0 ? "Aucune inscription en attente" : `Il y a ${pendingApprovals} demandes à réviser.`}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold mb-6">Demandes de Prière</h2>
                    <div className="text-center py-10">
                        {prayerRequestsCount === 0 ? (
                            <p className="text-gray-400 italic">Aucune nouvelle demande.</p>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-3xl font-bold text-gray-900">{prayerRequestsCount}</p>
                                <p className="text-gray-500">Demandes en attente</p>
                                <a href="/admin/prayer-requests" className="inline-block text-primary font-bold hover:underline">Voir les demandes →</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
