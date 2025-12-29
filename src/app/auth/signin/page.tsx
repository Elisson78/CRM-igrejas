'use client';

import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Email ou mot de passe incorrect.");
            } else {
                // Fetch the session to get the user's role
                const session = await getSession();

                if (session?.user?.role === "ADMIN") {
                    router.push("/admin");
                } else {
                    router.push("/member");
                }

                router.refresh();
            }
        } catch (err) {
            setError("Une erreur est survenue lors de la connexion.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-8 border border-gray-100">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block mb-6">
                        <Image
                            src="/logo.png"
                            alt="Shekinah Logo"
                            width={80}
                            height={80}
                            className="mx-auto"
                        />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Connexion</h1>
                    <p className="text-gray-500 mt-2">Accédez à votre espace Shekinah</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Adresse Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                            placeholder="votre@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Connexion en cours..." : "Se connecter"}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>Utilisateurs de test :</p>
                    <div className="grid grid-cols-2 gap-2 mt-4 text-[10px]">
                        <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                            <span className="font-bold">Admin:</span><br />
                            admin@test.com<br />
                            <span className="text-primary font-bold">(Pass: admin)</span>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                            <span className="font-bold">Client:</span><br />
                            client@test.com<br />
                            <span className="text-primary font-bold">(Pass: user)</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-50 text-center">
                    <p className="text-sm text-gray-600">
                        Pas encore membre ?{" "}
                        <Link href="/register" className="text-primary font-bold hover:underline">
                            Inscrivez-vous
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
