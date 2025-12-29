import Image from "next/image";

export default function About() {
    return (
        <div className="flex flex-col items-center">
            {/* Page Header */}
            <section className="w-full bg-primary py-20 text-white text-center">
                <h1 className="text-4xl md:text-5xl font-bold">À propos de l'Église</h1>
            </section>

            {/* Content */}
            <section className="max-w-4xl mx-auto py-20 px-4">
                <div className="space-y-12">
                    <div>
                        <h2 className="text-3xl font-bold text-primary mb-6">Notre Mission</h2>
                        <p className="text-lg text-gray-700 leading-relaxed text-justify">
                            L'Église Baptiste Shekinah International a pour mission de manifester la présence de Dieu (Shekinah) aux nations,
                            en proclamant l'Évangile de Jésus-Christ avec puissance, amour et vérité. Notre but est de gagner des âmes,
                            de restaurer des vies et de former des disciples engagés dans la Parole de Dieu, en rendant chaque membre
                            capable de vivre une foi pratique, fructueuse et transformatrice dans la famille, l'église et la société.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 py-8">
                        <div className="bg-blue-50 p-8 rounded-3xl">
                            <h3 className="text-xl font-bold text-primary mb-4">Vision</h3>
                            <p className="text-gray-700">
                                Être une église pertinente, remplie de l'Esprit Saint, qui impacte les générations et porte le Royaume de Dieu au-delà des frontières.
                            </p>
                        </div>
                        <div className="bg-blue-50 p-8 rounded-3xl">
                            <h3 className="text-xl font-bold text-primary mb-4">Valeurs</h3>
                            <ul className="text-gray-700 space-y-2">
                                <li>• Amour et Vérité</li>
                                <li>• Restauraration de vies</li>
                                <li>• Puissance du Saint-Esprit</li>
                                <li>• Excellence et Intégrité</li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-primary mb-8 text-center md:text-left">Notre Leadership</h2>

                        {/* Titular Pastors */}
                        <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-50 p-8 rounded-4xl border border-gray-100">
                            <div className="w-48 h-48 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-4xl overflow-hidden relative border-4 border-white shadow-lg">
                                <span className="text-gray-400">👤</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Apôtre Eli & Pasteure Elizabeth do Nascimento</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Sous leur direction visionnaire, l'église continue de croître et d'impacter Geneve et les nations.
                                    Engagés dans l'enseignement de la saine doctrine et la manifestation de la gloire de Dieu,
                                    ils consacrent leur vie au service du Royaume.
                                </p>
                            </div>
                        </div>

                        {/* Auxiliary Pastors */}
                        <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-50 p-8 rounded-4xl border border-gray-100">
                            <div className="w-48 h-48 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-4xl overflow-hidden relative border-4 border-white shadow-lg">
                                <Image
                                    src="/images/leadership/pastors-santana.jpg"
                                    alt="Pasteurs Washington & Suelysmar Santana"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pasteurs Washington & Suelysmar Santana</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Dédiés au soutien de l'œuvre du Seigneur, les pasteurs Washington et Suelysmar Santana servent avec amour et dévouement au sein de notre communauté, contribuant à l'édification du corps de Christ et à l'accompagnement des membres.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
