import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

import { PrismaClient } from '../src/generated/prisma';

function createSeedClient(): { prisma: PrismaClient; pool: Pool } {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  return { prisma, pool };
}

const { prisma, pool } = createSeedClient();

// Lista de negocios participantes
const businesses = [
  { name: 'El Cerdito', slug: 'el-cerdito' },
  { name: 'Chanfle', slug: 'chanfle' },
  { name: 'El Sombrero', slug: 'el-sombrero' },
  { name: 'El Picotazo', slug: 'el-picotazo' },
  { name: 'Desmecha-2', slug: 'desmecha-2' },
  { name: 'Burger Shake', slug: 'burger-shake' },
  { name: 'Salchipapa San Jeronimo', slug: 'salchipapa-san-jeronimo' },
  { name: 'Salchicriolla', slug: 'salchicriolla' },
  { name: 'SAEMI', slug: 'saemi' },
  { name: 'La Carreta Picnic', slug: 'la-carreta-picnic' },
  { name: 'Doriexplosion', slug: 'doriexplosion' },
  { name: 'Qarepa', slug: 'qarepa' },
  { name: 'Sr Pig', slug: 'sr-pig' },
  { name: 'J&C', slug: 'jyc' },
  { name: 'Sazon Urbano', slug: 'sazon-urbano' },
  { name: 'Roasted Asados', slug: 'roasted-asados' },
  { name: 'Salchipaisas', slug: 'salchipaisas' },
  { name: 'Centella', slug: 'centella' },
];

async function main() {
  console.log('🍟 Seeding database...');

  // Crear negocios
  for (const business of businesses) {
    const existing = await prisma.business.findUnique({
      where: { slug: business.slug },
    });

    if (!existing) {
      await prisma.business.create({
        data: business,
      });
      console.log(`  ✓ Created business: ${business.name}`);
    } else {
      console.log(`  - Business already exists: ${business.name}`);
    }
  }

  // Crear configuración inicial
  const resultsPublished = await prisma.systemConfig.findUnique({
    where: { key: 'results_published' },
  });

  if (!resultsPublished) {
    await prisma.systemConfig.create({
      data: {
        key: 'results_published',
        value: 'false',
      },
    });
    console.log('  ✓ Created system config: results_published = false');
  }

  console.log('✅ Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
