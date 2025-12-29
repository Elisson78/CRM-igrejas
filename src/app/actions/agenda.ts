"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function getAgendaEvents() {
    return await prisma.agendaEvent.findMany({
        where: {
            isActive: true,
            date: { gte: new Date() }
        },
        orderBy: { date: 'asc' }
    });
}

export async function getAllAgendaEvents() {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") return [];

    return await prisma.agendaEvent.findMany({
        orderBy: { date: 'asc' }
    });
}

export async function createAgendaEvent(data: {
    title: string;
    description?: string;
    date: string;
    imageUrl?: string;
    location?: string;
}) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return { success: false, error: "Non autorisé." };
        }

        await prisma.agendaEvent.create({
            data: {
                title: data.title,
                description: data.description,
                date: new Date(data.date),
                imageUrl: data.imageUrl,
                location: data.location,
            }
        });

        revalidatePath("/admin/agenda");
        revalidatePath("/agenda");
        revalidatePath("/");

        return { success: true };
    } catch (error: any) {
        console.error("Error creating agenda event:", error);
        return { success: false, error: "Erreur lors de la création de l'événement." };
    }
}

export async function deleteAgendaEvent(id: string) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return { success: false, error: "Non autorisé." };
        }

        await prisma.agendaEvent.delete({
            where: { id }
        });

        revalidatePath("/admin/agenda");
        revalidatePath("/agenda");
        revalidatePath("/");

        return { success: true };
    } catch (error: any) {
        console.error("Error deleting agenda event:", error);
        return { success: false, error: "Erreur lors de la suppression." };
    }
}

export async function updateAgendaEvent(id: string, data: {
    title: string;
    description?: string;
    date: string;
    imageUrl?: string;
    location?: string;
}) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return { success: false, error: "Non autorisé." };
        }

        const updateData: any = {
            title: data.title,
            description: data.description,
            date: new Date(data.date),
            location: data.location,
        };

        if (data.imageUrl) {
            updateData.imageUrl = data.imageUrl;
        }

        await prisma.agendaEvent.update({
            where: { id },
            data: updateData
        });

        revalidatePath("/admin/agenda");
        revalidatePath("/agenda");
        revalidatePath("/");

        return { success: true };
    } catch (error: any) {
        console.error("Error updating agenda event:", error);
        return { success: false, error: "Erreur lors de la mise à jour de l'événement." };
    }
}

export async function toggleAgendaEvent(id: string, isActive: boolean) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return { success: false, error: "Non autorisé." };
        }

        await prisma.agendaEvent.update({
            where: { id },
            data: { isActive }
        });

        revalidatePath("/admin/agenda");
        revalidatePath("/agenda");
        revalidatePath("/");

        return { success: true };
    } catch (error: any) {
        console.error("Error toggling agenda event:", error);
        return { success: false, error: "Erreur lors de la mise à jour." };
    }
}
