import Link from "next/link";
import Image from "next/image";
import PrayerRequestForm from "@/components/PrayerRequestForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="mb-8 relative w-64 h-64 md:w-80 md:h-80">
            <Image
              src="/logo.png"
              alt="Shekinah International"
              fill
              className="object-contain drop-shadow-2xl animate-fade-in"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Manifestant la Présence de Dieu <br />
            <span className="text-primary italic">aux Nations</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
            Bienvenue à l'Église Baptiste Shekinah International. Un lieu de restauration,
            de puissance et de transformation par l'Évangile de Jésus-Christ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/register"
              className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-primary/30"
            >
              Quero ser membro
            </Link>
            <Link
              href="/about"
              className="bg-white text-primary border-2 border-primary/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* Horaires des Cultes */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Horaires des Cultes</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-primary text-2xl">📅</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Culte d'Intercession</h3>
              <p className="text-primary font-semibold text-lg mb-4">Toutes les mardis à 19h00</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Rejoignez-nous pour un moment intense de prière et d'étude de la Parole.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-primary text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Culte de Celebration</h3>
              <p className="text-primary font-semibold text-lg mb-4">Toutes les dimanches à 18h30</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Célébrons ensemble la gloire de Dieu avec louange, adoration et message prophétique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section Snippet */}
      <section className="w-full py-20 bg-primary text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Notre Mission</h2>
              <p className="text-lg opacity-90 leading-relaxed mb-8">
                Gagner des âmes, restaurer des vies et former des disciples engagés avec la Parole de Dieu,
                capacitant chaque membre à vivre une foi pratique et transformatrice.
              </p>
              <Link
                href="/about"
                className="inline-block border-2 border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white hover:text-primary transition-all font-semibold"
              >
                Lire la mission complète
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl skew-y-3">
                <blockquote className="text-xl italic font-light italic opacity-90">
                  " Manifestant la présence de Dieu aux nations avec puissance, amour et vérité."
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary font-bold">SN</div>
                  <div>
                    <p className="font-bold">Apôtre Eli & Pra. Elizabeth</p>
                    <p className="text-xs opacity-75 uppercase tracking-wider">Leadership</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Abstract background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 transform translate-x-20"></div>
      </section>

      {/* Demande de Prière Section */}
      <section className="w-full py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Demande de Prière</h2>
            <p className="text-gray-600">Avez-vous besoin de prière ? Partagez vos besoins avec nous.</p>
          </div>
          <div className="bg-white p-8 md:p-12 rounded-4xl shadow-xl shadow-blue-900/5 border border-gray-100">
            <PrayerRequestForm />
          </div>
        </div>
      </section>

      {/* CTA Registration */}
      <section className="w-full py-24 text-center">
        <h2 className="text-3xl font-bold mb-8">Voulez-vous faire partie de cette famille ?</h2>
        <Link
          href="/register"
          className="bg-primary text-white px-12 py-5 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-primary/40 transition-all active:scale-95"
        >
          S'inscrire comme membre
        </Link>
      </section>
    </div>
  );
}
