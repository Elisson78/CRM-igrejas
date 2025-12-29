"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateMemberProfile(memberId: string, data: any) {
    try {
        await prisma.member.update({
            where: { id: memberId },
            data: {
                phone: data.phone,
                birthDate: data.birthDate,
                civilStatus: data.civilStatus,
                address: data.address,
                neighborhood: data.neighborhood,
                city: data.city,
                entryDate: data.entryDate,
                ministry: data.ministry,
                photoUrl: data.photoUrl,
            }
        });
        revalidatePath("/member");
        revalidatePath("/admin/members");
        return { success: true };
    } catch (error) {
        console.error("Error updating profile:", error);
        return { success: false, error: "Failed to update profile" };
    }
}
