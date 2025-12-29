"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { safeAction } from "@/lib/action-utils";

export async function createTestimony(memberId: string, type: "MIRACLE" | "TEMOIGNAGE", content: string) {
    return safeAction("createTestimony", async () => {
        await prisma.testimony.create({
            data: {
                memberId,
                type,
                content,
                approved: false // Requires admin approval
            }
        });

        revalidatePath("/temoignages");
        revalidatePath("/member");
        return { success: true };
    });
}

export async function getTestimonies() {
    return safeAction("getTestimonies", async () => {
        return await prisma.testimony.findMany({
            where: { approved: true },
            orderBy: { createdAt: 'desc' },
            include: {
                member: {
                    select: {
                        fullName: true,
                        photoUrl: true,
                        ministry: true
                    }
                }
            }
        });
    });
}

export async function getPendingTestimonies() {
    return safeAction("getPendingTestimonies", async () => {
        return await prisma.testimony.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                member: {
                    select: {
                        fullName: true,
                        photoUrl: true
                    }
                }
            }
        });
    });
}

export async function toggleTestimonyStatus(id: string, approved: boolean) {
    return safeAction("toggleTestimonyStatus", async () => {
        await prisma.testimony.update({
            where: { id },
            data: { approved }
        });
        revalidatePath("/admin/testimonies");
        revalidatePath("/temoignages");
        return { success: true };
    });
}

export async function deleteTestimony(id: string) {
    return safeAction("deleteTestimony", async () => {
        await prisma.testimony.delete({
            where: { id }
        });
        revalidatePath("/admin/testimonies");
        revalidatePath("/temoignages");
        return { success: true };
    });
}
