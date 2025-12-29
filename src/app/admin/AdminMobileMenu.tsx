'use client';

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Users, LayoutDashboard, Calendar, MessageSquare, Megaphone, Shield, ArrowLeft } from "lucide-react";

interface AdminMobileMenuProps {
    session: any;
    userPhoto: string | null | undefined;
}

export default function AdminMobileMenu({ session, userPhoto }: AdminMobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/members", label: "Membres", icon: Users },
        { href: "/admin/prayer-requests", label: "Prières", icon: MessageSquare },
        { href: "/admin/testimonies", label: "Témoignages", icon: Megaphone },
        { href: "/admin/users", label: "Usuários", icon: Shield },
        { href: "/admin/agenda", label: "Agenda", icon: Calendar },
    ];

    return (
        <div className="lg:hidden">
            {/* Top Bar for Mobile */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="p-2 -ml-2 text-gray-600 focus:outline-none"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-primary">Admin Shekinah</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs overflow-hidden border border-primary/10">
                    {userPhoto ? (
                        <img src={userPhoto} alt={session.user.name || "User"} className="object-cover w-full h-full" />
                    ) : (
                        "👤"
                    )}
                </div>
            </div>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-[280px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg overflow-hidden border border-primary/10">
                                {userPhoto ? (
                                    <img src={userPhoto} alt={session.user.name || "User"} className="object-cover w-full h-full" />
                                ) : (
                                    "👤"
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900 truncate max-w-[150px]">{session.user.name}</p>
                                <p className="text-[10px] text-gray-500 truncate max-w-[150px]">{session.user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
                        <Link
                            href="/member"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 text-primary font-bold hover:bg-primary/10 transition-colors mb-4 border border-primary/10"
                        >
                            <span className="text-lg">👤</span> Mon Profil (Admin)
                        </Link>

                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-gray-700 font-medium transition-colors"
                            >
                                <item.icon size={20} className="text-gray-400" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-gray-100">
                        <Link
                            href="/"
                            className="flex items-center gap-3 p-3 rounded-xl text-red-500 font-medium hover:bg-red-50 transition-colors"
                        >
                            <ArrowLeft size={18} />
                            Voltar ao site
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
