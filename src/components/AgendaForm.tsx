"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { createAgendaEvent, updateAgendaEvent } from "@/app/actions/agenda";

export default function AgendaForm({
    onCancel,
    event
}: {
    onCancel: () => void;
    event?: any;
}) {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(event?.imageUrl || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            date: formData.get("date") as string,
            location: formData.get("location") as string,
            imageUrl: preview || undefined
        };

        const result = event
            ? await updateAgendaEvent(event.id, data)
            : await createAgendaEvent(data);

        if (result.success) {
            onCancel();
        } else {
            alert(result.error || "Erreur lors de l'enregistrement");
            setLoading(false);
        }
    };

    // Format date for datetime-local input
    const formattedDate = event?.date
        ? new Date(event.date).toISOString().slice(0, 16)
        : "";

    return (
        <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-xl mb-10">
            <h2 className="text-xl font-bold mb-6">
                {event ? 'Modifier l\'Événement' : 'Ajouter un Événement / Flyer'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Titre de l'événement</label>
                            <input
                                name="title"
                                required
                                type="text"
                                defaultValue={event?.title}
                                placeholder="Ex: Culte Spécial"
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Date et Heure</label>
                            <input
                                name="date"
                                required
                                type="datetime-local"
                                defaultValue={formattedDate}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Lieu</label>
                            <input
                                name="location"
                                type="text"
                                defaultValue={event?.location}
                                placeholder="Ex: Temple principal"
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Flyer / Créatif</label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-all overflow-hidden relative"
                        >
                            {preview ? (
                                <Image src={preview} alt="Preview" fill className="object-cover" />
                            ) : (
                                <>
                                    <span className="text-3xl mb-2">🖼️</span>
                                    <span className="text-xs font-bold text-gray-400 uppercase">Cliquez pour ajouter l'image</span>
                                </>
                            )}
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handlePhotoChange} accept="image/*" className="hidden" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Description (optionnel)</label>
                    <textarea
                        name="description"
                        rows={3}
                        defaultValue={event?.description}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none resize-none"
                    ></textarea>
                </div>

                <div className="flex gap-4">
                    <button type="button" onClick={onCancel} className="flex-1 py-4 font-bold text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">Annuler</button>
                    <button type="submit" disabled={loading} className={`flex-1 py-4 font-bold text-white rounded-xl shadow-lg transition-all ${loading ? 'bg-gray-400' : 'bg-primary shadow-primary/20 hover:scale-[1.02]'}`}>
                        {loading ? (event ? 'Mise à jour...' : 'Création...') : (event ? 'Enregistrer les modifications' : 'Publier dans l\'Agenda')}
                    </button>
                </div>
            </form>
        </div>
    );
}
