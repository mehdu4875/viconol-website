import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fonction de filtrage STRICTE pour les images
function getImageUrl(productName: string, categoryId: string): string {
  const name = productName.toUpperCase();

  // 1. RÈGLE PRIORITAIRE : Si ce n'est pas un Véhicule Léger (VL), c'est un FÛT
  // (Sauf pour les spécialités/additifs/graisses qui gardent l'image neutre par défaut)
  if (categoryId !== 'VL') {
    if (categoryId === 'GR' || categoryId === 'SP') {
      return '/images/products/neutre.png'; // Bidon blanc pour additifs/graisses
    }
    return '/images/products/fut.png'; // Fût pour PL, AG, TR, AT, HY, GE, IN...
  }

  // 2. Si c'est un VL, on cherche l'image correspondante
  // RÈGLE : On vérifie les nombres à 2 chiffres (10, 15, 20) AVANT les nombres à 1 chiffre (0, 5)
  if (name.includes('10W-30') || name.includes('10W30')) return '/images/products/10W30.png';
  if (name.includes('10W-40') || name.includes('10W40')) return '/images/products/10W40.png';
  if (name.includes('15W-40') || name.includes('15W40')) return '/images/products/15W-40.png';
  if (name.includes('20W-50') || name.includes('20W50')) return '/images/products/20W-50.png';

  if (name.includes('0W-16') || name.includes('0W16')) return '/images/products/0W-16.png';
  if (name.includes('0W-20') || name.includes('0W20')) return '/images/products/0W-20.png';
  if (name.includes('0W-30') || name.includes('0W30')) return '/images/products/0W-30.png';
  if (name.includes('0W-40') || name.includes('0W40')) return '/images/products/0W-40.png';

  if (name.includes('5W-20') || name.includes('5W20')) return '/images/products/5W-20.png';
  if (name.includes('5W-30') || name.includes('5W30')) return '/images/products/5W30.png';
  if (name.includes('5W-40') || name.includes('5W40')) return '/images/products/5W-40.png';

  // Par défaut pour VL si non trouvé
  return '/images/products/neutre.png';
}

