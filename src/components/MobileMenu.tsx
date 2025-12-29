'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Menu } from "lucide-react";

interface MobileMenuProps {
    session: any;
    signOutAction: () => Promise<void>;
}

export default function MobileMenu({ session, signOutAction }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <div className="md:hidden">
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-gray-600 hover:text-primary transition-colors focus:outline-none"
                aria-label="Ouvrir le menu"
            >
                <Menu size={28} />
            </button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Menu Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <span className="font-bold text-primary text-lg">Menu</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Fermer le menu"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex-grow p-6 space-y-4 overflow-y-auto">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="block text-lg font-medium text-gray-800 hover:text-primary transition-colors"
                        >
                            Accueil
                        </Link>
                        <Link
                            href="/about"
                            onClick={() => setIsOpen(false)}
                            className="block text-lg font-medium text-gray-800 hover:text-primary transition-colors"
                        >
                            À propos
                        </Link>
                        <Link
                            href="/agenda"
                            onClick={() => setIsOpen(false)}
                            className="block text-lg font-medium text-gray-800 hover:text-primary transition-colors"
                        >
                            Agenda
                        </Link>
                        <Link
                            href="/temoignages"
                            onClick={() => setIsOpen(false)}
                            className="block text-lg font-medium text-gray-800 hover:text-primary transition-colors"
                        >
                            Miracles
                        </Link>
                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="block text-lg font-medium text-gray-800 hover:text-primary transition-colors"
                        >
                            Contact
                        </Link>

                        <div className="pt-4 mt-4 border-t border-gray-100">
                            {session ? (
                                <>
                                    <Link
                                        href={session.user?.role === 'ADMIN' ? "/admin" : "/member"}
                                        onClick={() => setIsOpen(false)}
                                        className="block p-3 rounded-xl bg-primary/5 text-primary font-bold mb-4"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={async () => {
                                            setIsOpen(false);
                                            await signOutAction();
                                        }}
                                        className="w-full text-left p-3 rounded-xl text-red-500 font-medium hover:bg-red-50 transition-colors"
                                    >
                                        Déconnexion
                                    </button>
                                </>
                            ) : (
                                <div className="space-y-3">
                                    <Link
                                        href="/auth/signin"
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full text-center py-3 text-gray-700 font-medium border border-gray-200 rounded-xl"
                                    >
                                        Connexion
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full text-center py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20"
                                    >
                                        Devenir membre
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>

                    <div className="p-6 border-t border-gray-100 bg-gray-50">
                        <p className="text-xs text-center text-gray-400" suppressHydrationWarning>
                            &copy; {new Date().getFullYear()} Shekinah International
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
