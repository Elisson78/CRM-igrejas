"use client";

import { useEffect, useState } from "react";
import { getPendingTestimonies, toggleTestimonyStatus, deleteTestimony } from "@/app/actions/testimony";
import Image from "next/image";

interface Testimony {
    id: string;
    type: string;
    content: string;
    approved: boolean;
    createdAt: Date;
    member: {
        fullName: string;
        photoUrl: string | null;
    };
}

export default function AdminTestimonies() {
    const [testimonies, setTestimonies] = useState<Testimony[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTestimonies = async () => {
        setLoading(true);
        const response = await getPendingTestimonies();
        if (response.success) {
            setTestimonies(response.data);
        } else {
            console.error("Failed to fetch testimonies:", response.error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTestimonies();
    }, []);

    const handleToggle = async (id: string, currentStatus: boolean) => {
        const result = await toggleTestimonyStatus(id, !currentStatus);
        if (result.success) fetchTestimonies();
    };

    const handleDelete = async (id: string) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce témoignage ?")) {
            const result = await deleteTestimony(id);
            if (result.success) fetchTestimonies();
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Gestion des Témoignages</h1>

            {loading ? (
                <div>Chargement...</div>
            ) : testimonies.length === 0 ? (
                <div className="bg-white p-8 rounded-xl border border-gray-100 text-center text-gray-500">
                    Aucun témoignage à modérer par ici.
                </div>
            ) : (
                <div className="space-y-4">
                    {testimonies.map((t) => (
                        <div key={t.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center">
                            <div className="flex items-center gap-4 min-w-[200px]">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0 aspect-square">
                                    {t.member.photoUrl ? (
                                        <Image src={t.member.photoUrl} alt={t.member.fullName} fill className="object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-lg">👤</div>
                                    )}
                                </div>
                                <div>
                                    <div className="font-bold">{t.member.fullName}</div>
                                    <div className="text-xs text-gray-500">{new Date(t.createdAt).toLocaleDateString()}</div>
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="mb-2">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${t.type === 'MIRACLE' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                        {t.type}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm italic">"{t.content}"</p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleToggle(t.id, t.approved)}
                                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${t.approved
                                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                                        }`}
                                >
                                    {t.approved ? 'Masquer' : 'Approuver'}
                                </button>
                                <button
                                    onClick={() => handleDelete(t.id)}
                                    className="px-4 py-2 rounded-lg font-bold text-sm bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
