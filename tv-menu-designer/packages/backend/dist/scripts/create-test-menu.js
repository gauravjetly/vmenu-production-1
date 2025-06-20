"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
// Load environment variables
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
async function createTestMenu() {
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
        console.log('Creating test menu...\n');
        // First, check if we have an organization
        const orgs = await db('organizations').select('id', 'name');
        let orgId;
        if (orgs.length === 0) {
            console.log('No organization found. Creating test organization...');
            const newOrg = {
                id: (0, uuid_1.v4)(),
                name: 'Test Restaurant',
                slug: 'test-restaurant',
                plan: {
                    name: 'basic',
                    features: ['menu_design', 'tv_display']
                },
                limits: {
                    menus: 5,
                    devices: 3
                }
            };
            await db('organizations').insert(newOrg);
            orgId = newOrg.id;
            console.log('Created organization:', newOrg.name);
        }
        else {
            orgId = orgs[0].id;
            console.log('Using existing organization:', orgs[0].name);
        }
        // Create a menu with a proper template
        const menuId = (0, uuid_1.v4)();
        const template = {
            id: (0, uuid_1.v4)(),
            version: '1.0.0',
            metadata: {
                name: 'Test Menu Template',
                description: 'A test menu template',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                tags: ['test'],
            },
            settings: {
                canvas: {
                    width: 1920,
                    height: 1080,
                    backgroundColor: '#ffffff',
                    aspectRatio: '16:9'
                }
            },
            pages: [{
                    id: (0, uuid_1.v4)(),
                    name: 'Page 1',
                    elements: [
                        {
                            id: (0, uuid_1.v4)(),
                            type: 'text',
                            content: 'Test Menu',
                            position: { x: 960, y: 100 },
                            size: { width: 400, height: 80 },
                            layer: 1,
                            locked: false,
                            visible: true,
                            rotation: 0,
                            opacity: 1,
                            style: {
                                fontFamily: 'Arial',
                                fontSize: 48,
                                fontWeight: 'bold',
                                color: '#000000',
                                textAlign: 'center'
                            }
                        }
                    ]
                }]
        };
        const menu = {
            id: menuId,
            organization_id: orgId,
            name: 'Test Menu',
            description: 'A test menu for debugging',
            version: '1.0.0',
            status: 'draft',
            template: template,
            settings: {},
            created_at: new Date(),
            updated_at: new Date()
        };
        await db('menus').insert(menu);
        console.log('\nCreated menu successfully!');
        console.log('Menu ID:', menuId);
        console.log('Template has pages:', template.pages.length);
        console.log('First page has elements:', template.pages[0].elements.length);
        // Verify by reading it back
        const savedMenu = await db('menus').where('id', menuId).first();
        const savedTemplate = savedMenu.template;
        console.log('\nVerification:');
        console.log('Saved template has pages:', savedTemplate.pages ? savedTemplate.pages.length : 'NO PAGES');
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        await db.destroy();
    }
}
createTestMenu();
//# sourceMappingURL=create-test-menu.js.map