"use client";

import { useState } from "react";
import { createPrayerRequest } from "@/app/actions/prayer-request";

export default function PrayerRequestForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const phone = formData.get("phone") as string;
        const email = formData.get("email") as string;
        const request = formData.get("request") as string;

        const result = await createPrayerRequest({ name, phone, email, request });

        if (result.success) {
            setSuccess(true);
            (e.target as HTMLFormElement).reset();
        } else {
            setError(result.error || "Une erreur est survenue");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {success && (
                <div className="bg-green-50 text-green-600 p-4 rounded-xl text-sm font-bold">
                    Votre demande a été envoyée avec succès !
                </div>
            )}

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm italic">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    name="name"
                    required
                    type="text"
                    placeholder="Votre nom"
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none bg-white"
                />
                <input
                    name="phone"
                    type="tel"
                    placeholder="Téléphone"
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none bg-white"
                />
            </div>

            <input
                name="email"
                type="email"
                placeholder="Votre email"
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none bg-white"
            />

            <textarea
                name="request"
                required
                placeholder="Votre demande de prière..."
                rows={4}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none bg-white"
            ></textarea>

            <button
                type="submit"
                disabled={loading}
                className={`w-full bg-primary text-white py-3 rounded-xl font-bold transition-all shadow-md active:scale-[0.98] ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'}`}
            >
                {loading ? 'Envoi en cours...' : 'Envoyer ma demande'}
            </button>
        </form>
    );
}
