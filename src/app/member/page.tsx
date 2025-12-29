import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import MemberDashboardClient from "@/components/MemberDashboardClient";

export default async function MemberDashboard() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/signin");
    }

    // Find member data linked to this user
    let member = await prisma.member.findFirst({
        where: {
            OR: [
                { user: { id: session.user.id } },
                { fullName: session.user.name || undefined } // Fallback for MVP
            ]
        },
        include: { attendances: true }
    });

    let autoCreated = false;

    // Auto-create member if not exists
    if (!member) {
        console.log(`Auto-creating member for user ${session.user.id}`);
        try {
            await prisma.$transaction(async (tx) => {
                // 1. Create Member
                const newMember = await tx.member.create({
                    data: {
                        fullName: session.user.name || "Nouveau Membre",
                        status: "MEMBRE_ACTIF", // Automatic activation
                    }
                });

                // 2. Link User to Member
                await tx.user.update({
                    where: { id: session.user.id },
                    data: { memberId: newMember.id }
                });

                member = { ...newMember, attendances: [] };
            });
            autoCreated = true;
        } catch (error) {
            console.error("Failed to auto-create member:", error);
            return (
                <div className="max-w-4xl mx-auto py-20 px-4 text-center">
                    <h1 className="text-3xl font-bold mb-4">Erreur</h1>
                    <p className="text-gray-600 mb-8">Une erreur est survenue lors de la création de votre profil. Veuillez contacter le support.</p>
                </div>
            );
        }
    }

    return (
        <MemberDashboardClient
            member={member}
            session={session}
            initiallyEditing={autoCreated || !member?.address || !member?.photoUrl}
        />
    );
}
