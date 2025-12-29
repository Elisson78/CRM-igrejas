"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { deleteAgendaEvent, toggleAgendaEvent } from "@/app/actions/agenda";
import AgendaForm from "./AgendaForm";

export default function AdminAgendaClient({ initialEvents }: { initialEvents: any[] }) {
    const [showForm, setShowForm] = useState(false);
    const [editingEvent, setEditingEvent] = useState<any | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleDelete = async (eventId: string) => {
        if (confirm("Supprimer cet événement ?")) {
            const result = await deleteAgendaEvent(eventId);
            if (!result.success) {
                alert(result.error);
            }
        }
    };

    const handleEdit = (event: any) => {
        setEditingEvent(event);
        setShowForm(true);
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingEvent(null);
    };

    return (
        <div className="space-y-8">
            {!showForm ? (
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
                >
                    <span className="text-xl">+</span> Nouvel Événement
                </button>
            ) : (
                <AgendaForm
                    event={editingEvent}
                    onCancel={handleCancelForm}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {initialEvents.length === 0 ? (
                    <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-gray-100 text-gray-400 italic">
                        Aucun événement enregistré.
                    </div>
                ) : (
                    initialEvents.map((event) => (
                        <div key={event.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm group">
                            <div className="aspect-[4/5] relative bg-gray-100">
                                {event.imageUrl && (
                                    <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
                                )}
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(event)}
                                        className="bg-white/90 backdrop-blur-sm p-2 rounded-xl text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-lg"
                                        title="Modifier"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => handleDelete(event.id)}
                                        className="bg-white/90 backdrop-blur-sm p-2 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                        title="Supprimer"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-gray-900 leading-tight">{event.title}</h3>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${event.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                        {event.isActive ? 'Actif' : 'Inactif'}
                                    </span>
                                </div>
                                <p className="text-primary text-sm font-bold mb-4 min-h-[1.25rem]">
                                    {isMounted && new Date(event.date).toLocaleDateString('fr-FR', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                                <button
                                    onClick={() => toggleAgendaEvent(event.id, !event.isActive)}
                                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${event.isActive
                                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                                        }`}
                                >
                                    {event.isActive ? 'Désactiver' : 'Activer'}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
