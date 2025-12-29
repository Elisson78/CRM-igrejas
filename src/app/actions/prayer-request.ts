"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPrayerRequest(formData: {
    name: string;
    phone?: string;
    email?: string;
    request: string;
}) {
    try {
        await prisma.prayerRequest.create({
            data: {
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                request: formData.request,
            },
        });

        revalidatePath("/admin/prayer-requests");
        return { success: true };
    } catch (error: any) {
        console.error("Error creating prayer request:", error);
        return {
            success: false,
            error: `Erreur: ${error.message || "Une erreur est survenue"}`
        };
    }
}

export async function getPrayerRequests() {
    try {
        return await prisma.prayerRequest.findMany({
            orderBy: { createdAt: "desc" },
        });
    } catch (error) {
        console.error("Error fetching prayer requests:", error);
        return [];
    }
}

export async function deletePrayerRequest(id: string) {
    try {
        await prisma.prayerRequest.delete({
            where: { id },
        });
        revalidatePath("/admin/prayer-requests");
        return { success: true };
    } catch (error) {
        console.error("Error deleting prayer request:", error);
        return { success: false, error: "Failed to delete" };
    }
}
