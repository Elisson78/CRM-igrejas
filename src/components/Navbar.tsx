import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";
import MobileMenu from "./MobileMenu";

async function handleSignOut() {
    'use server';
    await signOut();
}

export default async function Navbar() {
    const session = await auth();

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/logo.png"
                                alt="Shekinah Logo"
                                width={60}
                                height={60}
                                className="object-contain"
                            />
                            <span className="text-primary font-bold text-xl hidden md:block">
                                Shekinah International
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-primary transition-colors">Accueil</Link>
                        <Link href="/about" className="text-gray-700 hover:text-primary transition-colors">À propos</Link>
                        <Link href="/agenda" className="text-gray-700 hover:text-primary transition-colors">Agenda</Link>
                        <Link href="/temoignages" className="text-gray-700 hover:text-primary transition-colors">Miracles</Link>
                        <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">Contact</Link>
                        {session && (
                            <Link
                                href={session.user?.role === 'ADMIN' ? "/admin" : "/member"}
                                className="text-primary font-bold hover:text-primary/80 transition-colors"
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        {!session ? (
                            <div className="hidden md:flex items-center gap-4">
                                <Link
                                    href="/auth/signin"
                                    className="text-gray-700 font-medium hover:text-primary transition-colors"
                                >
                                    Connexion
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-all shadow-md shadow-primary/20"
                                >
                                    Devenir membre
                                </Link>
                            </div>
                        ) : (
                            <div className="hidden md:block">
                                <form action={handleSignOut}>
                                    <button
                                        type="submit"
                                        className="text-red-500 font-medium hover:text-red-600 transition-colors border border-red-100 px-4 py-1.5 rounded-full hover:bg-red-50"
                                    >
                                        Déconnexion
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Mobile Menu Trigger */}
                        <MobileMenu session={session} signOutAction={handleSignOut} />
                    </div>
                </div>
            </div>
        </nav>
    );
}
