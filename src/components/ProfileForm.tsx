"use client";

import { useState, useRef } from "react";
import { updateMemberProfile } from "@/app/actions/profile";
import Image from "next/image";

interface ProfileFormProps {
    member: any;
    onClose: () => void;
}

export default function ProfileForm({ member, onClose }: ProfileFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(member.photoUrl || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 8) value = value.slice(0, 8);

        if (value.length > 4) {
            value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
        } else if (value.length > 2) {
            value = `${value.slice(0, 2)}/${value.slice(2)}`;
        }
        e.target.value = value;
    };

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
        const data = Object.fromEntries(formData.entries());

        // Add photo if changed
        if (photoPreview && photoPreview !== member.photoUrl) {
            data.photoUrl = photoPreview;
        }

        const result = await updateMemberProfile(member.id, data);

        if (result.success) {
            onClose();
        } else {
            setError("Une erreur est survenue lors de la mise à jour.");
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 md:p-12 shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Compléter mon profil</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm italic">
                            {error}
                        </div>
                    )}

                    {/* Photo Upload Section */}
                    <div className="flex flex-col items-center mb-8">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="relative w-32 h-32 rounded-full border-4 border-primary/10 overflow-hidden cursor-pointer group hover:border-primary/30 transition-all shadow-lg shrink-0 aspect-square"
                        >
                            {photoPreview ? (
                                <Image src={photoPreview} alt="Preview" fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center text-gray-500">
                                    <span className="text-3xl mb-1">📸</span>
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Ajouter photo</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                <span className="text-white text-xs font-bold uppercase">Changer</span>
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

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone / WhatsApp</label>
                            <input name="phone" defaultValue={member.phone || ""} type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance (JJ/MM/AAAA)</label>
                            <input
                                name="birthDate"
                                defaultValue={member.birthDate || ""}
                                onChange={handleDateChange}
                                type="text"
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                placeholder="JJ/MM/AAAA"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">État civil</label>
                            <select name="civilStatus" defaultValue={member.civilStatus || "Célibataire"} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none">
                                <option>Célibataire</option>
                                <option>Marié(e)</option>
                                <option>Divorcé(e)</option>
                                <option>Veuf/Veuve</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ministère</label>
                            <select name="ministry" defaultValue={member.ministry || ""} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none">
                                <option value="">Nenhum / Membro</option>
                                <option value="Apóstolo">Apóstolo</option>
                                <option value="Pastor">Pastor</option>
                                <option value="Missionário">Missionário</option>
                                <option value="Evangelista">Evangelista</option>
                                <option value="Presbítero">Presbítero</option>
                                <option value="Obreiro">Obreiro</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input name="neighborhood" defaultValue={member.neighborhood || ""} type="text" placeholder="Quartier" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                            <input name="city" defaultValue={member.city || ""} type="text" placeholder="Ville" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                        </div>
                        <input name="address" defaultValue={member.address || ""} type="text" placeholder="Adresse complète" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date d'entrée (JJ/MM/AAAA)</label>
                        <input
                            name="entryDate"
                            defaultValue={member.entryDate || ""}
                            onChange={handleDateChange}
                            type="text"
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                            placeholder="JJ/MM/AAAA"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full sm:flex-1 py-4 rounded-2xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full sm:flex-1 py-4 rounded-2xl font-bold text-white transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-primary/20 ${loading ? 'bg-gray-400' : 'bg-primary'}`}
                        >
                            {loading ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
