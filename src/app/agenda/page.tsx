import prisma from "@/lib/prisma";
import Image from "next/image";

export default async function AgendaPage() {
    const events = await prisma.agendaEvent.findMany({
        where: {
            isActive: true,
            date: { gte: new Date() }
        },
        orderBy: { date: 'asc' }
    });

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <header className="bg-primary py-20 px-4 text-center text-white">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Notre Agenda</h1>
                    <p className="text-lg opacity-90">Découvrez nos prochains cultes, événements et campagnes spéciales.</p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 -mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.length === 0 ? (
                        <div className="col-span-full py-20 text-center bg-white rounded-4xl shadow-xl shadow-blue-900/5 text-gray-500 italic">
                            Aucun événement prévu pour le moment. Revenez bientôt !
                        </div>
                    ) : (
                        events.map((event) => (
                            <div key={event.id} className="bg-white rounded-4xl overflow-hidden shadow-xl shadow-blue-900/5 border border-gray-100 flex flex-col hover:scale-[1.02] transition-all duration-300 group">
                                <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
                                    {event.imageUrl ? (
                                        <Image
                                            src={event.imageUrl}
                                            alt={event.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-6xl opacity-20 text-primary">
                                            📅
                                        </div>
                                    )}
                                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg">
                                        <div className="text-center">
                                            <p className="text-xs font-bold text-primary uppercase tracking-tighter">
                                                {new Date(event.date).toLocaleDateString('fr-FR', { month: 'short' })}
                                            </p>
                                            <p className="text-2xl font-black text-gray-900">
                                                {new Date(event.date).getDate()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-primary transition-colors">
                                        {event.title}
                                    </h3>
                                    {event.description && (
                                        <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                                            {event.description}
                                        </p>
                                    )}
                                    <div className="pt-6 border-t border-gray-50 flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-gray-500 font-medium">
                                            <span className="text-primary text-lg">⏰</span>
                                            {new Date(event.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        {event.location && (
                                            <div className="flex items-center gap-2 text-gray-500 font-medium text-right">
                                                <span className="text-primary text-lg">📍</span>
                                                {event.location}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            {/* CTA */}
            <section className="max-w-4xl mx-auto mt-20 px-4 text-center">
                <div className="bg-white p-10 rounded-4xl border border-blue-50 shadow-xl shadow-blue-900/5">
                    <h2 className="text-2xl font-bold mb-4">Ne manquez rien !</h2>
                    <p className="text-gray-600 mb-8">Nous vous invitons à participer à tous nos cultes. Votre présence est une bénédiction pour nous.</p>
                    <a href="/contact" className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-primary/20 inline-block">Nous contacter</a>
                </div>
            </section>
        </div>
    );
}
