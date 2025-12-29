import PrayerRequestForm from "@/components/PrayerRequestForm";

export default function Contact() {
    return (
        <div className="flex flex-col items-center">
            <section className="w-full bg-primary py-20 text-white text-center">
                <h1 className="text-4xl md:text-5xl font-bold">Nous Contacter</h1>
            </section>

            <section className="max-w-7xl mx-auto py-20 px-4 w-full">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Info Side */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-6">Informations de Contact</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-primary">📍</div>
                                    <div>
                                        <h4 className="font-bold">Adresse</h4>
                                        <p className="text-gray-600">Rue du Prieuré 15, 1202 Genève, Suisse</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600 font-bold text-xs uppercase">WA</div>
                                    <div>
                                        <h4 className="font-bold cursor-pointer hover:text-green-600 transition-colors">WhatsApp</h4>
                                        <p className="text-gray-600">Contactez-nous directement sur WhatsApp</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 text-purple-600">✉️</div>
                                    <div>
                                        <h4 className="font-bold">Email</h4>
                                        <p className="text-gray-600">info@shekinah.ch</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                            <h3 className="font-bold text-xl mb-4">Demande de Prière</h3>
                            <p className="text-gray-600 mb-6 text-sm">
                                Vous avez besoin de prière ? Envoyez-nous votre demande et notre équipe interviendra.
                            </p>
                            <PrayerRequestForm />
                        </div>
                    </div>

                    {/* Map Side */}
                    <div className="h-[500px] md:h-auto min-h-[400px] rounded-4xl overflow-hidden border border-gray-200 shadow-xl lg:min-h-[600px]">
                        {/* Map centered on Rue du Prieuré 15, 1202 Genève */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2760.840700412803!2d6.141575812260682!3d46.21360697097722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c6523048ec171%3A0x6bba92078696328a!2sRue%20du%20Prieur%C3%A9%2015%2C%201202%20Gen%C3%A8ve!5e0!3m2!1sfr!2sch!4v1716480000000!5m2!1sfr!2sch"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale contrast-125"
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
}
