import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function AdminPrayerRequests() {
    const requests = await prisma.prayerRequest.findMany({
        orderBy: { createdAt: "desc" },
    });

    async function deleteRequest(formData: FormData) {
        "use server";
        const id = formData.get("id") as string;
        await prisma.prayerRequest.delete({ where: { id } });
        revalidatePath("/admin/prayer-requests");
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">Demandes de Prière</h1>

            <div className="grid gap-6">
                {requests.length === 0 ? (
                    <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center text-gray-500 italic">
                        Aucune demande de prière trouvée.
                    </div>
                ) : (
                    requests.map((request) => (
                        <div key={request.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-lg font-bold text-gray-900">{request.name}</h3>
                                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full uppercase tracking-wider">
                                        {new Date(request.createdAt).toLocaleDateString("fr-FR")}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                    {request.email && (
                                        <div className="flex items-center gap-1">
                                            <span>📧</span> {request.email}
                                        </div>
                                    )}
                                    {request.phone && (
                                        <div className="flex items-center gap-1">
                                            <span>📞</span> {request.phone}
                                        </div>
                                    )}
                                </div>
                                <p className="text-gray-700 bg-blue-50/50 p-4 rounded-2xl italic mt-4 border border-blue-100/50">
                                    "{request.request}"
                                </p>
                            </div>
                            <div className="flex items-start md:items-center">
                                <form action={deleteRequest}>
                                    <input type="hidden" name="id" value={request.id} />
                                    <button className="text-red-500 hover:bg-red-50 p-3 rounded-xl transition-colors font-medium">
                                        Supprimer
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
