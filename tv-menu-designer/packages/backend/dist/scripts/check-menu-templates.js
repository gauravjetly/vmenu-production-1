"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
async function checkMenuTemplates() {
    const db = (0, knex_1.default)({
        client: 'pg',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432'),
            database: process.env.DB_NAME || 'vmenu_db',
            user: process.env.DB_USER || 'vmenu',
            password: process.env.DB_PASSWORD || 'vmenu123'
        }
    });
    try {
        console.log('Checking menu templates in database...\n');
        // Get all menus
        const menus = await db('menus').select('id', 'name', 'template');
        console.log(`Found ${menus.length} menus\n`);
        for (const menu of menus) {
            console.log(`Menu: ${menu.name} (ID: ${menu.id})`);
            // Check if template exists
            if (!menu.template) {
                console.log('  ❌ NO TEMPLATE');
                continue;
            }
            // Check if template has pages
            if (!menu.template.pages) {
                console.log('  ❌ NO PAGES in template');
                console.log('  Template structure:', JSON.stringify(menu.template, null, 2).substring(0, 200) + '...');
                continue;
            }
            // Check pages array
            if (!Array.isArray(menu.template.pages)) {
                console.log('  ❌ Pages is not an array');
                continue;
            }
            if (menu.template.pages.length === 0) {
                console.log('  ❌ Pages array is empty');
                continue;
            }
            console.log(`  ✅ Has ${menu.template.pages.length} pages`);
            // Check first page
            const firstPage = menu.template.pages[0];
            if (firstPage.elements) {
                console.log(`     - Page 1 has ${firstPage.elements.length} elements`);
            }
            else {
                console.log('     - Page 1 has NO elements');
            }
        }
        console.log('\nDone!');
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        await db.destroy();
    }
}
checkMenuTemplates();
//# sourceMappingURL=check-menu-templates.js.map