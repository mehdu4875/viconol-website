console.log("⚡ LE SCRIPT DÉMARRE !");

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// --- FONCTION MAGIQUE DE TRADUCTION ---
function translateToGerman(text: string) {
  let de = text;
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
  replacements.forEach(([regex, replacement]) => { de = de.replace(regex, replacement); });
  return de;
}

// --- FONCTION D'ATTRIBUTION DES IMAGES ---
// --- FONCTION D'ATTRIBUTION DES IMAGES (Améliorée) ---
const availableImages = [
  '0W-16.png', '0W-20.png', '0W-30.png', '0W-40.png', 
  '10W30.png', '10W40.png', '15W-40.png', '20W-50.png', 
  '5W-20.png', '5W-40.png', '5W30.png', 'HD-40.png', 
  'HD-50.png', 'HD-60.png'
];

function getImageUrl(productName: string, isVL: boolean): string {
  // On enlève tous les espaces et les tirets du nom du produit pour faciliter la recherche
  // "EXTRA FULL 5W-30" devient "EXTRAFULL5W30"
  const normalizedProductName = productName.replace(/[-\s]/g, '').toUpperCase();

  for (const img of availableImages) {
    // On enlève le .png et on enlève les tirets du nom de l'image
    // "5W30.png" devient "5W30", "15W-40.png" devient "15W40"
    const term = img.replace('.png', '').replace(/[-\s]/g, '').toUpperCase(); 
    
    // On vérifie si "EXTRAFULL5W30" contient "5W30"
    if (normalizedProductName.includes(term)) {
      return `/images/products/${img}`;
    }
  }
  
  // Si c'est Véhicule Léger (VL) et qu'on n'a pas trouvé d'image spécifique
  if (isVL) return '/images/products/neutre.png';
  
  // Pour tout le reste (Industrie, PL, Agricole...)
  return '/images/products/fut.png';
}

