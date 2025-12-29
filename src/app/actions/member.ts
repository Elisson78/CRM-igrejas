"use server";

import prisma from "@/lib/prisma";
import { MemberStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import { safeAction } from "@/lib/action-utils";

export async function registerMember(data: { fullName: string; email: string; password?: string; photoUrl?: string }) {
    return safeAction("registerMember", async () => {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (existingUser) {
            throw new Error("Cet email est déjà utilisé.");
        }

        // Hash password if provided
        let hashedPassword = data.password;
        if (data.password) {
            hashedPassword = await bcrypt.hash(data.password, 10);
        }

        return await prisma.$transaction(async (tx) => {
            // 1. Create the Member
            const member = await tx.member.create({
                data: {
                    fullName: data.fullName,
                    status: MemberStatus.VISITEUR,
                    photoUrl: data.photoUrl,
                }
            });

            // 2. Create the User and link to the Member
            const user = await tx.user.create({
                data: {
                    name: data.fullName,
                    email: data.email,
                    password: hashedPassword,
                    memberId: member.id,
                    role: "USER"
                }
            });

            return { memberId: member.id, userId: user.id };
        });
    });
}
