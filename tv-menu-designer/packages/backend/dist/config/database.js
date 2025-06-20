"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.initializeDatabase = initializeDatabase;
exports.closeDatabase = closeDatabase;
const knex_1 = __importDefault(require("knex"));
const objection_1 = require("objection");
const _1 = require(".");
const logger_1 = require("../utils/logger");
exports.db = (0, knex_1.default)({
    client: 'pg',
    connection: {
        host: _1.config.database.host,
        port: _1.config.database.port,
        database: _1.config.database.name,
        user: _1.config.database.user,
        password: _1.config.database.password
    },
    pool: {
        min: _1.config.database.pool.min,
        max: _1.config.database.pool.max
    },
    migrations: {
        directory: './migrations',
        tableName: 'knex_migrations'
    },
    seeds: {
        directory: './seeds'
    }
});
async function initializeDatabase() {
    try {
        // Bind Objection.js to knex instance
        objection_1.Model.knex(exports.db);
        // Test connection
        await exports.db.raw('SELECT 1');
        // Run migrations
        const [pending, completed] = await Promise.all([
            exports.db.migrate.list(),
            exports.db.migrate.currentVersion()
        ]);
        if (pending[1].length > 0) {
            logger_1.logger.info(`Running ${pending[1].length} pending migrations...`);
            await exports.db.migrate.latest();
            logger_1.logger.info('Migrations completed');
        }
        else {
            logger_1.logger.info('Database is up to date');
        }
    }
    catch (error) {
        logger_1.logger.error('Database initialization failed:', error);
        throw error;
    }
}
async function closeDatabase() {
    await exports.db.destroy();
}
//# sourceMappingURL=database.js.map