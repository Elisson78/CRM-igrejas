"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateUserRole(userId: string, newRole: string) {
    try {
        const session = await auth();

        // Security check: Only admins can change roles
        if (!session?.user || session.user.role !== "ADMIN") {
            return { success: false, error: "Non autorisé." };
        }

        // Prevent admin from de-privileging themselves if needed, 
        // but for now we follow simple logic

        await prisma.user.update({
            where: { id: userId },
            data: { role: newRole }
        });

        revalidatePath("/admin/users");
        return { success: true };
    } catch (error: any) {
        console.error("Error updating user role:", error);
        return { success: false, error: "Erreur lors de la mise à jour do papel." };
    }
}

export async function linkUserToMember(userId: string, memberId: string | null) {
    try {
        const session = await auth();

        // Security check
        if (!session?.user || session.user.role !== "ADMIN") {
            return { success: false, error: "Non autorisé." };
        }

        await prisma.user.update({
            where: { id: userId },
            data: { memberId: memberId }
        });

        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Error linking user to member:", error);
        return { success: false, error: "Erreur lors de la liaison." };
    }
}
