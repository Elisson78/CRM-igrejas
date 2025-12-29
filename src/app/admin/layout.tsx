import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import AdminMobileMenu from "./AdminMobileMenu";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/signin");
    }

    if (session.user.role !== 'ADMIN') {
        redirect("/");
    }

    const member = await prisma.member.findFirst({
        where: {
            OR: [
                { user: { id: session.user.id } },
                { fullName: session.user.name || undefined }
            ]
        }
    });

    const userPhoto = member?.photoUrl || session.user.image;

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
            {/* Mobile Menu & Top Bar */}
            <AdminMobileMenu session={session} userPhoto={userPhoto} />

            {/* Sidebar (Desktop) */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col h-screen sticky top-0">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-primary mb-6">Admin Shekinah</h2>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                        <div className="relative w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg overflow-hidden border border-primary/10">
                            {userPhoto ? (
                                <img src={userPhoto} alt={session.user.name || "User"} className="object-cover w-full h-full" />
                            ) : (
                                "👤"
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">{session.user.name}</p>
                            <p className="text-[10px] text-gray-500 truncate">{session.user.email}</p>
                        </div>
                    </div>
                </div>
                <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
                    <Link href="/member" className="block p-3 rounded-xl bg-primary/5 text-primary font-bold hover:bg-primary/10 transition-colors mb-4 border border-primary/10">
                        👤 Mon Profil (Admin)
                    </Link>
                    <Link href="/admin" className="block p-3 rounded-xl hover:bg-blue-50 text-gray-700 font-medium transition-colors">📊 Dashboard</Link>
                    <Link href="/admin/members" className="block p-3 rounded-xl hover:bg-blue-50 text-gray-700 font-medium transition-colors">👥 Membres</Link>
                    <Link href="/admin/prayer-requests" className="block p-3 rounded-xl hover:bg-blue-50 text-gray-700 font-medium transition-colors">🙏 Prières</Link>
                    <Link href="/admin/testimonies" className="block p-3 rounded-xl hover:bg-blue-50 text-gray-700 font-medium transition-colors">📢 Témoignages</Link>
                    <Link href="/admin/users" className="block p-3 rounded-xl hover:bg-blue-50 text-gray-700 font-medium transition-colors">🔐 Usuários</Link>
                    <Link href="/admin/agenda" className="block p-3 rounded-xl hover:bg-blue-50 text-gray-700 font-medium transition-colors">📅 Agenda</Link>
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <Link href="/" className="block p-3 rounded-xl text-red-500 font-medium hover:bg-red-50 transition-colors">Voltar ao site</Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