async function main() {
  console.log('🚀 Démarrage de la mise à jour (Règle VL = Bouteille / Reste = Fût)...');

  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  const categories = [
    { id: 'VL', slug: 'vehicules-legers', name: { fr: 'Véhicules Légers', de: 'Leichtfahrzeuge' } },
    { id: 'PL', slug: 'poids-lourds', name: { fr: 'Poids Lourds', de: 'Nutzkraftwagen' } },
    { id: 'AG', slug: 'agricole', name: { fr: 'Agricole', de: 'Landwirtschaft' } },
    { id: 'TR', slug: 'transmissions', name: { fr: 'Transmissions', de: 'Getriebe' } },
    { id: 'AT', slug: 'boites-auto', name: { fr: 'Boîtes Auto', de: 'Automatikgetriebe' } },
    { id: 'MO', slug: 'moto', name: { fr: 'Moto', de: 'Motorrad' } },
    { id: 'NA', slug: 'nautisme', name: { fr: 'Nautisme', de: 'Schifffahrt' } },
    { id: 'GR', slug: 'graisses', name: { fr: 'Graisses', de: 'Schmierfette' } },
    { id: 'HY', slug: 'hydraulique', name: { fr: 'Hydraulique', de: 'Hydraulik' } },
    { id: 'GE', slug: 'engrenages-indus', name: { fr: 'Engrenages Indus.', de: 'Industriegetriebe' } },
    { id: 'IN', slug: 'industrie', name: { fr: 'Industrie', de: 'Industrie' } },
    { id: 'SP', slug: 'specialites', name: { fr: 'Spécialités', de: 'Spezialitäten' } }
  ];

  for (const cat of categories) {
    await prisma.category.create({ data: cat });
  }

  const products = [
    // --- VÉHICULES LÉGERS (Bouteilles) ---
    { name: 'VICONOL 0W16', categoryId: 'VL', desc: 'API: SN JASO GLV-1 HIBRI PLUS ILSAC GF-6B NEW CON PAO HONDA TOYOTA NISSAN' },
    { name: 'VICONOL 0W20', categoryId: 'VL', desc: 'API: SN Plus-RC API: SP/RC ILSAC: GF-6A ILSAC: GF-5 BMW LL-17 FE+ BMW LL-14 FE+ Ford WSS-M2C947-A, WSS-M2C947-B1, WSS-M2C952-A1, WSS-M2C962-A1 FIAT 9.55535-GSX (Fiat, alfa Romeo y Lancia) CHRYSLER MS-12145 MB 229.72 MB 229.71 Vauxhall/GM OPEL: OV0401547 GM DEXOS D VOLVO VCC RBS0-2AE' },
    { name: 'VICONOL 0W30 C2', categoryId: 'VL', desc: 'ACEA C2 API:SN FORD WSS-M2C950-A JAGUAR & LAND ROVERST JLR.03.5007 Mazda, Toyota, Honda y Subaru' },
    { name: 'VICONOL 0W40 C3', categoryId: 'VL', desc: 'ACEA C3, API SN/CF VW 502.00 / 505.00 / 505.01, MB 229.51 BMW Long Life-04, Porsche A40' },
    { name: 'VICONOL 5W20 ACEA C5', categoryId: 'VL', desc: 'ACEA C5 ACEA A1/B1 API: SN FORD WSS-M2C948-B FORD WSS-M2C925-A FORD WSS-M2C925-B CHRYSLER MS 6395 FIAT 9.55535-CR1 JAGUAR & LAND ROVERST JLR.03.5004' },
    { name: 'VICONOL 5W30 C2/C3 547 STELL-FPW03', categoryId: 'VL', desc: 'LOW SAPS ACEA C3 ACEA C2 Stellantis FPW 9.55535/03 API SP BMW Long Life-04 BMW Long Life-19 FE Chrysler MS-1106 MB 229.31 MB 229.51 MB 229.52 GM Opel dexos 2 PSA B71 2290 Porsche C30 Opel/Vauxhall OV0401547-D30 Opel/Vauxhall OV0401547-G30 VAG VW 501.01, VW 502.00, VW 503.00, VW 503.01, VW 504.00, VW 505.00, VW 505.01, VW 506.00, VW 506.01, VW 507.00' },
    { name: 'VICONOL 5W30 C2/C3 547', categoryId: 'VL', desc: 'ACEA C2/C3 VW 504.00/507.00 API SN/CF MB 229.31 MB 229.51 MB 229.52 GM Opel dexos 2 BMW Long Life-04 PSA B71 2290 Porsche C30 Fiat 9.55535-DS1, Fiat 9.55535-GS1' },
    { name: 'VICONOL 5W30 C3 504/7', categoryId: 'VL', desc: 'ACEA C3 VW 504.00/507.00 API SN/CF MB 229.31 MB 229.51 MB 229.52 GM Opel dexos 2 BMW Long Life-04 Fiat 9.55535-DS1, Fiat 9.55535-GS1 Porsche C30' },
    { name: 'VICONOL 5W30 OPSA C2/C3', categoryId: 'VL', desc: 'ACEA C2 ACEA C3 GM Opel dexos 2 PSA B71 2290 BMW Long Life-04 API SN/CF MB 229.52 Fiat 9.55535-S1, Fiat 9.55535-S2 VW 502.00/505.00/505.01' },
    { name: 'VICONOL 5W30 OPL C3 Dex2', categoryId: 'VL', desc: 'ACEA C3 GM Opel dexos 2 API SN/CF MB 229.31 MB 229.51 MB 229.52 BMW Long Life-04 VW 502.00/505.00/505.01' },
    { name: 'VICONOL 5W40 C3', categoryId: 'VL', desc: 'ACEA C3 VW 502.00/505.00/505.01 API SN/CF MB 229.52 BMW Long Life-04 CHRYSLER MS-12991 RENAULT RN0710-RN 0700 Porsche A40 FORD WSS-M2C917-A Fiat 9.55535-GH2, 9.55535-S2, 9.55535-T2' },
    { name: 'VICONOL 10W30', categoryId: 'VL', desc: 'ACEA A3/B3/B4 API SN/CF MB 229.1 VW 501.01/505.00' },
    { name: 'VICONOL 10W40', categoryId: 'VL', desc: 'ACEA A3/B3/B4 API SN/CF MB 229.1 VW 501.01/505.00' },
    { name: 'VICONOL 15W40 A3/B4', categoryId: 'VL', desc: 'ACEA A3/B4 MB 229.1 API SL/CF VW 501.01/505.00' },
    { name: 'VICONOL 20W50 A3/B4', categoryId: 'VL', desc: 'ACEA A3/B4 MB 229.1 API SL/CF VW 501.01/505.00' },

    // --- POIDS LOURDS (Fûts forcés) ---
    { name: 'VICONOL HD 40', categoryId: 'PL', desc: 'API: CF/SF MB 228.0 MAN 270 MTU Type 1 CAT TO-2 ALLISON C-3' },
    { name: 'VICONOL HD 50', categoryId: 'PL', desc: 'API: CF/SF MB 228.0 MAN 270 MTU Type 1 CAT TO-2 ALLISON C-3' },
    { name: 'VICONOL HD 60', categoryId: 'PL', desc: 'API: CF/SF MB 228.0 MAN 270 MTU Type 1 CAT TO-2 ALLISON C-3' },
    { name: 'VICONOL 15W40 Truck E7', categoryId: 'PL', desc: 'ACEA E7 API CI-4. MB 228.3, MAN 3275-1, VOLVO VDS-3' },
    { name: 'VICONOL 10W40 Truck E11', categoryId: 'PL', desc: 'ACEA E11 API CK-4. RENAULT VLD-3, VOLVO VDS-4.5' },

    // --- AGRICOLE (Fûts) ---
    { name: 'VICONOL 15W40 STOU COMPLEX', categoryId: 'AG', desc: 'API:CF-4/CG-4/SF ACEA E7 John Deere J27/J20C' },
    { name: 'VICONOL 10W30 UTTO PLUS', categoryId: 'AG', desc: 'JOHN DEERE JDM J20C API: GL 4 Caterpillar TO-2' },
    { name: 'VICONOL 10W30 UTTO SINTETICO', categoryId: 'AG', desc: 'CVT Valtra G2-08 CNH MAT 3540' },

    // --- TRANSMISSIONS (Fûts) ---
    { name: 'VICONOL SAE 75W140 LSD PLUS', categoryId: 'TR', desc: 'Limited Slip TRANSMISIONES AUTOBLOCANTES API GL-5' },
    { name: 'VICONOL FULL SINTEX HC 75W90', categoryId: 'TR', desc: 'API: GL-5 API: GL-4 MB 235.8' },
    { name: 'VICONOL 80W140 G4', categoryId: 'TR', desc: 'API GL-4 MS 1317 NH600/TR' },

    // --- BOITES AUTO (Fûts) ---
    { name: 'VICONOL ATF UNIGLOBAL', categoryId: 'AT', desc: 'DEXRON III H JASO M315-2004' },
    { name: 'VICONOL ATF DCT-DSG', categoryId: 'AT', desc: 'VW TL 052 182 / TL 052 529' },
    { name: 'VICONOL ATF DX/VI', categoryId: 'AT', desc: 'GM DEXRON VI FORD MERCON LV' },

    // --- MOTO (Fûts ou bidon neutre) ---
    { name: 'VICONOL 10W60 MOTOSINT', categoryId: 'MO', desc: 'API SN JASO T 903:2011 MA2' },
    { name: 'VICONOL MOTOSINT 2T', categoryId: 'MO', desc: 'API TC JASO M345 FD' },
    { name: 'VICONOL SAE 5W HORQUIM', categoryId: 'MO', desc: 'Huile pour fourches de moto' },

    // --- NAUTISME (Fûts) ---
    { name: 'VICONOL MARSINT 10W30', categoryId: 'NA', desc: 'NMMA FC - W FC-729793Y' },
    { name: 'VICONOL MARSINT 2T W3', categoryId: 'NA', desc: 'NMMA TC-W3' },
    { name: 'VICONOL MARMIN 15W40', categoryId: 'NA', desc: 'API CI-4 / CH-4 / SL 150 TBN' },

    // --- GRAISSES (Bidon Neutre) ---
    { name: 'VICONOL GRATECH COMPLEX', categoryId: 'GR', desc: 'GRASA COMPLEJA DE LITIO E.P. BLEUE' },
    { name: 'VICONOL CUGRAS COBRE', categoryId: 'GR', desc: 'GRASA DE COBRE ALTAS TEMPERATURAS' },
    { name: 'VICONOL GRASA MEDICINAL', categoryId: 'GR', desc: 'ATOXICA NSF DIN 51825' },

    // --- HYDRAULIQUE (Fûts) ---
    { name: 'RUNOL ISO 46 HIDRO', categoryId: 'HY', desc: 'DIN 51524 Parte 1 HL ISO 6743/4 HL' },
    { name: 'RUNOL ISO 68 HIDRA', categoryId: 'HY', desc: 'PARKER DENINSON HF-0 DIN 51524 Parte 2' },
    { name: 'RUNOL ISO 32 SELECTO', categoryId: 'HY', desc: 'HIDRAULICO SINTETICO MICROFILTRADO' },

    // --- INDUSTRIE (Fûts) ---
    { name: 'RUNOL ISO 46 KOMPRESSOR', categoryId: 'IN', desc: 'ACEITE PARA COMPRESORES 100% SINTETICO' },
    { name: 'RUNOL ISO 68 GUILAPA', categoryId: 'IN', desc: 'ACEITE DE GUIAS HORIZONTALES ISO 6743/4-HG' },
    { name: 'RUNOL CUTTING MIX TSM214', categoryId: 'IN', desc: 'FLUIDO DE CORTE EMULSIONABLE E.P.' }
  ];

  for (const p of products) {
    const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 5);
    
    await prisma.product.create({
      data: {
        name: p.name,
        slug: slug,
        categoryId: p.categoryId,
        shortDesc: { fr: p.desc, de: p.desc },
        longDesc: { fr: p.desc, de: p.desc },
        imageUrl: getImageUrl(p.name, p.categoryId), // Passage de la catégorie pour forcer le fût
        isFeatured: true
      }
    });
  }

  console.log('✅ Base de données prête ! VL = Bouteilles / Reste = Fûts.');
}

main().catch(e => console.error(e)).finally(async () => await prisma.$disconnect());