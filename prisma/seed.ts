console.log("⚡ LE SCRIPT DÉMARRE !");

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// --- FONCTION MAGIQUE DE TRADUCTION ---
// Elle remplace les termes techniques français par de l'allemand
function translateToGerman(text: string) {
  let de = text;
  
  // Dictionnaire de remplacement
  const replacements: [RegExp, string][] = [
    [/100% Synthèse/gi, "100% Synthetisch"],
    [/100% Synthétique/gi, "100% Synthetisch"],
    [/Semi-Synthèse/gi, "Teilsynthetisch"],
    [/Semi-Synthétique/gi, "Teilsynthetisch"],
    [/Minérale/gi, "Mineralisch"],
    [/Huile moteur/gi, "Motoröl"],
    [/Huile/gi, "Öl"],
    [/Pour moteurs/gi, "Für Motoren"],
    [/Essence/gi, "Benzin"],
    [/Diesel/gi, "Diesel"],
    [/Poids lourds/gi, "Schwerlastfahrzeuge"],
    [/Véhicules/gi, "Fahrzeuge"],
    [/Transmission/gi, "Getriebe"],
    [/Boîte de vitesses/gi, "Getriebe"],
    [/Boîtes à vitesses/gi, "Getriebe"],
    [/Freins/gi, "Bremsen"],
    [/Embrayage/gi, "Kupplung"],
    [/Conditions sévères/gi, "Harte Bedingungen"],
    [/Haute performance/gi, "Hochleistung"],
    [/Economie de carburant/gi, "Kraftstoffeinsparung"],
    [/Protection/gi, "Schutz"],
    [/Nettoyage/gi, "Reinigung"],
    [/Système/gi, "System"],
    [/Injecteurs/gi, "Injektoren"],
    [/Particules/gi, "Partikel"],
    [/Filtres/gi, "Filter"],
    [/Agricole/gi, "Landwirtschaft"],
    [/Industriel/gi, "Industrie"],
    [/Hydraulique/gi, "Hydraulik"],
    [/Compresseur/gi, "Kompressor"],
    [/Graisse/gi, "Fett"],
    [/Additif/gi, "Additiv"],
  ];

  replacements.forEach(([regex, replacement]) => {
    de = de.replace(regex, replacement);
  });

  return de;
}

