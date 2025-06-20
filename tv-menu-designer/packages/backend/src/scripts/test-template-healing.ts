import { MenuDomain } from '../domain/menu/MenuDomain';
import { MenuTemplate } from '@tv-menu-designer/shared';

console.log('Testing MenuDomain template healing logic...\n');

// Test 1: Template without pages
console.log('Test 1: Healing template without pages');
const templateWithoutPages = {
  id: 'template-123',
  version: '1.0.0',
  metadata: {
    name: 'Test Template',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: []
  },
  settings: {
    canvas: {
      width: 1920,
      height: 1080,
      backgroundColor: '#ffffff',
      aspectRatio: '16:9' as any
    }
  },
  pages: [] // Empty pages array
} as MenuTemplate;

const persistenceData1 = {
  id: 'menu-123',
  organizationId: 'org-123',
  name: 'Test Menu',
  description: 'Test Description',
  version: '1.0.0',
  status: 'draft',
  template: templateWithoutPages,
  settings: {},
  createdBy: 'user-123',
  updatedBy: 'user-123',
  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: undefined
};

const menu1 = MenuDomain.fromPersistence(persistenceData1);
console.log(`✓ Pages count after healing: ${menu1.template.pages.length}`);
console.log(`✓ First page name: ${menu1.template.pages[0]?.name}`);
console.log(`✓ First page has ID: ${!!menu1.template.pages[0]?.id}`);
console.log('');

// Test 2: Template with missing canvas
console.log('Test 2: Healing template with missing canvas');
const templateWithoutCanvas = {
  id: 'template-456',
  version: '1.0.0',
  metadata: {
    name: 'Test Template 2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: []
  },
  settings: {}, // Missing canvas
  pages: [{
    id: 'page-123',
    name: 'Page 1',
    elements: []
  }]
} as any;

const persistenceData2 = {
  id: 'menu-456',
  organizationId: 'org-123',
  name: 'Test Menu 2',
  description: 'Test Description',
  version: '1.0.0',
  status: 'draft',
  template: templateWithoutCanvas,
  settings: {},
  createdBy: 'user-123',
  updatedBy: 'user-123',
  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: undefined
};

const menu2 = MenuDomain.fromPersistence(persistenceData2);
console.log(`✓ Canvas exists after healing: ${!!menu2.template.settings.canvas}`);
console.log(`✓ Canvas width: ${menu2.template.settings.canvas.width}`);
console.log(`✓ Canvas height: ${menu2.template.settings.canvas.height}`);
console.log('');

// Test 3: Template with pages missing properties
console.log('Test 3: Healing pages with missing properties');
const templateWithIncompletePages = {
  id: 'template-789',
  version: '1.0.0',
  metadata: {
    name: 'Test Template 3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: []
  },
  settings: {
    canvas: {
      width: 1920,
      height: 1080,
      backgroundColor: '#ffffff',
      aspectRatio: '16:9' as any
    }
  },
  pages: [
    { elements: [] }, // Missing id and name
    { id: 'page-2', elements: [] }, // Missing name
    { id: 'page-3', name: 'Custom Page' } // Missing elements
  ] as any[]
} as MenuTemplate;

const persistenceData3 = {
  id: 'menu-789',
  organizationId: 'org-123',
  name: 'Test Menu 3',
  description: 'Test Description',
  version: '1.0.0',
  status: 'draft',
  template: templateWithIncompletePages,
  settings: {},
  createdBy: 'user-123',
  updatedBy: 'user-123',
  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: undefined
};

const menu3 = MenuDomain.fromPersistence(persistenceData3);
console.log(`✓ Total pages: ${menu3.template.pages.length}`);
console.log(`✓ Page 1 has ID: ${!!menu3.template.pages[0].id}`);
console.log(`✓ Page 1 name: ${menu3.template.pages[0].name}`);
console.log(`✓ Page 2 name: ${menu3.template.pages[1].name}`);
console.log(`✓ Page 3 elements array exists: ${Array.isArray(menu3.template.pages[2].elements)}`);
console.log('');

// Test 4: Publishing healed menu
console.log('Test 4: Publishing menu with healed template');
try {
  menu1.publish('user-123');
  console.log(`✓ Successfully published menu with healed template`);
  console.log(`✓ Menu status: ${menu1.status}`);
  console.log(`✓ Published at: ${!!menu1.publishedAt}`);
} catch (error: any) {
  console.log(`✗ Failed to publish: ${error.message}`);
}

console.log('\nAll template healing tests completed!');