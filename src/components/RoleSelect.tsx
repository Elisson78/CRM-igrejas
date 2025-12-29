"use client";

import { useState } from "react";
import { updateUserRole } from "@/app/actions/user";

export default function RoleSelect({ userId, initialRole }: { userId: string, initialRole: string }) {
    const [role, setRole] = useState(initialRole);
    const [loading, setLoading] = useState(false);

    const handleChange = async (newRole: string) => {
        setLoading(true);
        try {
            const res = await updateUserRole(userId, newRole);
            if (res.success) {
                setRole(newRole);
            } else {
                alert(res.error || "Erreur lors de la mise à jour");
                setRole(initialRole); // revert
            }
        } catch (error) {
            alert("Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <select
            value={role}
            disabled={loading}
            onChange={(e) => handleChange(e.target.value)}
            className={`text-xs font-bold py-1 px-3 rounded-full outline-none border-0 cursor-pointer transition-all ${role === 'ADMIN'
                ? 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                : role === 'MEMBER'
                    ? 'bg-green-100 text-green-600 hover:bg-green-200'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
        >
            <option value="USER">USER</option>
            <option value="MEMBER">MEMBER</option>
            <option value="ADMIN">ADMIN</option>
        </select>
    );
}
