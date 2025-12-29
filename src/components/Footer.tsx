export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-primary font-bold text-lg mb-4">Shekinah International</h3>
                        <p className="text-gray-600 text-sm">
                            Manifestant la présence de Dieu aux nations.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Cultes</h4>
                        <ul className="text-gray-600 text-sm space-y-2">
                            <li>Mardi: 19h00</li>
                            <li>Dimanche: 18h30</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Adresse</h4>
                        <p className="text-gray-600 text-sm">
                            Rue du Prieuré 15<br />
                            1202 Genève, Suisse
                        </p>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-400 text-xs">
                    &copy; {new Date().getFullYear()} Église Baptiste Shekinah International. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}
