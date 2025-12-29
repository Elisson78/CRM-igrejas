import prisma from "@/lib/prisma";
import MembersClient from "./MembersClient";

export default async function MembersList() {
    const members = await prisma.member.findMany({
        orderBy: { fullName: 'asc' },
        include: { attendances: true } // Include attendances if needed by ProfileForm or just ensuring complete data
    });

    return <MembersClient members={members} />;
}
