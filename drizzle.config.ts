import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export default {
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    // FIX: Rename 'connectionString' to 'url'
    url: process.env.POSTGRES_URL!,
  },
} satisfies Config;