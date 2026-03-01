export default function ImpressumPage({ params: { locale } }: { params: { locale: string } }) {
  const isDe = locale === 'de';

  return (
    <main className="min-h-screen bg-viconol-dark text-gray-300 pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-wider">
          {isDe ? 'Impressum' : 'Mentions Légales'}
        </h1>
        
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-8 md:p-12 space-y-10 shadow-2xl">
          {/* Informations de la société */}
          <section>
            <h2 className="text-xl font-bold text-viconol-primary mb-4 uppercase tracking-widest">
              {isDe ? 'Angaben gemäß § 5 TMG' : 'Informations Générales'}
            </h2>
            <p className="leading-relaxed">
              <strong>VICONÖL</strong><br />
              [Ton Adresse - Rue et Numéro]<br />
              [Code Postal et Ville]<br />
              [Pays / Deutschland]
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-bold text-viconol-primary mb-4 uppercase tracking-widest">Contact</h2>
            <p className="leading-relaxed">
              Telefon: [Ton Numéro de Téléphone]<br />
              E-Mail: info@viconol.com
            </p>
          </section>

          {/* Représentant */}
          <section>
            <h2 className="text-xl font-bold text-viconol-primary mb-4 uppercase tracking-widest">
              {isDe ? 'Vertreten durch' : 'Représentant Légal'}
            </h2>
            <p className="leading-relaxed">
              [Ton Nom / Nom du Dirigeant]
            </p>
          </section>

          {/* Numéros légaux (TVA, Registre) */}
          <section>
            <h2 className="text-xl font-bold text-viconol-primary mb-4 uppercase tracking-widest">
              {isDe ? 'Registereintrag & Umsatzsteuer' : 'Immatriculation & TVA'}
            </h2>
            <p className="leading-relaxed">
              Handelsregister: [Ton numéro de registre si tu en as un]<br />
              Registergericht: [Tribunal compétent]<br />
              Umsatzsteuer-Identifikationsnummer (USt-IdNr.): [Ton numéro de TVA]
            </p>
          </section>

          <p className="text-sm text-gray-600 mt-8 italic border-t border-white/5 pt-6">
            {isDe 
              ? '* Bitte füllen Sie die in eckigen Klammern [ ] stehenden Platzhalter mit Ihren tatsächlichen Unternehmensdaten aus.' 
              : '* Veuillez remplacer les éléments entre crochets [ ] par les vraies données de votre entreprise.'}
          </p>
        </div>
      </div>
    </main>
  );
}