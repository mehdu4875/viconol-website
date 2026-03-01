export default function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  const isDe = locale === 'de';

  return (
    <main className="min-h-screen bg-viconol-dark text-gray-300 pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-wider">
          {isDe ? 'Datenschutzerklärung' : 'Politique de Confidentialité'}
        </h1>
        
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-8 md:p-12 space-y-10 shadow-2xl">
          
          <section>
            <h2 className="text-xl font-bold text-viconol-primary mb-4 uppercase tracking-widest">
              1. {isDe ? 'Datenschutz auf einen Blick' : 'Aperçu de la protection des données'}
            </h2>
            <p className="leading-relaxed mb-4">
              {isDe 
                ? 'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.' 
                : 'Les indications suivantes donnent un aperçu simple de ce qui arrive à vos données personnelles lorsque vous visitez ce site web. Les données personnelles sont toutes les données avec lesquelles vous pouvez être personnellement identifié.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-viconol-primary mb-4 uppercase tracking-widest">
              2. {isDe ? 'Datenerfassung auf dieser Website' : 'Collecte des données via le formulaire'}
            </h2>
            <p className="leading-relaxed mb-4">
              <strong>{isDe ? 'Kontaktformular' : 'Formulaire de contact'}</strong>
            </p>
            <p className="leading-relaxed">
              {isDe 
                ? 'Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.' 
                : 'Si vous nous envoyez des demandes via le formulaire de contact, vos coordonnées du formulaire de demande, y compris les données de contact que vous y avez fournies, seront stockées par nous dans le but de traiter la demande et en cas de questions de suivi. Nous ne transmettons pas ces données sans votre consentement.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-viconol-primary mb-4 uppercase tracking-widest">
              3. {isDe ? 'Hosting' : 'Hébergement du site'}
            </h2>
            <p className="leading-relaxed">
              {isDe 
                ? 'Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen und Meta- und Kommunikationsdaten handeln.' 
                : 'Ce site est hébergé en externe. Les données personnelles collectées sur ce site sont stockées sur les serveurs de l\'hébergeur. Il peut s\'agir notamment d\'adresses IP et de données de communication.'}
            </p>
          </section>

          <p className="text-sm text-gray-600 mt-8 italic border-t border-white/5 pt-6">
            {isDe 
              ? '* Dies ist eine Basis-Datenschutzerklärung für einfache Websites mit einem Kontaktformular. Für eine vollständige Rechtssicherheit empfehlen wir die Nutzung eines Dienstes wie e-Recht24.' 
              : '* Il s\'agit d\'une politique de base. Nous vous recommandons de générer un texte officiel finalisé via un outil comme e-Recht24.'}
          </p>
        </div>
      </div>
    </main>
  );
}