/**
 * Prisma 7 Configuration
 *
 * This file configures the database connection for Prisma migrations.
 * In Prisma 7, the datasource URL is moved out of schema.prisma.
 */

import { defineConfig } from 'prisma'

export default defineConfig({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL,
    },
  },
})
