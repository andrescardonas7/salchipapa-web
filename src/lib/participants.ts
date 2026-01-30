export interface ParticipantBusiness {
  slug: string;
  imageUrl: string | null;
}

const PARTICIPANT_LOGO_FILE_BY_SLUG: Record<string, string> = {
  // NOTE: En deploy Linux los nombres son case-sensitive.
  // Estos mapeos aseguran que el slug apunte a un archivo real en /public/participants.
  'el-cerdito': 'El-cerdito.svg',
  chanfle: 'Chanfle.svg',
  'el-sombrero': 'El-sombrero.svg',
  'el-picotazo': 'El-picotazo.svg',
  'desmecha-2': 'Desmecha-2.svg',
  'burger-shake': 'Burguer-shake.svg',
  'salchipapa-san-jeronimo': 'Salchipapas-San-Jeronimo.svg',
  salchicriolla: 'Salchicriolla.svg',
  saemi: 'Saemi-food.svg',
  'la-carreta-picnic': 'La-carreta.svg',
  doriexplosion: 'Doriexplosion.png',
  qarepa: 'Q-arepa.svg',
  'sr-pig': 'Sr-pig.svg',
  jyc: 'j-c.svg',
  'sazon-urbano': 'Sazon-urbano.svg',
  'roasted-asados': 'Roasted-Asados.svg',
  salchipaisas: 'Salchipaisas.svg',
  centella: 'centella.png',
};

export function getParticipantLogoUrl(business: ParticipantBusiness): string {
  if (
    typeof business.imageUrl === 'string' &&
    business.imageUrl.trim().length > 0
  ) {
    return business.imageUrl;
  }

  const mapped = PARTICIPANT_LOGO_FILE_BY_SLUG[business.slug];
  if (typeof mapped === 'string' && mapped.length > 0) {
    return `/participants/${mapped}`;
  }

  return `/participants/${business.slug}.svg`;
}
