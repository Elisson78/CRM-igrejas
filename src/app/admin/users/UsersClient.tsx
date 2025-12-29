"use client";

import { useState } from "react";
import RoleSelect from "@/components/RoleSelect";
import { linkUserToMember } from "@/app/actions/user";

interface UsersClientProps {
    users: any[];
    members: any[];
}

export default function UsersClient({ users, members }: UsersClientProps) {
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [selectedMemberId, setSelectedMemberId] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const handleLinkMember = async () => {
        if (!selectedUser) return;
        setLoading(true);

        const memberIdToSave = selectedMemberId === "none" ? null : selectedMemberId;

        const result = await linkUserToMember(selectedUser.id, memberIdToSave);

        if (result.success) {
            setSelectedUser(null);
            setSelectedMemberId("");
        } else {
            alert(result.error || "Erreur lors de la liaison");
        }
        setLoading(false);
    };

    const openLinkModal = (user: any) => {
        setSelectedUser(user);
        setSelectedMemberId(user.memberId || "none");
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
                <p className="text-gray-500 mt-1">Gérez les rôles et permissions des utilisateurs</p>
            </div>

            {selectedUser && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl">
                        <h2 className="text-xl font-bold mb-4">Lier l'utilisateur à un membre</h2>
                        <p className="mb-6 text-sm text-gray-600">
                            Sélectionnez le profil membre correspondant à l'utilisateur <strong>{selectedUser.name}</strong> ({selectedUser.email}).
                        </p>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">Membre</label>
                            <select
                                value={selectedMemberId}
                                onChange={(e) => setSelectedMemberId(e.target.value)}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                            >
                                <option value="none">-- Aucun membre lié --</option>
                                {members.map((member) => (
                                    <option key={member.id} value={member.id}>
                                        {member.fullName} ({member.city || "Sans ville"}) - {member.status}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="flex-1 py-3 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleLinkMember}
                                disabled={loading}
                                className={`flex-1 py-3 rounded-xl font-bold text-white transition-all shadow-lg shadow-primary/20 ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-opacity-90'}`}
                            >
                                {loading ? 'Enregistrement...' : 'Enregistrer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold">Utilisateur</th>
                                <th className="px-6 py-4 font-bold">Email</th>
                                <th className="px-6 py-4 font-bold">Rôle</th>
                                <th className="px-6 py-4 font-bold">Statut Membre</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900">{user.name || "N/A"}</div>
                                        <div className="text-xs text-gray-400">ID: {user.id}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <RoleSelect userId={user.id} initialRole={user.role} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => openLinkModal(user)}
                                            className={`text-xs font-bold px-3 py-1 rounded-full transition-all hover:opacity-80 ${user.member
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-gray-100 text-gray-400 border border-dashed border-gray-300'
                                                }`}
                                        >
                                            {user.member ? user.member.fullName : "+ Lier un membre"}
                                        </button>
                                        {user.member && (
                                            <div className="text-[10px] text-gray-400 mt-1 pl-1">
                                                {user.member.status}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