async function main() {
  console.log('🌱 Connexion à la base de données...');
  
  try {
    // 1. Nettoyage de la base
    console.log('🧹 Suppression des anciennes données...');
    await prisma.product.deleteMany();
    await prisma.range.deleteMany();
    await prisma.category.deleteMany();

    // 2. Création des Gammes
    console.log('🚀 Création des gammes (Ranges)...');
    
    // Moteurs
    const rExtraFull = await prisma.range.create({ data: { name: { fr: 'EXTRA FULL (100% Synthèse)', en: 'EXTRA FULL (100% Synthetic)' } } });
    const rExtraBlitz = await prisma.range.create({ data: { name: { fr: 'EXTRA Blitz (Semi-Synthèse)', en: 'EXTRA Blitz (Semi-Synthetic)' } } });
    const rSpyder = await prisma.range.create({ data: { name: { fr: 'SPYDER (Minérale)', en: 'SPYDER (Mineral)' } } });
    const rPX = await prisma.range.create({ data: { name: { fr: 'PX - Poids Lourds', en: 'PX - Heavy Duty' } } });

    // Transmissions
    const rTransMan = await prisma.range.create({ data: { name: { fr: 'Transmission Manuelle', en: 'Manual Transmission' } } });
    const rTransAuto = await prisma.range.create({ data: { name: { fr: 'Transmission Automatique', en: 'Automatic Transmission' } } });

    // Moto
    const rMoto2T = await prisma.range.create({ data: { name: { fr: 'Moto 2 Temps', en: 'Moto 2 Stroke' } } });
    const rMoto4T = await prisma.range.create({ data: { name: { fr: 'Moto 4 Temps', en: 'Moto 4 Stroke' } } });
    const rMotoGear = await prisma.range.create({ data: { name: { fr: 'Moto - Boîte & Fourche', en: 'Moto - Gear & Fork' } } });

    // Agricole
    const rAgriSTX = await prisma.range.create({ data: { name: { fr: 'Agricole - STX', en: 'Agri - STX' } } });
    const rAgriUTX = await prisma.range.create({ data: { name: { fr: 'Agricole - UTX', en: 'Agri - UTX' } } });

    // Marine
    const rMarine = await prisma.range.create({ data: { name: { fr: 'Marine (Plaisance)', en: 'Marine (Leisure)' } } });
    const rNaval = await prisma.range.create({ data: { name: { fr: 'Naval (Pro)', en: 'Naval (Pro)' } } });

    // Industriel
    const rIndusHydro = await prisma.range.create({ data: { name: { fr: 'Indus - Hydraulique', en: 'Indus - Hydraulic' } } });
    const rIndusComp = await prisma.range.create({ data: { name: { fr: 'Indus - Compresseurs', en: 'Indus - Compressors' } } });
    const rIndusGear = await prisma.range.create({ data: { name: { fr: 'Indus - Engrenages', en: 'Indus - Gears' } } });
    const rIndusMetal = await prisma.range.create({ data: { name: { fr: 'Indus - Métaux', en: 'Indus - Metalworking' } } });
    const rIndusDivers = await prisma.range.create({ data: { name: { fr: 'Indus - Divers', en: 'Indus - Misc' } } });

    // Graisses & Additifs
    const rGraisse = await prisma.range.create({ data: { name: { fr: 'Graisses', en: 'Greases' } } });
    const rAdditifs = await prisma.range.create({ data: { name: { fr: 'Additifs & Maintenance', en: 'Additives & Maintenance' } } });


    // 3. Création des Catégories
    console.log('🚀 Création des catégories...');
    
    const catVL = await prisma.category.create({ data: { name: { fr: 'Véhicule Léger', en: 'Light Vehicles' }, slug: 'vehicule-leger', description: 'Tourisme & Utilitaires.' } });
    const catPL = await prisma.category.create({ data: { name: { fr: 'Poids Lourds', en: 'Heavy Duty' }, slug: 'poids-lourds', description: 'Camions, Bus, TP.' } });
    const catTrans = await prisma.category.create({ data: { name: { fr: 'Transmission', en: 'Transmission' }, slug: 'transmission', description: 'Boîtes & Ponts.' } });
    const catMoto = await prisma.category.create({ data: { name: { fr: 'Moto', en: 'Moto' }, slug: 'moto', description: '2T & 4T.' } });
    const catNautique = await prisma.category.create({ data: { name: { fr: 'Nautique', en: 'Marine' }, slug: 'nautique', description: 'Plaisance & Hors-bord.' } });
    const catNaval = await prisma.category.create({ data: { name: { fr: 'Naval', en: 'Naval' }, slug: 'naval', description: 'Marine Marchande & Pro.' } });
    const catAgri = await prisma.category.create({ data: { name: { fr: 'Agricole', en: 'Agriculture' }, slug: 'agricole', description: 'Tracteurs & Machines.' } });
    const catIndus = await prisma.category.create({ data: { name: { fr: 'Industriel', en: 'Industrial' }, slug: 'industriel', description: 'Hydraulique, Usinage, Maintenance.' } });
    const catGraisses = await prisma.category.create({ data: { name: { fr: 'Graisses', en: 'Greases' }, slug: 'graisses', description: 'Graisses techniques.' } });
    const catAdditifs = await prisma.category.create({ data: { name: { fr: 'Additifs & Chimie', en: 'Additives & Chemicals' }, slug: 'additifs', description: 'Boosters, Nettoyants, Liquides.' } });

    // =========================================================================
    // BASE DE DONNEES DES PRODUITS (Ton Catalogue Entier)
    // =========================================================================
    const produits = [
      // ----------------------------------------------------
      // GAMME EXTRA FULL (VL)
      // ----------------------------------------------------
      { name: "EXTRA FULL C4 5W-30", slug: "extra-full-c4-5w30", imageUrl: "/images/products/fut.png", rangeId: rExtraFull.id, categoryId: catVL.id, shortDesc: "100% Synthèse - Renault DPF", longDesc: "Spécial Renault DPF (RN0720). ACEA C4." },
      { name: "EXTRA FULL F 5W-30 913D", slug: "extra-full-f-5w30-913d", imageUrl: "/images/products/fut.png", rangeId: rExtraFull.id, categoryId: catVL.id, shortDesc: "100% Synthèse - Ford", longDesc: "Recommandé pour Ford Diesel/Essence (913D). Economie carburant." },
      { name: "EXTRA FULL C3 5W-30 504/7", slug: "extra-full-c3-5w30-504-7", imageUrl: "/images/products/fut.png", rangeId: rExtraFull.id, categoryId: catVL.id, shortDesc: "100% Synthèse - VAG", longDesc: "Huile PAO pour Groupe VAG. VW 504.00/507.00." },
      { name: "EXTRA FULL C2 5W-30 PSA", slug: "extra-full-c2-5w30-psa", imageUrl: "/images/products/fut.png", rangeId: rExtraFull.id, categoryId: catVL.id, shortDesc: "100% Synthèse - PSA", longDesc: "Spécial PSA B7122902. ACEA C2 Mid SAPS." },
      { name: "EXTRA FULL C3 5W-30 DXS II", slug: "extra-full-c3-5w30-dxs2", imageUrl: "/images/products/fut.png", rangeId: rExtraFull.id, categoryId: catVL.id, shortDesc: "100% Synthèse - GM Opel", longDesc: "Dexos 2. Apte FAP. ACEA C3." },
      { name: "EXTRA FULL C3 5W-40", slug: "extra-full-c3-5w40", imageUrl: "/images/products/fut.png", rangeId: rExtraFull.id, categoryId: catVL.id, shortDesc: "100% Synthétique - Injecteurs Pompes", longDesc: "Spécial VW TDI-PD. ACEA C3, VW 505.01." },
      { name: "EXTRA FULL C1 5W-30", slug: "extra-full-c1-5w30", imageUrl: "/images/products/fut.png", rangeId: rExtraFull.id, categoryId: catVL.id, shortDesc: "100% Synthèse - Ford C1", longDesc: "ACEA C1, Ford M2C 934A. Low SAPS." },
      { name: "EXTRA FULL 5W-20 – 948B", slug: "extra-full-5w20-948b", imageUrl: "/images/products/fut.png", rangeId: rExtraFull.id, categoryId: catVL.id, shortDesc: "100% Synthèse - Ecoboost", longDesc: "Spécial Ford Ecoboost. ACEA A1/B1, Ford 948B." },
      { name: "EXTRA FULL FREECAR 5W-50", slug: "extra-full-freecar-5w50", imageUrl: "/images/products/fut.png", rangeId: rExtraFull.id, categoryId: catVL.id, shortDesc: "100% Synthèse - Sport/Voiturettes", longDesc: "Grande stabilité thermique. ACEA A3/B4." },
      { name: "EXTRA FULL C3 KTX 0W-40", slug: "extra-full-c3-ktx-0w40", imageUrl: "/images/products/fut.png", rangeId: rExtraFull.id, categoryId: catVL.id, shortDesc: "100% Synthèse - Climats Extrêmes", longDesc: "ACEA C3, Porsche A40, MB 229.52." },
      { name: "EXTRA FULL C3 OEM 547 5W-30", slug: "extra-full-c3-oem-547", imageUrl: "/images/products/fut.png", rangeId: rExtraFull.id, categoryId: catVL.id, shortDesc: "100% Synthèse - VAG Premium", longDesc: "PAO + Grp III. VW 504/507." },
      { name: "EXTRA FULL DRACO 0W-40", slug: "extra-full-draco-0w40", imageUrl: "/images/products/fut.png", rangeId: rExtraFull.id, categoryId: catVL.id, shortDesc: "100% Synthèse - Puissance", longDesc: "ACEA A3/B4, Porsche A40, MB 229.5." },
      { name: "EXTRA FULL C2/C3 547 5W-30", slug: "extra-full-c2-c3-547", imageUrl: "/images/products/fut.png", rangeId: rExtraFull.id, categoryId: catVL.id, shortDesc: "100% Synthèse - Polyvalente", longDesc: "ACEA C2/C3, VW 504/507, Dexos 2." },
      { name: "EXTRA FULL C2/C3 5W-30", slug: "extra-full-c2-c3-gen", imageUrl: "/images/products/fut.png", rangeId: rExtraFull.id, categoryId: catVL.id, shortDesc: "100% Synthèse - Universelle", longDesc: "ACEA C2/C3, PSA B71 2290, Dexos 2." },

      // ----------------------------------------------------
      // GAMME EXTRA BLITZ (VL)
      // ----------------------------------------------------
      { name: "EXTRA Blitz 10W-40 Multi", slug: "extra-blitz-10w40-multi", imageUrl: "/images/products/fut.png", rangeId: rExtraBlitz.id, categoryId: catVL.id, shortDesc: "Semi-Synthèse Multi-usages", longDesc: "Essence et Diesel. ACEA A3/B4/E7." },
      { name: "EXTRA Blitz 10W-40 A3/B4", slug: "extra-blitz-10w40-a3b4", imageUrl: "/images/products/fut.png", rangeId: rExtraBlitz.id, categoryId: catVL.id, shortDesc: "Semi-Synthèse Turbo", longDesc: "Conditions sévères. ACEA A3/B4." },
      { name: "EXTRA Blitz 10W-40 Mineral", slug: "extra-blitz-10w40-min", imageUrl: "/images/products/fut.png", rangeId: rExtraBlitz.id, categoryId: catVL.id, shortDesc: "Minérale Standard", longDesc: "Conditions modérées. ACEA A3/B3." },
      { name: "EXTRA Blitz 5W-40", slug: "extra-blitz-5w40", imageUrl: "/images/products/fut.png", rangeId: rExtraBlitz.id, categoryId: catVL.id, shortDesc: "Synthétique (Non DPF)", longDesc: "ACEA A3/B4, MB 229.5." },
      { name: "EXTRA Blitz 5W-30", slug: "extra-blitz-5w30", imageUrl: "/images/products/fut.png", rangeId: rExtraBlitz.id, categoryId: catVL.id, shortDesc: "Synthétique (Non DPF)", longDesc: "ACEA A3/B4, Renault RN0700." },
      { name: "EXTRA Blitz OEM 554 10W-30", slug: "extra-blitz-oem-10w30", imageUrl: "/images/products/fut.png", rangeId: rExtraBlitz.id, categoryId: catVL.id, shortDesc: "100% Synthèse Classique", longDesc: "Moteurs classiques 4T. Non adapté moteurs modernes." },
      { name: "EXTRA Blitz 10W-60", slug: "extra-blitz-10w60", imageUrl: "/images/products/fut.png", rangeId: rExtraBlitz.id, categoryId: catVL.id, shortDesc: "100% Synthèse Sport", longDesc: "Haute viscosité pour moteurs classiques." },

      // ----------------------------------------------------
      // GAMME SPYDER (VL Minérales)
      // ----------------------------------------------------
      { name: "SPYDER 15W-40", slug: "spyder-15w40", imageUrl: "/images/products/fut.png", rangeId: rSpyder.id, categoryId: catVL.id, shortDesc: "Minérale Multigrade", longDesc: "Longue durée de service. API SL/CF-4." },
      { name: "SPYDER 10W-30", slug: "spyder-10w30", imageUrl: "/images/products/fut.png", rangeId: rSpyder.id, categoryId: catVL.id, shortDesc: "Minérale Fluide", longDesc: "Multigrade. API SL/CF-4." },
      { name: "SPYDER 20W-50", slug: "spyder-20w50", imageUrl: "/images/products/fut.png", rangeId: rSpyder.id, categoryId: catVL.id, shortDesc: "Minérale Sévère", longDesc: "Excellente protection. API SL/CF-4." },
      { name: "SPYDER 25W-70", slug: "spyder-25w70", imageUrl: "/images/products/fut.png", rangeId: rSpyder.id, categoryId: catVL.id, shortDesc: "Minérale Très Haute Viscosité", longDesc: "Vieux moteurs. API SG/CF-4." },
      { name: "SPYDER III", slug: "spyder-iii", imageUrl: "/images/products/fut.png", rangeId: rSpyder.id, categoryId: catVL.id, shortDesc: "Minérale Monograde", longDesc: "Diesel conditions modérées. API CF." },

      // ----------------------------------------------------
      // GAMME PX (Poids Lourds)
      // ----------------------------------------------------
      { name: "PX SAPS E6 10W-40 / 5W-30", slug: "px-saps-e6", imageUrl: "/images/products/fut.png", rangeId: rPX.id, categoryId: catPL.id, shortDesc: "100% Synthèse Euro VI", longDesc: "Low SAPS pour DPF/SCR. ACEA E6/E7/E9." },
      { name: "PX E4 10W-40 / 5W-30", slug: "px-e4", imageUrl: "/images/products/fut.png", rangeId: rPX.id, categoryId: catPL.id, shortDesc: "100% Synthèse Long Drain", longDesc: "Hautes perfs, sans FAP. ACEA E4/E7." },
      { name: "PX-THPD SAPS E9 15W-40", slug: "px-thpd-e9", imageUrl: "/images/products/fut.png", rangeId: rPX.id, categoryId: catPL.id, shortDesc: "100% Synthèse E9", longDesc: "Low SAPS Euro V/VI. ACEA E9/E7." },
      { name: "PX-THPD E7 10W-40 / 15W-40", slug: "px-thpd-e7", imageUrl: "/images/products/fut.png", rangeId: rPX.id, categoryId: catPL.id, shortDesc: "HC Synthétique Euro III/IV", longDesc: "Haute perf sans DPF. ACEA E7." },
      { name: "PX-SHPD 15W-40 / 20W-50", slug: "px-shpd", imageUrl: "/images/products/fut.png", rangeId: rPX.id, categoryId: catPL.id, shortDesc: "Minérale Turbos", longDesc: "API CI-4/CH-4. Moteurs Euro II/III." },
      { name: "PX-HPD 15W-40", slug: "px-hpd", imageUrl: "/images/products/fut.png", rangeId: rPX.id, categoryId: catPL.id, shortDesc: "Minérale Lourde", longDesc: "Travaux Publics. API CG-4." },
      { name: "PX-HD MULTI 15W-40 / 20W-50", slug: "px-hd-multi", imageUrl: "/images/products/fut.png", rangeId: rPX.id, categoryId: catPL.id, shortDesc: "Minérale Polyvalente", longDesc: "Flottes mixtes. API CF-4." },
      { name: "PX SERIES 10W, 30, 40, 50", slug: "px-series", imageUrl: "/images/products/fut.png", rangeId: rPX.id, categoryId: catPL.id, shortDesc: "Monogrades Sévères", longDesc: "Moteurs très sollicités. API CF." },

      // ----------------------------------------------------
      // TRANSMISSION MANUELLE (HPX / SXN / SYN / DCE)
      // ----------------------------------------------------
      { name: "HPX WSTER LSD SAE 75W-90", slug: "hpx-wster", imageUrl: "/images/products/fut.png", rangeId: rTransMan.id, categoryId: catTrans.id, shortDesc: "100% Synthèse Ester LSD", longDesc: "Extrême pression très haut rendement pour différentiels à glissement limité. API GL-5." },
      { name: "HPX WS LSD 75W-90", slug: "hpx-ws", imageUrl: "/images/products/fut.png", rangeId: rTransMan.id, categoryId: catTrans.id, shortDesc: "Synthétique LSD", longDesc: "API GL-5." },
      { name: "HPX W SAE 80W-90", slug: "hpx-w", imageUrl: "/images/products/fut.png", rangeId: rTransMan.id, categoryId: catTrans.id, shortDesc: "Minéral LSD", longDesc: "API GL-5." },
      { name: "SXN STO 75W-140", slug: "sxn-sto", imageUrl: "/images/products/fut.png", rangeId: rTransMan.id, categoryId: catTrans.id, shortDesc: "100% Synthèse Charge Extrême", longDesc: "Scania STO 1:0." },
      { name: "SXN 235.11 SAE 75W-90", slug: "sxn-235-11", imageUrl: "/images/products/fut.png", rangeId: rTransMan.id, categoryId: catTrans.id, shortDesc: "100% Synthèse MB 235.11", longDesc: "API GL-4." },
      { name: "SXN-MWS SAE 75W-80", slug: "sxn-mws", imageUrl: "/images/products/fut.png", rangeId: rTransMan.id, categoryId: catTrans.id, shortDesc: "100% Synthèse Multifonctions", longDesc: "API GL-4, Hyundai, Toyota." },
      { name: "SXN SAE 75W-80", slug: "sxn-7580", imageUrl: "/images/products/fut.png", rangeId: rTransMan.id, categoryId: catTrans.id, shortDesc: "100% Synthèse GL-5", longDesc: "API GL-5 MT-1." },
      { name: "SXN SAE 75W-90", slug: "sxn-7590", imageUrl: "/images/products/fut.png", rangeId: rTransMan.id, categoryId: catTrans.id, shortDesc: "100% Synthèse Boîtes", longDesc: "Pour transmissions et différentiels forte charge. API GL-4/5." },
      { name: "SYN SAE 75W-80", slug: "syn-sae", imageUrl: "/images/products/fut.png", rangeId: rTransMan.id, categoryId: catTrans.id, shortDesc: "Synthétique Eco Carburant", longDesc: "API GL-4/5." },
      { name: "SYN SAE 75W-80 INTEX", slug: "syn-intex", imageUrl: "/images/products/fut.png", rangeId: rTransMan.id, categoryId: catTrans.id, shortDesc: "Synthétique ZF Intarder", longDesc: "Avec Retarder intégré. API GL-4." },
      { name: "SYN G4 SAE 75W-80", slug: "syn-g4", imageUrl: "/images/products/fut.png", rangeId: rTransMan.id, categoryId: catTrans.id, shortDesc: "Synthétique GL-4", longDesc: "Multifonctions. API GL-4." },
      { name: "DCE – W 85W-140", slug: "dce-85140", imageUrl: "/images/products/fut.png", rangeId: rTransMan.id, categoryId: catTrans.id, shortDesc: "Minéral Charges Fortes", longDesc: "API GL-5." },
      { name: "DCE – W 80W-85", slug: "dce-8085", imageUrl: "/images/products/fut.png", rangeId: rTransMan.id, categoryId: catTrans.id, shortDesc: "Minéral Multifonctionnel", longDesc: "API GL-4." },
      { name: "DCE – W 80W-90", slug: "dce-8090", imageUrl: "/images/products/fut.png", rangeId: rTransMan.id, categoryId: catTrans.id, shortDesc: "Minéral Multifonctions", longDesc: "API GL-5." },
      { name: "DCE – W 75W-80", slug: "dce-multi", imageUrl: "/images/products/fut.png", rangeId: rTransMan.id, categoryId: catTrans.id, shortDesc: "Minéral Multifonctions", longDesc: "API GL-4/5." },
      { name: "DCE – W 90 / 140 / 250", slug: "dce-monogrades", imageUrl: "/images/products/fut.png", rangeId: rTransMan.id, categoryId: catTrans.id, shortDesc: "Minéral Monogrades", longDesc: "API GL-4/5." },
      { name: "TRACTO STOU 10W-30 / 10W-40 / 15W-40", slug: "tracto-stou", imageUrl: "/images/products/fut.png", rangeId: rTransMan.id, categoryId: catTrans.id, shortDesc: "Multifonctionnel Agricole", longDesc: "Moteurs, boîtes, freins immergés." },
      { name: "TRACTO UTTO 10W-30", slug: "tracto-utto", imageUrl: "/images/products/fut.png", rangeId: rTransMan.id, categoryId: catTrans.id, shortDesc: "Transmissions Tracteurs", longDesc: "Boîtes, relevages, freins humides." },

      // ----------------------------------------------------
      // TRANSMISSION AUTOMATIQUE (ATF)
      // ----------------------------------------------------
      { name: "ATF GLOBAL MULTI", slug: "atf-global", imageUrl: "/images/products/fut.png", rangeId: rTransAuto.id, categoryId: catTrans.id, shortDesc: "Universel 100% Synthétique", longDesc: "Fluide multi-usages pour transmissions modernes. Audi, BMW, Allison, Dexron III, Mercon V." },
      { name: "ATF DRAIVER CVT", slug: "atf-cvt", imageUrl: "/images/products/fut.png", rangeId: rTransAuto.id, categoryId: catTrans.id, shortDesc: "CVT", longDesc: "Pour boîtes à variation continue." },
      { name: "ATF DCT-DSG", slug: "atf-dsg", imageUrl: "/images/products/fut.png", rangeId: rTransAuto.id, categoryId: catTrans.id, shortDesc: "DSG / DCT", longDesc: "Double embrayage." },
      { name: "ATF M 134A", slug: "atf-m134a", imageUrl: "/images/products/fut.png", rangeId: rTransAuto.id, categoryId: catTrans.id, shortDesc: "PAO MB NAG-2", longDesc: "Pour MB 236.14." },
      { name: "ATF DRAIVER DEXRON VI", slug: "atf-dexron-vi", imageUrl: "/images/products/fut.png", rangeId: rTransAuto.id, categoryId: catTrans.id, shortDesc: "100% Synthétique – DEXRON VI", longDesc: "Technologie GM DEXRON VI, remplace III et II. Pour BVA modernes." },
      { name: "ATF DRAIVER DEXRON III-H", slug: "atf-dexron-iii", imageUrl: "/images/products/fut.png", rangeId: rTransAuto.id, categoryId: catTrans.id, shortDesc: "Synthétique Dexron III", longDesc: "GM Dexron III-H." },
      { name: "ATF DRAIVER DEXRON II-D", slug: "atf-dexron-ii", imageUrl: "/images/products/fut.png", rangeId: rTransAuto.id, categoryId: catTrans.id, shortDesc: "Minéral Dexron II", longDesc: "GM Dexron II-D." },
      { name: "ATF TYPE A SUFFIX A", slug: "atf-type-a", imageUrl: "/images/products/fut.png", rangeId: rTransAuto.id, categoryId: catTrans.id, shortDesc: "Minéral Historique", longDesc: "GM TASA." },
      { name: "ATF SERVO 3", slug: "atf-servo", imageUrl: "/images/products/fut.png", rangeId: rTransAuto.id, categoryId: catTrans.id, shortDesc: "Servo-Direction", longDesc: "100% Synthétique pour DA." },
      { name: "POWER CHF 11", slug: "power-chf", imageUrl: "/images/products/fut.png", rangeId: rTransAuto.id, categoryId: catTrans.id, shortDesc: "Hydraulique Central", longDesc: "PAO. Centrales hydrauliques, DA, amortisseurs." },

      // ----------------------------------------------------
      // ADDITIFS & MAINTENANCE
      // ----------------------------------------------------
      { name: "EXTRA DETOX FULL MULTI PERFORMANCE", slug: "extra-detox-6in1", imageUrl: "/images/products/fut.png", rangeId: rAdditifs.id, categoryId: catAdditifs.id, shortDesc: "Additif complet 6 en 1 - 1L", longDesc: "Traitement complet nettoyage moteur." },
      { name: "MULTI INJECTION FULL CLEANING", slug: "multi-injection", imageUrl: "/images/products/fut.png", rangeId: rAdditifs.id, categoryId: catAdditifs.id, shortDesc: "Nettoyant Injection - 300ml", longDesc: "Nettoyage système injection." },
      { name: "FOR DIESEL ANTIGEL", slug: "for-diesel-antigel", imageUrl: "/images/products/fut.png", rangeId: rAdditifs.id, categoryId: catAdditifs.id, shortDesc: "Antigel - Anti-fumées Diesel", longDesc: "Protection froid et fumées." },
      { name: "FOR DIESEL", slug: "for-diesel", imageUrl: "/images/products/fut.png", rangeId: rAdditifs.id, categoryId: catAdditifs.id, shortDesc: "Anti-fumées Diesel", longDesc: "Réduction des émissions." },
      { name: "FOR DIESEL BAC", slug: "for-diesel-bac", imageUrl: "/images/products/fut.png", rangeId: rAdditifs.id, categoryId: catAdditifs.id, shortDesc: "Fongicide & Bactéricide", longDesc: "Traitement antibactérien diesel." },
      { name: "FOR OIL", slug: "for-oil", imageUrl: "/images/products/fut.png", rangeId: rAdditifs.id, categoryId: catAdditifs.id, shortDesc: "Additif Moteur Essence", longDesc: "Traitement synthétique essence." },
      { name: "FOR FUEL OIL", slug: "for-fuel-oil", imageUrl: "/images/products/fut.png", rangeId: rAdditifs.id, categoryId: catAdditifs.id, shortDesc: "Additif Diesel", longDesc: "Améliorant combustion." },
      { name: "DOT 4", slug: "dot-4", imageUrl: "/images/products/fut.png", rangeId: rAdditifs.id, categoryId: catAdditifs.id, shortDesc: "Liquide de freins", longDesc: "Haute performance freinage." },
      { name: "DOT 5.1", slug: "dot-51", imageUrl: "/images/products/fut.png", rangeId: rAdditifs.id, categoryId: catAdditifs.id, shortDesc: "Liquide de freins", longDesc: "Compétition et haute température." },
      { name: "L.H.M", slug: "lhm", imageUrl: "/images/products/fut.png", rangeId: rAdditifs.id, categoryId: catAdditifs.id, shortDesc: "Fluide Suspensions", longDesc: "Spécial Citroën et hydraulique." },
      { name: "AFLOSH – DOBEL", slug: "aflosh-dobel", imageUrl: "/images/products/fut.png", rangeId: rAdditifs.id, categoryId: catAdditifs.id, shortDesc: "Antioxydant Multi-usages", longDesc: "Protection." },

      // ----------------------------------------------------
      // GRAISSES
      // ----------------------------------------------------
      { name: "GR-LITH 2 / 3", slug: "gr-lith", imageUrl: "/images/products/fut.png", rangeId: rGraisse.id, categoryId: catGraisses.id, shortDesc: "Graisse Lithium Multi-usages", longDesc: "Roulements et paliers." },
      { name: "GR-MOLY 2", slug: "gr-moly", imageUrl: "/images/products/fut.png", rangeId: rGraisse.id, categoryId: catGraisses.id, shortDesc: "Graisse Lithium + Bisulfure", longDesc: "Extrême pression et chocs." },
      { name: "GR-COMPLEX 2", slug: "gr-complex", imageUrl: "/images/products/fut.png", rangeId: rGraisse.id, categoryId: catGraisses.id, shortDesc: "Graisse Complexe Lithium", longDesc: "Haute température." },
      { name: "GR-CALC 2", slug: "gr-calc", imageUrl: "/images/products/fut.png", rangeId: rGraisse.id, categoryId: catGraisses.id, shortDesc: "Graisse Calcium", longDesc: "Forte résistance à l'eau." },
      { name: "GR-ALU 2", slug: "gr-alu", imageUrl: "/images/products/fut.png", rangeId: rGraisse.id, categoryId: catGraisses.id, shortDesc: "Graisse Complexe Aluminium", longDesc: "Températures extrêmes." },
      { name: "GR-POLY 2", slug: "gr-poly", imageUrl: "/images/products/fut.png", rangeId: rGraisse.id, categoryId: catGraisses.id, shortDesc: "Graisse Polyurée", longDesc: "Roulements électriques et hautes vitesses." },
      { name: "GR-FOOD 2", slug: "gr-food", imageUrl: "/images/products/fut.png", rangeId: rGraisse.id, categoryId: catGraisses.id, shortDesc: "Graisse Alimentaire", longDesc: "Contact fortuit (NSF H1)." },

      // ----------------------------------------------------
      // MOTO
      // ----------------------------------------------------
      { name: "MT-MX 2T", slug: "mt-mx-2t", imageUrl: "/images/products/fut.png", rangeId: rMoto2T.id, categoryId: catMoto.id, shortDesc: "100% Synthèse PAO", longDesc: "JASO FD - ISO L-EGD - API TC+." },
      { name: "MT-PLUS 2T", slug: "mt-plus-2t", imageUrl: "/images/products/fut.png", rangeId: rMoto2T.id, categoryId: catMoto.id, shortDesc: "Synthétique", longDesc: "JASO FC - ISO L-EGD." },
      { name: "MT-W2T", slug: "mt-w2t", imageUrl: "/images/products/fut.png", rangeId: rMoto2T.id, categoryId: catMoto.id, shortDesc: "Minéral", longDesc: "JASO FB - API TC." },
      { name: "MT-ELITE 10W-60", slug: "mt-elite", imageUrl: "/images/products/fut.png", rangeId: rMoto4T.id, categoryId: catMoto.id, shortDesc: "100% Synthèse PAO", longDesc: "API SM - JASO MA2." },
      { name: "MT-PLUS 15W-50", slug: "mt-plus-4t", imageUrl: "/images/products/fut.png", rangeId: rMoto4T.id, categoryId: catMoto.id, shortDesc: "Synthétique", longDesc: "API SM - JASO MA2." },
      { name: "MT-STER 5W-50", slug: "mt-ster", imageUrl: "/images/products/fut.png", rangeId: rMoto4T.id, categoryId: catMoto.id, shortDesc: "100% Synthèse ESTER", longDesc: "Compétition. API SM - JASO MA2." },
      { name: "MT-B 20W-50", slug: "mt-b", imageUrl: "/images/products/fut.png", rangeId: rMoto4T.id, categoryId: catMoto.id, shortDesc: "Minéral", longDesc: "API SL - JASO MA2." },
      { name: "MT-GEAR 75W-90", slug: "mt-gear", imageUrl: "/images/products/fut.png", rangeId: rMotoGear.id, categoryId: catMoto.id, shortDesc: "100% Synthèse Boîte", longDesc: "API GL-5." },

      // ----------------------------------------------------
      // AGRICOLE
      // ----------------------------------------------------
      { name: "AGRI-STX 10W-30", slug: "agri-stx-1030", imageUrl: "/images/products/fut.png", rangeId: rAgriSTX.id, categoryId: catAgri.id, shortDesc: "STOU Synthétique", longDesc: "Universelle tracteurs (Moteur, Boîte, Relevage)." },
      { name: "AGRI-STX 15W-40", slug: "agri-stx-1540", imageUrl: "/images/products/fut.png", rangeId: rAgriSTX.id, categoryId: catAgri.id, shortDesc: "STOU Minérale", longDesc: "Multifonctionnelle parc mixte." },
      { name: "AGRI-UTX 10W-30", slug: "agri-utx", imageUrl: "/images/products/fut.png", rangeId: rAgriUTX.id, categoryId: catAgri.id, shortDesc: "UTTO", longDesc: "Transmissions et hydrauliques." },
      { name: "AGRI-HYD 46", slug: "agri-hyd", imageUrl: "/images/products/fut.png", rangeId: rAgriSTX.id, categoryId: catAgri.id, shortDesc: "Hydraulique", longDesc: "HVLP." },

      // ----------------------------------------------------
      // MARINE / NAVAL
      // ----------------------------------------------------
      { name: "MAR-OUT 2T", slug: "mar-out-2t", imageUrl: "/images/products/fut.png", rangeId: rMarine.id, categoryId: catNautique.id, shortDesc: "2T Hors-Bord", longDesc: "NMMA TC-W3." },
      { name: "MAR-IN 4T 10W-40", slug: "mar-in-4t", imageUrl: "/images/products/fut.png", rangeId: rMarine.id, categoryId: catNautique.id, shortDesc: "4T Inboard", longDesc: "NMMA FC-W." },
      { name: "NAV-TRONK 30", slug: "nav-tronk", imageUrl: "/images/products/fut.png", rangeId: rNaval.id, categoryId: catNaval.id, shortDesc: "Huile de Tronc", longDesc: "TBN 30." },
      { name: "NAV-CYL 50", slug: "nav-cyl", imageUrl: "/images/products/fut.png", rangeId: rNaval.id, categoryId: catNaval.id, shortDesc: "Huile Cylindre", longDesc: "TBN 50/70." },

      // ----------------------------------------------------
      // INDUSTRIE - Hydraulique
      // ----------------------------------------------------
      { name: "IND-HYD HLP 32/46/68", slug: "ind-hyd-hlp", imageUrl: "/images/products/fut.png", rangeId: rIndusHydro.id, categoryId: catIndus.id, shortDesc: "Hydraulique HLP", longDesc: "Systèmes industriels." },
      { name: "IND-HYD HVLP 32/46/68", slug: "ind-hyd-hvlp", imageUrl: "/images/products/fut.png", rangeId: rIndusHydro.id, categoryId: catIndus.id, shortDesc: "Hydraulique HVLP", longDesc: "Haut index de viscosité." },
      { name: "IND-HYD ZINC-FREE", slug: "ind-hyd-zincfree", imageUrl: "/images/products/fut.png", rangeId: rIndusHydro.id, categoryId: catIndus.id, shortDesc: "Hydraulique Sans Cendre", longDesc: "Environnement sensible." },
      { name: "IND-HYD BIO 46", slug: "ind-hyd-bio", imageUrl: "/images/products/fut.png", rangeId: rIndusHydro.id, categoryId: catIndus.id, shortDesc: "Hydraulique Biodégradable", longDesc: "Ecolabel." },

      // ----------------------------------------------------
      // INDUSTRIE - Compresseurs
      // ----------------------------------------------------
      { name: "IND-COMP VDL 46/68", slug: "ind-comp-vdl", imageUrl: "/images/products/fut.png", rangeId: rIndusComp.id, categoryId: catIndus.id, shortDesc: "Compresseur VDL", longDesc: "Air comprimé." },
      { name: "IND-COMP SYNTH 46", slug: "ind-comp-synth", imageUrl: "/images/products/fut.png", rangeId: rIndusComp.id, categoryId: catIndus.id, shortDesc: "Compresseur PAO", longDesc: "Longue durée." },

      // ----------------------------------------------------
      // INDUSTRIE - Engrenages (Gears)
      // ----------------------------------------------------
      { name: "IND-GEAR CLP 150/220/320", slug: "ind-gear-clp", imageUrl: "/images/products/fut.png", rangeId: rIndusGear.id, categoryId: catIndus.id, shortDesc: "Engrenages Industriels", longDesc: "Forte charge." },
      { name: "IND-GEAR SYNTH 220", slug: "ind-gear-synth", imageUrl: "/images/products/fut.png", rangeId: rIndusGear.id, categoryId: catIndus.id, shortDesc: "Engrenages PAO", longDesc: "Hautes températures." },

      // ----------------------------------------------------
      // INDUSTRIE - Métaux & Divers
      // ----------------------------------------------------
      { name: "IND-CUT SOLUBLE", slug: "ind-cut-soluble", imageUrl: "/images/products/fut.png", rangeId: rIndusMetal.id, categoryId: catIndus.id, shortDesc: "Huile de Coupe Soluble", longDesc: "Usinage métaux." },
      { name: "IND-CUT ENTIERE", slug: "ind-cut-entiere", imageUrl: "/images/products/fut.png", rangeId: rIndusMetal.id, categoryId: catIndus.id, shortDesc: "Huile de Coupe Entière", longDesc: "Usinage difficile." },
      { name: "IND-GLISS 68/220", slug: "ind-gliss", imageUrl: "/images/products/fut.png", rangeId: rIndusDivers.id, categoryId: catIndus.id, shortDesc: "Huile Glissières", longDesc: "Machines-outils." },
      { name: "IND-THERM 32", slug: "ind-therm", imageUrl: "/images/products/fut.png", rangeId: rIndusDivers.id, categoryId: catIndus.id, shortDesc: "Fluide Caloporteur", longDesc: "Transfert thermique." },

      { name: "IND-TRANS 22", slug: "ind-trans", imageUrl: "/images/products/fut.png", rangeId: rIndusDivers.id, categoryId: catIndus.id, shortDesc: "Huile Transformateur", longDesc: "Isolant électrique." },
      // --- NOUVEAUX PRODUITS VICONOL ---
      { 
        name: "VICONOL 0W-16", 
        slug: "viconol-0w16", 
        imageUrl: "/images/products/fut.png", 
        rangeId: rExtraFull.id, 
        categoryId: catVL.id, 
        shortDesc: "API: SN, JASO GLV-1, ILSAC GF-6B", 
        longDesc: "API: SN, JASO GLV-1, HIBRI PLUS, ILSAC GF-6B, NEW CON PAO, HONDA, TOYOTA, NISSAN" 
      },
      { 
        name: "VICONOL 0W-20", 
        slug: "viconol-0w20", 
        imageUrl: "/images/products/fut.png", 
        rangeId: rExtraFull.id, 
        categoryId: catVL.id, 
        shortDesc: "API: SN Plus-RC, ILSAC GF-6A", 
        longDesc: "API: SN Plus-RC, API: SP/RC, ILSAC: GF-6A, ILSAC: GF-5, BMW LL-17 FE+, BMW LL-14 FE+, Ford WSS-M2C947-A/B1, WSS-M2C952-A1, WSS-M2C962-A1, FIAT 9.55535-GSX (Fiat, alfa Romeo y Lancia), CHRYSLER MS-12145, MB 229.72, MB 229.71, Vauxhall/GM OPEL: OV0401547, GM DEXOS D, VOLVO VCC RBS0-2AE" 
      },
      { 
        name: "VICONOL 0W-30 C2", 
        slug: "viconol-0w30-c2", 
        imageUrl: "/images/products/fut.png", 
        rangeId: rExtraFull.id, 
        categoryId: catVL.id, 
        shortDesc: "ACEA C2, API: SN, FORD WSS-M2C950-A", 
        longDesc: "ACEA C2, API: SN, FORD WSS-M2C950-A, JAGUAR & LAND ROVER ST JLR.03.5007, Mazda, Toyota, Honda y Subaru" 
      },
      { 
        name: "VICONOL 0W-40 C3", 
        slug: "viconol-0w40-c3", 
        imageUrl: "/images/products/fut.png", 
        rangeId: rExtraFull.id, 
        categoryId: catVL.id, 
        shortDesc: "ACEA C3, API SN/CF, VW 502.00", 
        longDesc: "ACEA C3, API SN/CF, VW 502.00 / 505.00 / 505.01, MB 229.51, BMW Long Life-04, Porsche A40" 
      },
      { 
        name: "VICONOL 5W-20 ACEA C5", 
        slug: "viconol-5w20-acea-c5", 
        imageUrl: "/images/products/fut.png", 
        rangeId: rExtraFull.id, 
        categoryId: catVL.id, 
        shortDesc: "ACEA C5, ACEA A1/B1, API: SN", 
        longDesc: "ACEA C5, ACEA A1/B1, API: SN, FORD WSS-M2C948-B, FORD WSS-M2C925-A, FORD WSS-M2C925-B, CHRYSLER MS 6395, FIAT 9.55535-CR1, JAGUAR & LAND ROVER ST JLR.03.5004" 
      },
      { 
        name: "VICONOL 5W-30 C2/C3", 
        slug: "viconol-5w30-c2-c3", 
        imageUrl: "/images/products/fut.png", 
        rangeId: rExtraFull.id, 
        categoryId: catVL.id, 
        shortDesc: "ACEA C2/C3, VW 504/507, API SN/CF", 
        longDesc: "ACEA C2/C3, VW 504.00/507.00, API SN/CF, MB 229.31, MB 229.51, MB 229.52, GM Opel dexos 2, BMW Long Life-04, PSA B71 2290, Porsche C30, Fiat 9.55535-DS1, Fiat 9.55535-GS1" 
      },
      { 
        name: "VICONOL 5W-40 C3", 
        slug: "viconol-5w40-c3", 
        imageUrl: "/images/products/fut.png", 
        rangeId: rExtraFull.id, 
        categoryId: catVL.id, 
        shortDesc: "ACEA C3, VW 502.00/505.00/505.01", 
        longDesc: "ACEA C3, VW 502.00/505.00/505.01, API SN/CF, MB 229.52, BMW Long Life-04, CHRYSLER MS-12991, RENAULT RN0710-RN 0700, Porsche A40, FORD WSS-M2C917-A, Fiat 9.55535-GH2, 9.55535-S2, 9.55535-T2" 
      },
      { 
        name: "VICONOL 10W-30", 
        slug: "viconol-10w30", 
        imageUrl: "/images/products/fut.png", 
        rangeId: rExtraBlitz.id, 
        categoryId: catVL.id, 
        shortDesc: "ACEA A3/B3/B4, API SN/CF", 
        longDesc: "ACEA A3/B3/B4, API SN/CF, MB 229.1, VW 501.01/505.00" 
      },
      { 
        name: "VICONOL 10W-40", 
        slug: "viconol-10w40", 
        imageUrl: "/images/products/fut.png", 
        rangeId: rExtraBlitz.id, 
        categoryId: catVL.id, 
        shortDesc: "ACEA A3/B3/B4, API SN/CF", 
        longDesc: "ACEA A3/B3/B4, API SN/CF, MB 229.1, VW 501.01/505.00" 
      },
      { 
        name: "VICONOL 15W-40 A3/B4", 
        slug: "viconol-15w40-a3b4", 
        imageUrl: "/images/products/fut.png", 
        rangeId: rSpyder.id, 
        categoryId: catVL.id, 
        shortDesc: "ACEA A3/B4, MB 229.1, API SL/CF", 
        longDesc: "ACEA A3/B4, MB 229.1, API SL/CF, VW 501.01/505.00" 
      },
      { 
        name: "VICONOL 20W-50 A3/B4", 
        slug: "viconol-20w50-a3b4", 
        imageUrl: "/images/products/fut.png", 
        rangeId: rSpyder.id, 
        categoryId: catVL.id, 
        shortDesc: "ACEA A3/B4, MB 229.1, API SL/CF", 
        longDesc: "ACEA A3/B4, MB 229.1, API SL/CF, VW 501.01/505.00" 
      },
      { 
        name: "VICONOL HD40", 
        slug: "viconol-hd40", 
        imageUrl: "/images/products/fut.png", 
        rangeId: rPX.id, 
        categoryId: catPL.id, 
        shortDesc: "API: CF/SF, MB 228.0, MAN 270", 
        longDesc: "API: CF/SF, MB 228.0, MAN 270, MTU Type 1, CAT TO-2, ALLISON C-3" 
      },
      { 
        name: "VICONOL HD50", 
        slug: "viconol-hd50", 
        imageUrl: "/images/products/fut.png", 
        rangeId: rPX.id, 
        categoryId: catPL.id, 
        shortDesc: "API: CF/SF, MB 228.0, MAN 270", 
        longDesc: "API: CF/SF, MB 228.0, MAN 270, MTU Type 1, CAT TO-2, ALLISON C-3" 
      },
      { 
        name: "VICONOL HD60", 
        slug: "viconol-hd60", 
        imageUrl: "/images/products/fut.png", 
        rangeId: rPX.id, 
        categoryId: catPL.id, 
        shortDesc: "API: CF/SF, MB 228.0, MAN 270", 
        longDesc: "API: CF/SF, MB 228.0, MAN 270, MTU Type 1, CAT TO-2, ALLISON C-3" 
      }
    ];


    console.log(`📦 Insertion de ${produits.length} produits...`);
    
    // =========================================================================
    // LA BOUCLE MAGIQUE 
    // =========================================================================
    for (const prod of produits) {
      // 1. On vérifie si c'est un Véhicule Léger
      const isVL = prod.categoryId === catVL.id;
      
      // 2. On calcule la bonne image dynamique
      const dynamicImageUrl = getImageUrl(prod.name, isVL);

      const data = {
        name: prod.name,
        slug: prod.slug,
        shortDesc: { 
          fr: prod.shortDesc, 
          en: prod.shortDesc,
          de: translateToGerman(prod.shortDesc)
        }, 
        longDesc: { 
          fr: prod.longDesc, 
          en: prod.longDesc, 
          de: translateToGerman(prod.longDesc)
        },
        imageUrl: dynamicImageUrl,
        categoryId: prod.categoryId,
        rangeId: prod.rangeId,
        isFeatured: true
      };

      await prisma.product.create({ data });
      process.stdout.write('.');
    }

    console.log('\n🏁 TOUT EST FINI ! Base de données prête avec les bonnes images.');
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