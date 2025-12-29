"use server";

import prisma from "@/lib/prisma";

export async function addAttendance(memberId: string, type: string, notes?: string) {
    try {
        const attendance = await prisma.attendance.create({
            data: {
                memberId,
                type,
                notes,
            }
        });
        return { success: true, attendanceId: attendance.id };
    } catch (error) {
        console.error("Error adding attendance:", error);
        return { success: false, error: "Failed to add attendance" };
    }
}
