import { getTestimonies } from "@/app/actions/testimony";
import Image from "next/image";

export default async function TestimoniesPage() {
    const response = await getTestimonies();

    if (!response.success) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-red-500">Erreur: {response.error}</p>
            </div>
        );
    }

    const testimonies = response.data;

    return (
        <div className="min-h-screen bg-gray-50 py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Miracles & <span className="text-primary">Témoignages</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Découvrez comment Dieu agit puissamment dans la vie de nos membres.
                        Ces histoires sont la preuve vivante de Sa grâce et de Son amour.
                    </p>
                </div>

                {testimonies.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <p className="text-gray-400 text-lg">Aucun témoignage publié pour le moment.</p>
                        <p className="text-sm text-gray-400 mt-2">Soyez le premier à partager votre histoire !</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonies.map((testimony) => (
                            <div key={testimony.id} className="bg-white rounded-3xl p-8 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:scale-[1.02] transition-all border border-gray-100 flex flex-col">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-50">
                                        {testimony.member.photoUrl ? (
                                            <Image
                                                src={testimony.member.photoUrl}
                                                alt={testimony.member.fullName}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xl">👤</div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{testimony.member.fullName}</h3>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                                            {testimony.member.ministry || "Membre"}
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${testimony.type === 'MIRACLE'
                                        ? 'bg-purple-100 text-purple-600'
                                        : 'bg-primary/10 text-primary'
                                        }`}>
                                        {testimony.type === 'MIRACLE' ? '✨ Miracle' : '🗣️ Témoignage'}
                                    </span>
                                </div>

                                <div className="relative flex-grow">
                                    <span className="absolute -top-4 -left-2 text-6xl text-gray-100 font-serif leading-none">“</span>
                                    <p className="text-gray-600 leading-relaxed relative z-10">
                                        {testimony.content}
                                    </p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-50 text-right">
                                    <span className="text-xs text-gray-400 font-medium">
                                        {testimony.createdAt.toLocaleDateString("fr-FR", {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
