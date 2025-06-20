import knex from 'knex';
import { Model } from 'objection';
import { config } from '.';
import { logger } from '../utils/logger';

export const db = knex({
  client: 'pg',
  connection: {
    host: config.database.host,
    port: config.database.port,
    database: config.database.name,
    user: config.database.user,
    password: config.database.password
  },
  pool: {
    min: config.database.pool.min,
    max: config.database.pool.max
  },
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: './seeds'
  }
});

export async function initializeDatabase() {
  try {
    // Bind Objection.js to knex instance
    Model.knex(db);
    
    // Test connection
    await db.raw('SELECT 1');
    
    // Run migrations
    const [pending, completed] = await Promise.all([
      db.migrate.list(),
      db.migrate.currentVersion()
    ]);
    
    if (pending[1].length > 0) {
      logger.info(`Running ${pending[1].length} pending migrations...`);
      await db.migrate.latest();
      logger.info('Migrations completed');
    } else {
      logger.info('Database is up to date');
    }
  } catch (error) {
    logger.error('Database initialization failed:', error);
    throw error;
  }
}

export async function closeDatabase() {
  await db.destroy();
}