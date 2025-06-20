exports.up = function(knex) {
  return knex.schema
    // Organizations table
    .createTable('organizations', table => {
      table.uuid('id').primary();
      table.string('name', 100).notNullable();
      table.string('slug', 100).notNullable().unique();
      table.text('description');
      table.string('logo');
      table.string('website');
      table.enu('status', ['active', 'inactive', 'suspended', 'trial']).defaultTo('trial');
      table.jsonb('plan').notNullable();
      table.jsonb('settings').defaultTo('{}');
      table.jsonb('metadata');
      table.jsonb('limits').notNullable();
      table.timestamps(true, true);
      table.timestamp('trial_ends_at');
      table.timestamp('deleted_at');
      
      table.index('slug');
      table.index('status');
    })
    
    // Users table
    .createTable('users', table => {
      table.uuid('id').primary();
      table.string('email').notNullable().unique();
      table.string('username', 50).unique();
      table.string('password_hash').notNullable();
      table.string('first_name', 50).notNullable();
      table.string('last_name', 50).notNullable();
      table.enu('role', ['super_admin', 'organization_owner', 'organization_admin', 'designer', 'viewer']).notNullable();
      table.enu('status', ['active', 'inactive', 'pending', 'suspended']).defaultTo('active');
      table.uuid('organization_id').references('id').inTable('organizations').onDelete('SET NULL');
      table.specificType('permissions', 'text[]').defaultTo('{}');
      table.jsonb('profile').defaultTo('{}');
      table.jsonb('metadata').defaultTo('{}');
      table.timestamps(true, true);
      
      table.index('email');
      table.index('organization_id');
      table.index('role');
    })
    
    // Menus table
    .createTable('menus', table => {
      table.uuid('id').primary();
      table.uuid('organization_id').notNullable().references('id').inTable('organizations').onDelete('CASCADE');
      table.string('name', 100).notNullable();
      table.text('description');
      table.string('version', 20).notNullable();
      table.enu('status', ['draft', 'published', 'archived']).defaultTo('draft');
      table.jsonb('template').notNullable();
      table.jsonb('settings').defaultTo('{}');
      table.uuid('created_by').references('id').inTable('users').onDelete('SET NULL');
      table.uuid('updated_by').references('id').inTable('users').onDelete('SET NULL');
      table.timestamps(true, true);
      table.timestamp('published_at');
      
      table.index('organization_id');
      table.index('status');
      table.index('created_by');
    })
    
    // Devices table
    .createTable('devices', table => {
      table.uuid('id').primary();
      table.uuid('organization_id').notNullable().references('id').inTable('organizations').onDelete('CASCADE');
      table.string('name', 100).notNullable();
      table.string('code', 20).notNullable().unique();
      table.enu('type', ['display', 'tablet', 'mobile', 'kiosk', 'web']).notNullable();
      table.enu('status', ['online', 'offline', 'error', 'maintenance']).defaultTo('offline');
      table.string('location');
      table.text('description');
      table.jsonb('metadata').defaultTo('{}');
      table.jsonb('settings').defaultTo('{}');
      table.uuid('assigned_menu_id').references('id').inTable('menus').onDelete('SET NULL');
      table.specificType('tags', 'text[]').defaultTo('{}');
      table.timestamps(true, true);
      table.timestamp('last_activity_at');
      
      table.index('organization_id');
      table.index('code');
      table.index('status');
      table.index('assigned_menu_id');
    })
    
    // Analytics events table
    .createTable('analytics_events', table => {
      table.uuid('id').primary();
      table.uuid('organization_id').notNullable().references('id').inTable('organizations').onDelete('CASCADE');
      table.uuid('device_id').notNullable().references('id').inTable('devices').onDelete('CASCADE');
      table.uuid('menu_id').references('id').inTable('menus').onDelete('SET NULL');
      table.uuid('session_id').notNullable();
      table.string('event_type', 50).notNullable();
      table.timestamp('timestamp').notNullable().defaultTo(knex.fn.now());
      table.jsonb('data').defaultTo('{}');
      table.jsonb('metadata');
      
      table.index('organization_id');
      table.index('device_id');
      table.index('event_type');
      table.index('timestamp');
    })
    
    // Sessions table
    .createTable('sessions', table => {
      table.uuid('id').primary();
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.text('token').notNullable().unique();
      table.text('refresh_token').unique();
      table.jsonb('device_info');
      table.timestamp('expires_at').notNullable();
      table.timestamps(true, true);
      
      table.index('user_id');
      table.index('token');
      table.index('expires_at');
    })
    
    // API keys table
    .createTable('api_keys', table => {
      table.uuid('id').primary();
      table.uuid('organization_id').notNullable().references('id').inTable('organizations').onDelete('CASCADE');
      table.string('name', 100).notNullable();
      table.string('key', 64).notNullable().unique();
      table.specificType('permissions', 'text[]').defaultTo('{}');
      table.timestamp('expires_at');
      table.timestamp('last_used_at');
      table.uuid('created_by').notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.timestamps(true, true);
      table.timestamp('revoked_at');
      
      table.index('organization_id');
      table.index('key');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('api_keys')
    .dropTableIfExists('sessions')
    .dropTableIfExists('analytics_events')
    .dropTableIfExists('devices')
    .dropTableIfExists('menus')
    .dropTableIfExists('users')
    .dropTableIfExists('organizations');
};