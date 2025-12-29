"use client";

import { useState } from "react";
import { createTestimony } from "@/app/actions/testimony";

interface TestimonyFormProps {
    memberId: string;
    onClose: () => void;
}

export default function TestimonyForm({ memberId, onClose }: TestimonyFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const type = formData.get("type") as "MIRACLE" | "TEMOIGNAGE";
        const content = formData.get("content") as string;

        const result = await createTestimony(memberId, type, content);

        if (result.success) {
            onClose();
        } else {
            setError(result.error || "Erreur lors de la publication");
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Partager un récit</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm italic">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type de récit</label>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="cursor-pointer">
                                <input type="radio" name="type" value="TEMOIGNAGE" className="peer hidden" defaultChecked />
                                <div className="p-4 rounded-xl border-2 border-gray-100 peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 transition-all text-center">
                                    <span className="text-2xl block mb-1">🗣️</span>
                                    <span className="font-bold text-sm text-gray-700">Témoignage</span>
                                </div>
                            </label>
                            <label className="cursor-pointer">
                                <input type="radio" name="type" value="MIRACLE" className="peer hidden" />
                                <div className="p-4 rounded-xl border-2 border-gray-100 peer-checked:border-purple-500 peer-checked:bg-purple-50 hover:border-purple-300 transition-all text-center">
                                    <span className="text-2xl block mb-1">✨</span>
                                    <span className="font-bold text-sm text-gray-700">Miracle</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Votre histoire</label>
                        <textarea
                            name="content"
                            required
                            rows={6}
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none resize-none"
                            placeholder="Racontez-nous ce que Dieu a fait..."
                        ></textarea>
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex-1 py-3 rounded-xl font-bold text-white transition-all shadow-lg shadow-primary/20 ${loading ? 'bg-gray-400' : 'bg-primary'}`}
                        >
                            {loading ? 'Publication...' : 'Publier'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
