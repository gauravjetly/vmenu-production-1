#!/usr/bin/env node

/**
 * Script to fix menu templates that don't have pages
 * This ensures all templates have at least one page to prevent publish failures
 */

import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

const knexConfig = require('../../knexfile');
const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

async function fixMenuTemplates() {
  console.log('Starting menu template fix...');
  
  const knex = require('knex')(config) as Knex;
  
  try {
    // Find all menus
    const menus = await knex('menus').select('*');
    console.log(`Found ${menus.length} menus to check`);
    
    let fixedCount = 0;
    
    for (const menu of menus) {
      const template = menu.template;
      
      // Check if template exists and has pages
      if (template && (!template.pages || template.pages.length === 0)) {
        console.log(`Fixing menu: ${menu.id} - ${menu.name}`);
        
        // Add a default page
        template.pages = [{
          id: uuidv4(),
          name: 'Page 1',
          elements: []
        }];
        
        // Update the menu
        await knex('menus')
          .where({ id: menu.id })
          .update({
            template: JSON.stringify(template),
            updated_at: new Date()
          });
        
        fixedCount++;
      }
    }
    
    console.log(`Fixed ${fixedCount} menus`);
    console.log('Menu template fix completed successfully');
    
  } catch (error) {
    console.error('Error fixing menu templates:', error);
    process.exit(1);
  } finally {
    await knex.destroy();
  }
}

// Run the script
fixMenuTemplates().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});