async function main() {
  console.log('🌱 Connexion à la base de données...');
  
  try {
    // 1. Nettoyage
    console.log('🧹 Suppression des anciennes données...');
    await prisma.product.deleteMany();
    await prisma.range.deleteMany();
    await prisma.category.deleteMany();

    // 2. Création des Gammes (Avec Allemand !)
    console.log('🚀 Création des gammes (Ranges)...');
    
    const rExtraFull = await prisma.range.create({ data: { name: { fr: 'EXTRA FULL (100% Synthèse)', en: 'EXTRA FULL (100% Synthetic)', de: 'EXTRA FULL (100% Synthetisch)' } } });
    const rExtraBlitz = await prisma.range.create({ data: { name: { fr: 'EXTRA Blitz (Semi-Synthèse)', en: 'EXTRA Blitz (Semi-Synthetic)', de: 'EXTRA Blitz (Teilsynthetisch)' } } });
    const rSpyder = await prisma.range.create({ data: { name: { fr: 'SPYDER (Minérale)', en: 'SPYDER (Mineral)', de: 'SPYDER (Mineralisch)' } } });
    const rPX = await prisma.range.create({ data: { name: { fr: 'PX - Poids Lourds', en: 'PX - Heavy Duty', de: 'PX - Schwerlast' } } });

    const rTransMan = await prisma.range.create({ data: { name: { fr: 'Transmission Manuelle', en: 'Manual Transmission', de: 'Schaltgetriebe' } } });
    const rTransAuto = await prisma.range.create({ data: { name: { fr: 'Transmission Automatique', en: 'Automatic Transmission', de: 'Automatikgetriebe' } } });

    const rMoto2T = await prisma.range.create({ data: { name: { fr: 'Moto 2 Temps', en: 'Moto 2 Stroke', de: 'Motorrad 2-Takt' } } });
    const rMoto4T = await prisma.range.create({ data: { name: { fr: 'Moto 4 Temps', en: 'Moto 4 Stroke', de: 'Motorrad 4-Takt' } } });
    const rMotoGear = await prisma.range.create({ data: { name: { fr: 'Moto - Boîte & Fourche', en: 'Moto - Gear & Fork', de: 'Motorrad - Getriebe & Gabel' } } });

    const rAgriSTX = await prisma.range.create({ data: { name: { fr: 'Agricole - STX', en: 'Agri - STX', de: 'Landwirtschaft - STX' } } });
    const rAgriUTX = await prisma.range.create({ data: { name: { fr: 'Agricole - UTX', en: 'Agri - UTX', de: 'Landwirtschaft - UTX' } } });

    const rMarine = await prisma.range.create({ data: { name: { fr: 'Marine (Plaisance)', en: 'Marine (Leisure)', de: 'Marine (Freizeit)' } } });
    const rNaval = await prisma.range.create({ data: { name: { fr: 'Naval (Pro)', en: 'Naval (Pro)', de: 'Marine (Profi)' } } });

    const rIndusHydro = await prisma.range.create({ data: { name: { fr: 'Indus - Hydraulique', en: 'Indus - Hydraulic', de: 'Industrie - Hydraulik' } } });
    const rIndusComp = await prisma.range.create({ data: { name: { fr: 'Indus - Compresseurs', en: 'Indus - Compressors', de: 'Industrie - Kompressoren' } } });
    const rIndusGear = await prisma.range.create({ data: { name: { fr: 'Indus - Engrenages', en: 'Indus - Gears', de: 'Industrie - Getriebe' } } });
    const rIndusMetal = await prisma.range.create({ data: { name: { fr: 'Indus - Métaux', en: 'Indus - Metalworking', de: 'Industrie - Metallbearbeitung' } } });
    const rIndusDivers = await prisma.range.create({ data: { name: { fr: 'Indus - Divers', en: 'Indus - Misc', de: 'Industrie - Sonstiges' } } });

    const rGraisse = await prisma.range.create({ data: { name: { fr: 'Graisses', en: 'Greases', de: 'Fette' } } });
    const rAdditifs = await prisma.range.create({ data: { name: { fr: 'Additifs & Maintenance', en: 'Additives & Maintenance', de: 'Additive & Wartung' } } });


    // 3. Création des Catégories (Avec Allemand !)
    console.log('🚀 Création des catégories...');
    
    const catVL = await prisma.category.create({ data: { name: { fr: 'Véhicule Léger', en: 'Light Vehicles', de: 'Pkw & Transporter' }, slug: 'vehicule-leger', description: 'Tourisme & Utilitaires.' } });
    const catPL = await prisma.category.create({ data: { name: { fr: 'Poids Lourds', en: 'Heavy Duty', de: 'Lkw & Busse' }, slug: 'poids-lourds', description: 'Camions, Bus, TP.' } });
    const catTrans = await prisma.category.create({ data: { name: { fr: 'Transmission', en: 'Transmission', de: 'Getriebe' }, slug: 'transmission', description: 'Boîtes & Ponts.' } });
    const catMoto = await prisma.category.create({ data: { name: { fr: 'Moto', en: 'Moto', de: 'Motorrad' }, slug: 'moto', description: '2T & 4T.' } });
    const catNautique = await prisma.category.create({ data: { name: { fr: 'Nautique', en: 'Marine', de: 'Boote' }, slug: 'nautique', description: 'Plaisance & Hors-bord.' } });
    const catNaval = await prisma.category.create({ data: { name: { fr: 'Naval', en: 'Naval', de: 'Schifffahrt' }, slug: 'naval', description: 'Marine Marchande & Pro.' } });
    const catAgri = await prisma.category.create({ data: { name: { fr: 'Agricole', en: 'Agriculture', de: 'Landwirtschaft' }, slug: 'agricole', description: 'Tracteurs & Machines.' } });
    const catIndus = await prisma.category.create({ data: { name: { fr: 'Industriel', en: 'Industrial', de: 'Industrie' }, slug: 'industriel', description: 'Hydraulique, Usinage, Maintenance.' } });
    const catGraisses = await prisma.category.create({ data: { name: { fr: 'Graisses', en: 'Greases', de: 'Fette' }, slug: 'graisses', description: 'Graisses techniques.' } });
    const catAdditifs = await prisma.category.create({ data: { name: { fr: 'Additifs & Chimie', en: 'Additives & Chemicals', de: 'Additive & Chemie' }, slug: 'additifs', description: 'Boosters, Nettoyants, Liquides.' } });

    // 4. Liste des produits (On garde le Français en base, la fonction créera l'Allemand)
    const produits = [
      // VL
      { name: "EXTRA FULL EC 0W-30 C2", slug: "extra-full-ec-0w30-c2", rangeId: rExtraFull.id, categoryId: catVL.id, imageUrl: "/images/products/extra-full.png", shortDesc: "100% Synthétique - C2 (DPF)", longDesc: "Huile moteur totalement synthétique. Faible viscosité, économies carburant. ACEA C2-12." },
      { name: "EXTRA FULL C4 5W-30", slug: "extra-full-c4-5w30", rangeId: rExtraFull.id, categoryId: catVL.id, imageUrl: "/images/products/extra-full.png", shortDesc: "100% Synthèse - Renault DPF", longDesc: "Spécial Renault DPF (RN0720). ACEA C4." },
      { name: "EXTRA FULL F 5W-30 913D", slug: "extra-full-f-5w30-913d", rangeId: rExtraFull.id, categoryId: catVL.id, imageUrl: "/images/products/extra-full.png", shortDesc: "100% Synthèse - Ford", longDesc: "Recommandé pour Ford Diesel/Essence (913D). Economie carburant." },
      { name: "EXTRA FULL C3 5W-30 504/7", slug: "extra-full-c3-5w30-504-7", rangeId: rExtraFull.id, categoryId: catVL.id, imageUrl: "/images/products/extra-full.png", shortDesc: "100% Synthèse - VAG", longDesc: "Huile PAO pour Groupe VAG. VW 504.00/507.00." },
      { name: "EXTRA FULL C2 5W-30 PSA", slug: "extra-full-c2-5w30-psa", rangeId: rExtraFull.id, categoryId: catVL.id, imageUrl: "/images/products/extra-full.png", shortDesc: "100% Synthèse - PSA", longDesc: "Spécial PSA B7122902. ACEA C2 Mid SAPS." },
      { name: "EXTRA FULL C3 5W-30 DXS II", slug: "extra-full-c3-5w30-dxs2", rangeId: rExtraFull.id, categoryId: catVL.id, imageUrl: "/images/products/extra-full.png", shortDesc: "100% Synthèse - GM Opel", longDesc: "Dexos 2. Apte FAP. ACEA C3." },
      { name: "EXTRA FULL C3 5W-40", slug: "extra-full-c3-5w40", rangeId: rExtraFull.id, categoryId: catVL.id, imageUrl: "/images/products/extra-full.png", shortDesc: "100% Synthèse - Injecteurs Pompes", longDesc: "Spécial VW TDI-PD. ACEA C3, VW 505.01." },
      { name: "EXTRA FULL C1 5W-30", slug: "extra-full-c1-5w30", rangeId: rExtraFull.id, categoryId: catVL.id, imageUrl: "/images/products/extra-full.png", shortDesc: "100% Synthèse - Ford C1", longDesc: "ACEA C1, Ford M2C 934A. Low SAPS." },
      { name: "EXTRA FULL 5W-20 – 948B", slug: "extra-full-5w20-948b", rangeId: rExtraFull.id, categoryId: catVL.id, imageUrl: "/images/products/extra-full.png", shortDesc: "100% Synthèse - Ecoboost", longDesc: "Spécial Ford Ecoboost. ACEA A1/B1, Ford 948B." },
      { name: "EXTRA FULL FREECAR 5W-50", slug: "extra-full-freecar-5w50", rangeId: rExtraFull.id, categoryId: catVL.id, imageUrl: "/images/products/extra-full.png", shortDesc: "100% Synthèse - Sport/Voiturettes", longDesc: "Grande stabilité thermique. ACEA A3/B4." },
      { name: "EXTRA FULL C3 KTX 0W-40", slug: "extra-full-c3-ktx-0w40", rangeId: rExtraFull.id, categoryId: catVL.id, imageUrl: "/images/products/extra-full.png", shortDesc: "100% Synthèse - Climats Extrêmes", longDesc: "ACEA C3, Porsche A40, MB 229.52." },
      { name: "EXTRA FULL C3 OEM 547 5W-30", slug: "extra-full-c3-oem-547", rangeId: rExtraFull.id, categoryId: catVL.id, imageUrl: "/images/products/extra-full.png", shortDesc: "100% Synthèse - VAG Premium", longDesc: "PAO + Grp III. VW 504/507." },
      { name: "EXTRA FULL DRACO 0W-20", slug: "extra-full-draco-0w20", rangeId: rExtraFull.id, categoryId: catVL.id, imageUrl: "/images/products/extra-full.png", shortDesc: "100% Synthèse - Ultra Fluide", longDesc: "ACEA A3/B4, ILSAC GF-5. Economies carburant." },
      { name: "EXTRA FULL C3 0W-30 504/7", slug: "extra-full-c3-0w30-5047", rangeId: rExtraFull.id, categoryId: catVL.id, imageUrl: "/images/products/extra-full.png", shortDesc: "100% Synthèse - VAG 0W30", longDesc: "PAO pour VW 504.00/507.00." },
      { name: "EXTRA FULL BAVO6 0W-30", slug: "extra-full-bavo6-0w30", rangeId: rExtraFull.id, categoryId: catVL.id, imageUrl: "/images/products/extra-full.png", shortDesc: "100% Synthèse - Long Life FE", longDesc: "ACEA A5/B5, VW 503/506." },
      { name: "EXTRA FULL DRACO 0W-40", slug: "extra-full-draco-0w40", rangeId: rExtraFull.id, categoryId: catVL.id, imageUrl: "/images/products/extra-full.png", shortDesc: "100% Synthèse - Puissance", longDesc: "ACEA A3/B4, Porsche A40, MB 229.5." },
      { name: "EXTRA FULL C2/C3 547 5W-30", slug: "extra-full-c2-c3-547", rangeId: rExtraFull.id, categoryId: catVL.id, imageUrl: "/images/products/extra-full.png", shortDesc: "100% Synthèse - Polyvalente", longDesc: "ACEA C2/C3, VW 504/507, Dexos 2." },
      { name: "EXTRA FULL C2/C3 5W-30", slug: "extra-full-c2-c3-gen", rangeId: rExtraFull.id, categoryId: catVL.id, imageUrl: "/images/products/extra-full.png", shortDesc: "100% Synthèse - Universelle", longDesc: "ACEA C2/C3, PSA B71 2290, Dexos 2." },

      // Blitz
      { name: "EXTRA Blitz 10W40 Multi", slug: "extra-blitz-10w40-multi", rangeId: rExtraBlitz.id, categoryId: catVL.id, imageUrl: "/images/products/extra-blitz.png", shortDesc: "Semi-Synthèse Multi-usages", longDesc: "Essence et Diesel. ACEA A3/B4/E7." },
      { name: "EXTRA Blitz 10W40 A3/B4", slug: "extra-blitz-10w40-a3b4", rangeId: rExtraBlitz.id, categoryId: catVL.id, imageUrl: "/images/products/extra-blitz.png", shortDesc: "Semi-Synthèse Turbo", longDesc: "Conditions sévères. ACEA A3/B4." },
      { name: "EXTRA Blitz 10W40 Mineral", slug: "extra-blitz-10w40-min", rangeId: rExtraBlitz.id, categoryId: catVL.id, imageUrl: "/images/products/extra-blitz.png", shortDesc: "Minérale Standard", longDesc: "Conditions modérées. ACEA A3/B3." },
      { name: "EXTRA Blitz 5W40", slug: "extra-blitz-5w40", rangeId: rExtraBlitz.id, categoryId: catVL.id, imageUrl: "/images/products/extra-blitz.png", shortDesc: "Synthétique (Non DPF)", longDesc: "ACEA A3/B4, MB 229.5." },
      { name: "EXTRA Blitz 5W30", slug: "extra-blitz-5w30", rangeId: rExtraBlitz.id, categoryId: catVL.id, imageUrl: "/images/products/extra-blitz.png", shortDesc: "Synthétique (Non DPF)", longDesc: "ACEA A3/B4, Renault RN0700." },
      { name: "EXTRA Blitz OEM 554 10W30", slug: "extra-blitz-oem-10w30", rangeId: rExtraBlitz.id, categoryId: catVL.id, imageUrl: "/images/products/extra-blitz.png", shortDesc: "100% Synthèse Classique", longDesc: "Moteurs classiques 4T. Non adapté moteurs modernes." },
      { name: "EXTRA Blitz 10W60", slug: "extra-blitz-10w60", rangeId: rExtraBlitz.id, categoryId: catVL.id, imageUrl: "/images/products/extra-blitz.png", shortDesc: "100% Synthèse Sport", longDesc: "Haute viscosité pour moteurs classiques." },

      // Spyder
      { name: "SPYDER 15W-40", slug: "spyder-15w40", rangeId: rSpyder.id, categoryId: catVL.id, imageUrl: "/images/products/spyder.png", shortDesc: "Minérale Multigrade", longDesc: "Longue durée de service. API SL/CF-4." },
      { name: "SPYDER 10W30", slug: "spyder-10w30", rangeId: rSpyder.id, categoryId: catVL.id, imageUrl: "/images/products/spyder.png", shortDesc: "Minérale Fluide", longDesc: "Multigrade. API SL/CF-4." },
      { name: "SPYDER 20W50", slug: "spyder-20w50", rangeId: rSpyder.id, categoryId: catVL.id, imageUrl: "/images/products/spyder.png", shortDesc: "Minérale Sévère", longDesc: "Excellente protection. API SL/CF-4." },
      { name: "SPYDER 25W70", slug: "spyder-25w70", rangeId: rSpyder.id, categoryId: catVL.id, imageUrl: "/images/products/spyder.png", shortDesc: "Minérale Très Haute Viscosité", longDesc: "Vieux moteurs. API SG/CF-4." },
      { name: "SPYDER III", slug: "spyder-iii", rangeId: rSpyder.id, categoryId: catVL.id, imageUrl: "/images/products/spyder.png", shortDesc: "Minérale Monograde", longDesc: "Diesel conditions modérées. API CF." },

      // PL
      { name: "PX SAPS E6 10W40/5W30", slug: "px-saps-e6", rangeId: rPX.id, categoryId: catPL.id, imageUrl: "/images/products/px-truck.png", shortDesc: "100% Synthèse Euro VI", longDesc: "Low SAPS pour DPF/SCR. ACEA E6/E7/E9." },
      { name: "PX E4 10W40/5W30", slug: "px-e4", rangeId: rPX.id, categoryId: catPL.id, imageUrl: "/images/products/px-truck.png", shortDesc: "100% Synthèse Long Drain", longDesc: "Hautes perfs, sans FAP. ACEA E4/E7." },
      { name: "PX-THPD SAPS E9 15W40/10W40", slug: "px-thpd-e9", rangeId: rPX.id, categoryId: catPL.id, imageUrl: "/images/products/px-truck.png", shortDesc: "100% Synthèse E9", longDesc: "Low SAPS Euro V/VI. ACEA E9/E7." },
      { name: "PX-THPD E7 10W40/15W40", slug: "px-thpd-e7", rangeId: rPX.id, categoryId: catPL.id, imageUrl: "/images/products/px-truck.png", shortDesc: "HC Synthétique Euro III/IV", longDesc: "Haute perf sans DPF. ACEA E7." },

      // Transmission
      { name: "HPX WSTER LSD SAE 75W-90/140", slug: "hpx-wster", rangeId: rTransMan.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "100% Synthèse Ester LSD", longDesc: "Extrême pression très haut rendement pour différentiels à glissement limité. API GL-5." },
      { name: "HPX WS LSD 75W-90/140", slug: "hpx-ws", rangeId: rTransMan.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "Synthétique LSD", longDesc: "API GL-5." },
      { name: "HPX W SAE 80W-90", slug: "hpx-w", rangeId: rTransMan.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "Minéral LSD", longDesc: "API GL-5." },
      { name: "SXN STO 75W-140", slug: "sxn-sto", rangeId: rTransMan.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "100% Synthèse Charge Extrême", longDesc: "Scania STO 1:0." },
      { name: "SXN 235.11 SAE 75W-90", slug: "sxn-235-11", rangeId: rTransMan.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "100% Synthèse MB 235.11", longDesc: "API GL-4." },
      { name: "SXN-MWS SAE 75W-80", slug: "sxn-mws", rangeId: rTransMan.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "100% Synthèse Multifonctions", longDesc: "API GL-4, Hyundai, Toyota." },
      { name: "SXN SAE 75W-80", slug: "sxn-7580", rangeId: rTransMan.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "100% Synthèse GL-5", longDesc: "API GL-5 MT-1." },
      { name: "SXN SAE 75W-90", slug: "sxn-7590", rangeId: rTransMan.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "100% Synthèse Boîtes", longDesc: "Pour transmissions et différentiels forte charge. API GL-4/5." },
      { name: "SYN SAE 75W-80/75W-90", slug: "syn-sae", rangeId: rTransMan.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "Synthétique Eco Carburant", longDesc: "API GL-4/5." },
      { name: "SYN SAE 75W-80 INTEX", slug: "syn-intex", rangeId: rTransMan.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "Synthétique ZF Intarder", longDesc: "Avec Retarder intégré. API GL-4." },
      { name: "SYN G4 SAE 75W-80", slug: "syn-g4", rangeId: rTransMan.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "Synthétique GL-4", longDesc: "Multifonctions. API GL-4." },
      { name: "DCE – W 85W-140", slug: "dce-85140", rangeId: rTransMan.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "Minéral Charges Fortes", longDesc: "API GL-5." },
      { name: "DCE – W 80W-85", slug: "dce-8085", rangeId: rTransMan.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "Minéral Multifonctionnel", longDesc: "API GL-4." },
      { name: "DCE – W 80W-90", slug: "dce-8090", rangeId: rTransMan.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "Minéral Multifonctions", longDesc: "API GL-5." },
      { name: "DCE – W 75W-80 / DCE 80/90/140", slug: "dce-multi", rangeId: rTransMan.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "Minéral Multifonctions", longDesc: "API GL-4/5." },

      // Auto
      { name: "ATF GLOBAL MULTI", slug: "atf-global", rangeId: rTransAuto.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "Universel 100% Synthétique", longDesc: "Fluide multi-usages pour transmissions modernes. Audi, BMW, Allison, Dexron III, Mercon V." },
      { name: "ATF DRAIVER CVT", slug: "atf-cvt", rangeId: rTransAuto.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "CVT", longDesc: "Pour boîtes à variation continue." },
      { name: "ATF DCT-DSG", slug: "atf-dsg", rangeId: rTransAuto.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "DSG / DCT", longDesc: "Double embrayage." },
      { name: "ATF M 134A", slug: "atf-m134a", rangeId: rTransAuto.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "PAO MB NAG-2", longDesc: "Pour MB 236.14." },
      { name: "ATF DRAIVER DEXRON VI", slug: "atf-dexron-vi", rangeId: rTransAuto.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "100% Synthétique – DEXRON VI", longDesc: "Technologie GM DEXRON VI, remplace III et II. Pour BVA modernes." },
      { name: "ATF DRAIVER DEXRON III-H", slug: "atf-dexron-iii", rangeId: rTransAuto.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "Synthétique Dexron III", longDesc: "GM Dexron III-H." },
      { name: "ATF DRAIVER DEXRON II-D", slug: "atf-dexron-ii", rangeId: rTransAuto.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "Minéral Dexron II", longDesc: "GM Dexron II-D." },
      { name: "ATF SERVO 3", slug: "atf-servo", rangeId: rTransAuto.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "Servo-Direction", longDesc: "100% Synthétique pour DA." },
      { name: "POWER CHF 11", slug: "power-chf", rangeId: rTransAuto.id, categoryId: catTrans.id, imageUrl: "/images/products/transmission.png", shortDesc: "Hydraulique Central", longDesc: "PAO. Centrales hydrauliques, DA, amortisseurs." },

      // Additifs
      { name: "EXTRA DETOX FULL MULTI PERFORMANCE 6 IN 1", slug: "extra-detox-6in1", rangeId: rAdditifs.id, categoryId: catAdditifs.id, imageUrl: "/images/products/additifs.png", shortDesc: "Additif complet 6 en 1 - 1L", longDesc: "Traitement complet nettoyage moteur." },
      { name: "MULTI INJECTION FULL CLEANING 6 IN 1", slug: "multi-injection", rangeId: rAdditifs.id, categoryId: catAdditifs.id, imageUrl: "/images/products/additifs.png", shortDesc: "Nettoyant Injection - 300ml", longDesc: "Nettoyage système injection." },
      { name: "FOR DIESEL ANTIGEL", slug: "for-diesel-antigel", rangeId: rAdditifs.id, categoryId: catAdditifs.id, imageUrl: "/images/products/additifs.png", shortDesc: "Antigel - Anti-fumées Diesel", longDesc: "Protection froid et fumées." },
      { name: "FOR DIESEL", slug: "for-diesel", rangeId: rAdditifs.id, categoryId: catAdditifs.id, imageUrl: "/images/products/additifs.png", shortDesc: "Anti-fumées Diesel", longDesc: "Réduction des émissions." },
      { name: "FOR DIESEL BAC", slug: "for-diesel-bac", rangeId: rAdditifs.id, categoryId: catAdditifs.id, imageUrl: "/images/products/additifs.png", shortDesc: "Fongicide & Bactéricide", longDesc: "Traitement antibactérien diesel." },
      { name: "FOR OIL", slug: "for-oil", rangeId: rAdditifs.id, categoryId: catAdditifs.id, imageUrl: "/images/products/additifs.png", shortDesc: "Additif Moteur Essence", longDesc: "Traitement synthétique essence." },
      { name: "FOR FUEL OIL", slug: "for-fuel-oil", rangeId: rAdditifs.id, categoryId: catAdditifs.id, imageUrl: "/images/products/additifs.png", shortDesc: "Additif Diesel", longDesc: "Améliorant combustion." },
      { name: "DOT 4", slug: "dot-4", rangeId: rAdditifs.id, categoryId: catAdditifs.id, imageUrl: "/images/products/additifs.png", shortDesc: "Liquide de freins", longDesc: "Haute performance freinage." },
      { name: "DOT 5.1", slug: "dot-51", rangeId: rAdditifs.id, categoryId: catAdditifs.id, imageUrl: "/images/products/additifs.png", shortDesc: "Liquide de freins", longDesc: "Compétition et haute température." },
      { name: "L.H.M", slug: "lhm", rangeId: rAdditifs.id, categoryId: catAdditifs.id, imageUrl: "/images/products/additifs.png", shortDesc: "Fluide Suspensions", longDesc: "Spécial Citroën et hydraulique." },
      { name: "AFLOSH – DOBEL", slug: "aflosh-dobel", rangeId: rAdditifs.id, categoryId: catAdditifs.id, imageUrl: "/images/products/additifs.png", shortDesc: "Antioxydant Multi-usages", longDesc: "Protection." },

      // Moto
      { name: "MT-MX 2T", slug: "mt-mx-2t", rangeId: rMoto2T.id, categoryId: catMoto.id, imageUrl: "/images/products/moto.png", shortDesc: "100% Synthèse PAO", longDesc: "JASO FD - ISO L-EGD - API TC+." },
      { name: "MT-PLUS 2T", slug: "mt-plus-2t", rangeId: rMoto2T.id, categoryId: catMoto.id, imageUrl: "/images/products/moto.png", shortDesc: "Synthétique", longDesc: "JASO FC - ISO L-EGD." },
      { name: "MT-W2T", slug: "mt-w2t", rangeId: rMoto2T.id, categoryId: catMoto.id, imageUrl: "/images/products/moto.png", shortDesc: "Minéral", longDesc: "JASO FB - API TC." },
      { name: "MT-ELITE 10W60 / 10W50 / 5W40", slug: "mt-elite", rangeId: rMoto4T.id, categoryId: catMoto.id, imageUrl: "/images/products/moto.png", shortDesc: "100% Synthèse PAO", longDesc: "API SM - JASO MA2." },
      { name: "MT-PLUS 15W50 / 10W40 / 5W40", slug: "mt-plus-4t", rangeId: rMoto4T.id, categoryId: catMoto.id, imageUrl: "/images/products/moto.png", shortDesc: "Synthétique", longDesc: "API SM - JASO MA2." },
      { name: "MT-STER 5W50", slug: "mt-ster", rangeId: rMoto4T.id, categoryId: catMoto.id, imageUrl: "/images/products/moto.png", shortDesc: "100% Synthèse ESTER", longDesc: "Compétition. API SM - JASO MA2." },
      { name: "MT-B 20W-50", slug: "mt-b", rangeId: rMoto4T.id, categoryId: catMoto.id, imageUrl: "/images/products/moto.png", shortDesc: "Minéral", longDesc: "API SL - JASO MA2." },
      { name: "MT-GEAR 75W90", slug: "mt-gear", rangeId: rMotoGear.id, categoryId: catMoto.id, imageUrl: "/images/products/moto.png", shortDesc: "100% Synthèse Boîte", longDesc: "API GL-5." },
      { name: "MT-FE SAE 5W/7,5/10", slug: "mt-fe", rangeId: rMotoGear.id, categoryId: catMoto.id, imageUrl: "/images/products/moto.png", shortDesc: "100% Synthèse Fourche", longDesc: "Fluide amortisseurs et fourches." },

      // Marine
      { name: "NW-2T", slug: "nw-2t", rangeId: rMarine.id, categoryId: catNautique.id, imageUrl: "/images/products/marine.png", shortDesc: "100% Synthèse Bio", longDesc: "Hors-bord. NMMA TC-W3." },
      { name: "MRX-34/25 SAE 30/40/15W40", slug: "mrx-34-25", rangeId: rNaval.id, categoryId: catNaval.id, imageUrl: "/images/products/marine.png", shortDesc: "Diesel Marin Vitesse Moyenne", longDesc: "Pour fuels résiduels." },
      { name: "MRX- 1540/10 SAE 15W40", slug: "mrx-1540", rangeId: rNaval.id, categoryId: catNaval.id, imageUrl: "/images/products/marine.png", shortDesc: "Diesel Marin Rapide", longDesc: "Multi usages." },
      { name: "MRX-MTP15 SAE 30/40/15W40", slug: "mrx-mtp15", rangeId: rNaval.id, categoryId: catNaval.id, imageUrl: "/images/products/marine.png", shortDesc: "TBN Élevé - Cylindres", longDesc: "Pour fuel faible soufre." },
      { name: "MRX-THR40 SAE 40/50", slug: "mrx-thr40", rangeId: rNaval.id, categoryId: catNaval.id, imageUrl: "/images/products/marine.png", shortDesc: "TBN Élevé - Moteurs Lents", longDesc: "Lubrification cylindres." },
      { name: "MRX-THR70 SAE 40/50", slug: "mrx-thr70", rangeId: rNaval.id, categoryId: catNaval.id, imageUrl: "/images/products/marine.png", shortDesc: "TBN Élevé - Moteurs Lents", longDesc: "Lubrification cylindres." },
      { name: "MRX-THR8085 SAE 50/60", slug: "mrx-thr8085", rangeId: rNaval.id, categoryId: catNaval.id, imageUrl: "/images/products/marine.png", shortDesc: "TBN Élevé - Moteurs Lents", longDesc: "Lubrification cylindres." },
      { name: "MRX-THR05 SAE 30", slug: "mrx-thr05", rangeId: rNaval.id, categoryId: catNaval.id, imageUrl: "/images/products/marine.png", shortDesc: "Détergent Haute Perf", longDesc: "Diesel marins." },
      { name: "MRX-GEAR ISO 150/220/460", slug: "mrx-gear", rangeId: rNaval.id, categoryId: catNaval.id, imageUrl: "/images/products/marine.png", shortDesc: "Engrenages Marine", longDesc: "Extrême pression." },
      { name: "HXV- ISO 15/22/32/46/68/100", slug: "hxv-iso", rangeId: rNaval.id, categoryId: catNaval.id, imageUrl: "/images/products/marine.png", shortDesc: "Hydraulique Marine", longDesc: "Fortes variations température." },

      // Agri
      { name: "STX-MAX 10W-40", slug: "stx-max", rangeId: rAgriSTX.id, categoryId: catAgri.id, imageUrl: "/images/products/agri.png", shortDesc: "Synthétique Multifonction (STOU)", longDesc: "Moteur, Trans, Hydro. API CI-4." },
      { name: "STX-ST 10W-40/10W-30", slug: "stx-st", rangeId: rAgriSTX.id, categoryId: catAgri.id, imageUrl: "/images/products/agri.png", shortDesc: "Semi-Synthétique (STOU)", longDesc: "Moteur, Trans, Hydro. API CI-4." },
      { name: "STX 15W-40/10W-30", slug: "stx-min", rangeId: rAgriSTX.id, categoryId: catAgri.id, imageUrl: "/images/products/agri.png", shortDesc: "Minéral (STOU)", longDesc: "Moteur, Trans, Hydro. API CG-4." },
      { name: "UTX MAX 0W-30/5W-30/10W-30 LZS", slug: "utx-max", rangeId: rAgriUTX.id, categoryId: catAgri.id, imageUrl: "/images/products/agri.png", shortDesc: "100% Synthétique (UTTO)", longDesc: "Trans, Hydro, Freins immergés." },
      { name: "UTX BIOLUB 10W-30", slug: "utx-bio", rangeId: rAgriUTX.id, categoryId: catAgri.id, imageUrl: "/images/products/agri.png", shortDesc: "Bio Ester (UTTO)", longDesc: "Biodégradable >90%." },
      { name: "UTX FARMIX 10W-30/20W-30", slug: "utx-farmix", rangeId: rAgriUTX.id, categoryId: catAgri.id, imageUrl: "/images/products/agri.png", shortDesc: "Minéral (UTTO)", longDesc: "Trans, Hydro, Freins immergés." },

      // Indus
      { name: "LUX – HVS MAX ISO 32/46/68", slug: "lux-hvs-max", rangeId: rIndusHydro.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "100% Synthèse PAO Sans Cendres", longDesc: "Extrême pression, sans zinc. DIN 51524 HVLP." },
      { name: "LUX – HVS PL ISO 32/46/68", slug: "lux-hvs-pl", rangeId: rIndusHydro.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "100% Synthèse HC Sans Cendres", longDesc: "Extrême pression, sans zinc. DIN 51524 HVLP." },
      { name: "LUX – HVI PL ISO 32/46/68", slug: "lux-hvi-pl", rangeId: rIndusHydro.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Minéral Sans Cendres", longDesc: "Haut index viscosité. DIN 51524 HVLP." },
      { name: "LUX – MI PL ISO 32/46/68", slug: "lux-mi-pl", rangeId: rIndusHydro.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Minéral Monograde Sans Cendres", longDesc: "DIN 51524 HLP." },
      { name: "LUX – BOVA ISO 32/46/100", slug: "lux-bova", rangeId: rIndusHydro.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Pompes à vide", longDesc: "Sans cendres. DIN 51506-VDL." },
      { name: "LUX – VEL FLUID EP 3/6/10cSt", slug: "lux-vel", rangeId: rIndusHydro.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Huile de Broches", longDesc: "100% Synthèse sans cendres. ISO 6743/2." },
      { name: "LUX – APR ISO 22", slug: "lux-apr", rangeId: rIndusHydro.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Circuit Air Comprimé", longDesc: "100% Synthèse HC. ISO 6743/4 HH." },
      { name: "HYDRO – CIRH ISO 100/220/320", slug: "hydro-cirh", rangeId: rIndusHydro.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Huile Circulation", longDesc: "Laminoirs, pompes vide. DIN 51517 CLP." },
      { name: "HYDRO – ASC 176 ISO 46", slug: "hydro-asc", rangeId: rIndusHydro.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Levage - HVI", longDesc: "Pour industries de levage. Variations température." },
      { name: "HYDRO – V ISO 22/32/46/68/100", slug: "hydro-v", rangeId: rIndusHydro.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Minéral HVI", longDesc: "Climats extrêmes. AFNOR HV." },
      { name: "HYDRO – HLP–DP ISO 46/68", slug: "hydro-hlp-dp", rangeId: rIndusHydro.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Détergent & Dispersant", longDesc: "HLP-D. Emulsifiable." },
      { name: "HYDRO – M ISO 22/32/46/100", slug: "hydro-m", rangeId: rIndusHydro.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Monograde EP", longDesc: "Anti-usure. DIN 51524 HLP." },
      { name: "HYDRO – HFD5 ISO 46", slug: "hydro-hfd5", rangeId: rIndusHydro.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Résistant au feu", longDesc: "100% Synthèse Ester. ISO 6743/4 HFDR." },
      { name: "HYDRO – BIO VG6 ISO 46", slug: "hydro-bio-vg6", rangeId: rIndusHydro.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Biodégradable Ester", longDesc: "ISO 15380 HEES." },
      { name: "HYDRO – BIO STER5 ISO 46", slug: "hydro-bio-ster5", rangeId: rIndusHydro.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Biodégradable Ester Carboxylique", longDesc: "ISO 15380 HEES." },
      { name: "HYDRO – CMX V ISO 46/68", slug: "hydro-cmx", rangeId: rIndusHydro.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Alimentaire H1", longDesc: "Fluide hydraulique alimentaire." },
      { name: "SML MAX ISO 32/46/68", slug: "sml-max", rangeId: rIndusComp.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "100% Synthèse PAO", longDesc: "Compresseurs vis/alternatifs sévères. DIN 51506." },
      { name: "SML SA ISO 100/150", slug: "sml-sa", rangeId: rIndusComp.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "100% Synthèse Piston", longDesc: "Compresseurs alternatifs sévères." },
      { name: "SML MA ISO 100/150", slug: "sml-ma", rangeId: rIndusComp.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Minéral Piston", longDesc: "Compresseurs alternatifs modérés." },
      { name: "SML SR ISO 32/46/68", slug: "sml-sr", rangeId: rIndusComp.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "100% Synthèse Rotatifs", longDesc: "Vis et palettes sévères." },
      { name: "SML MR ISO 32/46/68", slug: "sml-mr", rangeId: rIndusComp.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Minéral Rotatifs", longDesc: "Vis et palettes modérés." },
      { name: "SML-RVS ISO 32/46/68", slug: "sml-rvs", rangeId: rIndusComp.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Frigorifique Naphténique", longDesc: "Pour Ammoniac R717, R600a. Basses temp." },
      { name: "SML G104 ISO 100/150", slug: "sml-g104", rangeId: rIndusComp.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "100% Synthèse Ester", longDesc: "Protection maximale longue durée." },
      { name: "SML CMX ISO 46/68/100", slug: "sml-cmx", rangeId: rIndusComp.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Alimentaire H1", longDesc: "Compresseurs industrie alimentaire." },
      { name: "GRP XA LAPA ISO 100..680", slug: "grp-xa", rangeId: rIndusGear.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "100% Synthèse Adhérente", longDesc: "Protection max usure/corrosion. DIN 51517 CLP." },
      { name: "GRP KLA ISO 680", slug: "grp-kla", rangeId: rIndusGear.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Adhérente Scies Géantes", longDesc: "Travail très sévère (carriers)." },
      { name: "GRP ST PLUS ISO 100..680", slug: "grp-st", rangeId: rIndusGear.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Semi-Synthèse Adhérente", longDesc: "Protection max. AGMA 250.04." },
      { name: "GRP PS ISO 100..680", slug: "grp-ps", rangeId: rIndusGear.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Minérale Adhérente", longDesc: "Protection max. DIN 51517 CLP." },
      { name: "GRP ISO 100..680", slug: "grp-iso", rangeId: rIndusGear.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Minérale", longDesc: "Engrenages industriels classiques." },
      { name: "GRP BIO STER5 ISO 100..680", slug: "grp-bio", rangeId: rIndusGear.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "100% Synthèse Ester", longDesc: "Hautes températures." },
      { name: "KORNA ST LP W", slug: "korna-st", rangeId: rIndusDivers.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Synthétique Adhérent", longDesc: "Glissières machines outils." },
      { name: "KORNA TS", slug: "korna-ts", rangeId: rIndusDivers.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Minéral Semi-Adhérent", longDesc: "Glissières machines outils." },
      { name: "KORNA LP W", slug: "korna-lp", rangeId: rIndusDivers.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Minéral Adhérent", longDesc: "Glissières machines outils." },
      { name: "CALO ISO 22/32/46/68", slug: "calo", rangeId: rIndusDivers.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Minéral Caloporteur", longDesc: "Jusqu'à 280°C." },
      { name: "CALOSYN ISO 32", slug: "calosyn", rangeId: rIndusDivers.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "100% Synthèse HC", longDesc: "-30°C à 290°C." },
      { name: "CALOSYN MAX ISO 32", slug: "calosyn-max", rangeId: rIndusDivers.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "100% Synthèse PAO", longDesc: "-30°C à 293°C." },
      { name: "CALOSYN XXL ISO 22/46", slug: "calosyn-xxl", rangeId: rIndusDivers.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "100% Synthèse Alkylbenzène", longDesc: "-30°C à 295°C." },
      { name: "POWER Vidange", slug: "power-vidange", rangeId: rIndusDivers.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Nettoyage Circuits", longDesc: "Dosage 100%." },
      { name: "LIMEMUL CONCENTRE", slug: "limemul", rangeId: rIndusDivers.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Nettoyage Circuits", longDesc: "Concentré 5%." },
      { name: "TWX ISO 22..460", slug: "twx", rangeId: rIndusDivers.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Outillage Pneumatique", longDesc: "Marteaux, clés à chocs." },
      { name: "TFL NOXI TT533", slug: "tfl-noxi-533", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Coupe Inox Très Sévère", longDesc: "Synthétique. Anti-brouillard." },
      { name: "TFL NOXI TT525", slug: "tfl-noxi-525", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Coupe Inox Sévère", longDesc: "Semi-Synthétique." },
      { name: "TFL NOXI TT520", slug: "tfl-noxi-520", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Coupe Inox Minéral", longDesc: "Minéral." },
      { name: "TFL NOXI 5150", slug: "tfl-noxi-5150", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Filetage Manuel Inox", longDesc: "Très haute sévérité." },
      { name: "TFL NOXI W435", slug: "tfl-noxi-w435", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Coupe Acier/Alu/Fonte", longDesc: "Très haute sévérité." },
      { name: "TFL NOXI W421", slug: "tfl-noxi-w421", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Coupe Acier/Alu/Fonte", longDesc: "Haute sévérité." },
      { name: "TFL NOXI W412", slug: "tfl-noxi-w412", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Coupe Acier/Alu/Fonte", longDesc: "Haute sévérité, fluide." },
      { name: "TFL BRONZE", slug: "tfl-bronze", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Coupe Bronze/Cuivre", longDesc: "Moyenne/Basse sévérité." },
      { name: "TFL SKINO PLUS 415", slug: "tfl-skino-415", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Filetage Machine", longDesc: "Acier, Alu, Fonte." },
      { name: "TFL SKINO 4130", slug: "tfl-skino-4130", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Filetage Manuel", longDesc: "Acier, Alu, Fonte." },
      { name: "TFL NOXI MQL-S3", slug: "tfl-mql-s3", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Micro-Lubrification Synthèse", longDesc: "MQL Haute sévérité." },
      { name: "TFL NOXI MQL-VG", slug: "tfl-mql-vg", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Micro-Lubrification Végétale", longDesc: "MQL Haute sévérité." },
      { name: "TFL NOXI MQL-M", slug: "tfl-mql-m", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Micro-Lubrification Minérale", longDesc: "MQL Haute sévérité." },
      { name: "TFL TOIL 30", slug: "tfl-toil-30", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Meulage", longDesc: "Synthèse. Haute sévérité." },
      { name: "TFL TOIL 26", slug: "tfl-toil-26", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Superfinition", longDesc: "Synthèse. Haute sévérité." },
      { name: "TFL ELECTRA 002", slug: "tfl-electra", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Electro-Erosion", longDesc: "Synthèse. EDM." },
      { name: "DEFORM XXL TT5115", slug: "deform-xxl-tt", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Emboutissage Inox", longDesc: "Sans chlore." },
      { name: "DEFORM XXL W10E", slug: "deform-w10e", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Emboutissage Très Sévère", longDesc: "Presses verticales." },
      { name: "DEFORM L W495", slug: "deform-l-w495", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Evaporable", longDesc: "Sans odeur." },
      { name: "DEFORM XXL TT5 Additif", slug: "deform-xxl-tt5", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Additif Extrême Inox", longDesc: "Pour frappe difficile." },
      { name: "TRAMPEX KTL 150", slug: "trampex", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Huile de Trempe", longDesc: "Haute sévérité." },
      { name: "EWORK SL EP", slug: "ework-sl", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Soluble Blanche", longDesc: "Emulsion blanche universelle." },
      { name: "EWORK SXT 2015", slug: "ework-sxt", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Soluble Opalescente", longDesc: "Semi-Synthétique." },
      { name: "EWORK STV 2015", slug: "ework-stv", rangeId: rIndusMetal.id, categoryId: catIndus.id, imageUrl: "/images/products/industrial.png", shortDesc: "Solution Verte", longDesc: "Synthétique." },

      // Graisses
      { name: "MOLY-TEMP EP 2", slug: "moly-temp-ep2", rangeId: rGraisse.id, categoryId: catGraisses.id, imageUrl: "/images/products/grease.png", shortDesc: "Graisse Tenace Graphite", longDesc: "Applications lourdes, chocs, humidité." },
      { name: "MULTI-PLEX EP 2", slug: "multi-plex-ep2", rangeId: rGraisse.id, categoryId: catGraisses.id, imageUrl: "/images/products/grease.png", shortDesc: "Lithium Complexe", longDesc: "Polyvalente haute température." },
      { name: "MULTI-TEMP EP 1", slug: "multi-temp-ep1", rangeId: rGraisse.id, categoryId: catGraisses.id, imageUrl: "/images/products/grease.png", shortDesc: "Multi-usages Premium", longDesc: "Pompage longues distances." },
      { name: "MULTI-TEMP EP 00", slug: "multi-temp-00", rangeId: rGraisse.id, categoryId: catGraisses.id, imageUrl: "/images/products/grease.png", shortDesc: "Semi-Fluide 00", longDesc: "Graissage centralisé." },
      { name: "MULTI-TEMP EP 0", slug: "multi-temp-0", rangeId: rGraisse.id, categoryId: catGraisses.id, imageUrl: "/images/products/grease.png", shortDesc: "Semi-Fluide 0", longDesc: "Graissage centralisé." },
      { name: "MULTI-TEMP EP 000", slug: "multi-temp-000", rangeId: rGraisse.id, categoryId: catGraisses.id, imageUrl: "/images/products/grease.png", shortDesc: "Fluide 000", longDesc: "Graissage centralisé." },
      { name: "MULTI-TEMP EP 3", slug: "multi-temp-ep3", rangeId: rGraisse.id, categoryId: catGraisses.id, imageUrl: "/images/products/grease.png", shortDesc: "Grade 3 Dur", longDesc: "Roulements larges, vibrations." },
      { name: "MULTI-TEMP EP 2", slug: "multi-temp-ep2", rangeId: rGraisse.id, categoryId: catGraisses.id, imageUrl: "/images/products/grease.png", shortDesc: "Lithium Standard", longDesc: "Economique et polyvalente." }
    ];

    console.log(`🚀 Insertion de ${produits.length} produits...`);

    for (const prod of produits) {
      const data = {
        name: prod.name,
        slug: prod.slug,
        shortDesc: { 
          fr: prod.shortDesc, 
          en: prod.shortDesc, // En anglais par défaut pour l'instant
          de: translateToGerman(prod.shortDesc) // Traduction automatique !
        }, 
        longDesc: { 
          fr: prod.longDesc, 
          en: prod.longDesc, 
          de: translateToGerman(prod.longDesc) // Traduction automatique !
        },
        imageUrl: prod.imageUrl,
        categoryId: prod.categoryId,
        rangeId: prod.rangeId,
        isFeatured: true
      };

      await prisma.product.create({ data });
      process.stdout.write('.');
    }

    console.log('\n🏁 TOUT EST FINI ! Base de données multilingue prête.');
  } catch (error) {
    console.error("\n❌ ERREUR :", error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });