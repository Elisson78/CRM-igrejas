"use client";

import { useState, useRef } from "react";
import { registerMember } from "@/app/actions/member";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("fullName") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const result = await registerMember({
            fullName: name,
            email,
            password,
            photoUrl: photoPreview || undefined
        });

        if (result.success) {
            // Auto-login after registration
            await signIn("credentials", {
                email,
                password,
                callbackUrl: "/member",
                redirect: true,
            });
        } else {
            setError(result.error || "Une erreur est survenue lors de l'inscription.");
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4 flex items-center justify-center">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-4xl shadow-xl shadow-blue-900/5 overflow-hidden border border-gray-100">
                    <div className="bg-primary p-8 text-white text-center">
                        <h1 className="text-2xl font-bold">Inscription</h1>
                        <p className="opacity-80 mt-2 text-sm">Créez votre compte Shekinah</p>
                    </div>

                    <form className="p-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 italic">
                                {error}
                            </div>
                        )}

                        {/* Photo Upload Section */}
                        <div className="flex flex-col items-center mb-4">
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="relative w-24 h-24 rounded-full border-4 border-primary/10 overflow-hidden cursor-pointer group hover:border-primary/30 transition-all shadow-md bg-gray-50 flex items-center justify-center"
                            >
                                {photoPreview ? (
                                    <Image src={photoPreview} alt="Preview" fill className="object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-gray-400">
                                        <span className="text-2xl mb-1">📸</span>
                                        <span className="text-[8px] font-bold uppercase tracking-wider">Photo</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                    <span className="text-white text-[10px] font-bold uppercase">Ajouter</span>
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handlePhotoChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                            <input name="fullName" required type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="Votre nom" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                            <input name="email" required type="email" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="votre@email.com" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe *</label>
                            <input name="password" required type="password" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" placeholder="••••••••" />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-2xl font-bold text-lg text-white transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-primary/20 ${loading ? 'bg-gray-400' : 'bg-primary'}`}
                        >
                            {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                        </button>

                        <p className="text-center text-sm text-gray-500 mt-4">
                            Déjà membre ? <Link href="/auth/signin" className="text-primary font-bold hover:underline">Connectez-vous</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
