"use client";

import { useState } from "react";
import ProfileForm from "@/components/ProfileForm";
import Image from "next/image";

interface MembersClientProps {
    members: any[];
}

export default function MembersClient({ members }: MembersClientProps) {
    const [selectedMember, setSelectedMember] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("Tous les statuts");

    const filteredMembers = members.filter(member => {
        const matchesSearch = member.fullName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "Tous les statuts" || member.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Liste des Membres</h1>
                    <p className="text-gray-500 mt-1">Gérez et filtrez les membres de l'église</p>
                </div>
                <button className="bg-gray-800 text-white px-6 py-2 rounded-xl font-medium hover:bg-black transition-colors">
                    📤 Exporter CSV
                </button>
            </div>

            {selectedMember && (
                <ProfileForm
                    member={selectedMember}
                    onClose={() => setSelectedMember(null)}
                />
            )}

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex gap-4">
                    <input
                        type="text"
                        placeholder="Rechercher par nom..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none text-sm"
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="p-2 rounded-lg border border-gray-200 outline-none text-sm"
                    >
                        <option value="Tous les statuts">Tous les statuts</option>
                        <option value="MEMBRE_ACTIF">Actif</option>
                        <option value="VISITEUR">Visiteur</option>
                        <option value="INACTIF_TRANSFERE">Inactif</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold">Nom complet</th>
                                <th className="px-6 py-4 font-bold">Statut</th>
                                <th className="px-6 py-4 font-bold">Ministère</th>
                                <th className="px-6 py-4 font-bold">Ville</th>
                                <th className="px-6 py-4 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredMembers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">Aucun membre trouvé</td>
                                </tr>
                            ) : (
                                filteredMembers.map((member) => (
                                    <tr key={member.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0 aspect-square">
                                                    {member.photoUrl ? (
                                                        <Image src={member.photoUrl} alt={member.fullName} fill className="object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg">👤</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900">{member.fullName}</div>
                                                    <div className="text-xs text-gray-400">{member.phone || "Sans téléphone"}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${member.status === 'MEMBRE_ACTIF' ? 'bg-green-100 text-green-600' :
                                                member.status === 'VISITEUR' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-gray-100 text-gray-600'
                                                }`}>
                                                {member.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 italic">
                                            {member.ministry || "-"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {member.city || "-"}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setSelectedMember(member)}
                                                className="text-primary font-bold text-xs hover:underline hover:text-blue-700 transition-colors"
                                            >
                                                Editer
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
