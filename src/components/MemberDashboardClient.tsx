"use client";

import { useState } from "react";
import Image from "next/image";
import ProfileForm from "@/components/ProfileForm";

import TestimonyForm from "@/components/TestimonyForm";

interface MemberDashboardClientProps {
    member: any;
    session: any;
    initiallyEditing?: boolean;
}

export default function MemberDashboardClient({ member, session, initiallyEditing = false }: MemberDashboardClientProps) {
    const [isEditing, setIsEditing] = useState(initiallyEditing);
    const [isTestimonyOpen, setIsTestimonyOpen] = useState(false);

    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            {isEditing && (
                <ProfileForm member={member} onClose={() => setIsEditing(false)} />
            )}

            {isTestimonyOpen && (
                <TestimonyForm memberId={member.id} onClose={() => setIsTestimonyOpen(false)} />
            )}

            <div className="bg-white rounded-4xl shadow-xl shadow-blue-900/5 overflow-hidden border border-gray-100">
                <div className="bg-primary h-32 relative">
                    <div className="absolute -bottom-16 left-8 md:left-12 w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center text-4xl">
                        {member.photoUrl ? (
                            <Image src={member.photoUrl} alt={member.fullName} fill className="object-cover" />
                        ) : (
                            "👤"
                        )}
                    </div>
                </div>

                <div className="pt-20 px-8 md:px-12 pb-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{member.fullName}</h1>
                            <p className="text-primary font-medium">{member.status.replace('_', ' ')}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <button
                                onClick={() => setIsTestimonyOpen(true)}
                                className="w-full sm:w-auto bg-white text-primary border-2 border-primary/10 px-6 py-3 rounded-full font-bold hover:bg-primary/5 transition-all text-center"
                            >
                                ✨ Partager un récit
                            </button>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="w-full sm:w-auto bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20 text-center"
                            >
                                Compléter profil
                            </button>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        {/* Info Section */}
                        <div className="md:col-span-2 space-y-8">
                            <div className="bg-gray-50 p-6 rounded-3xl">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <span className="text-primary">📋</span> Informations personnelles
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 text-sm">
                                    <div className="text-gray-700 uppercase tracking-wider text-[10px]">Téléphone</div>
                                    <div className="font-medium">{member.phone || "-"}</div>

                                    <div className="text-gray-700 uppercase tracking-wider text-[10px]">Date de naissance</div>
                                    <div className="font-medium">{member.birthDate || "-"}</div>

                                    <div className="text-gray-700 uppercase tracking-wider text-[10px]">État civil</div>
                                    <div className="font-medium">{member.civilStatus || "-"}</div>

                                    <div className="text-gray-700 uppercase tracking-wider text-[10px]">Adresse</div>
                                    <div className="font-medium">{member.address || "-"} {member.city}</div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-3xl">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <span className="text-primary">💒</span> Vie Spirituelle
                                </h3>
                                <div className="grid grid-cols-2 gap-y-4 text-sm">
                                    <div className="text-gray-700 uppercase tracking-wider text-[10px]">Date d'entrée</div>
                                    <div className="font-medium">{member.entryDate || "-"}</div>

                                    <div className="text-gray-700 uppercase tracking-wider text-[10px]">Ministère</div>
                                    <div className="font-medium italic">{member.ministry || "Aucun"}</div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Section */}
                        <div className="space-y-6">
                            <div className="bg-primary text-white p-6 rounded-3xl shadow-lg shadow-primary/20">
                                <h3 className="font-bold mb-2">Historique</h3>
                                <p className="text-sm opacity-80 mb-4">Consultez vos présences et participations.</p>
                                <div className="space-y-3">
                                    {member.attendances.length === 0 ? (
                                        <p className="text-xs italic opacity-60">Aucun historique enregistré</p>
                                    ) : (
                                        member.attendances.slice(0, 3).map((att: any) => (
                                            <div key={att.id} className="text-xs bg-white/10 p-2 rounded-lg">
                                                {att.date.toLocaleDateString('fr-FR')} - {att.type}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
