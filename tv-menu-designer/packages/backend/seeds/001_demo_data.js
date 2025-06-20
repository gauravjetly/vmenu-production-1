const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

exports.seed = async function(knex) {
  // Check if demo organization already exists
  const existingOrg = await knex('organizations').where('slug', 'demo-org').first();
  if (existingOrg) {
    console.log('Demo data already exists, skipping...');
    return;
  }

  // Create demo organization
  const orgId = uuidv4();
  await knex('organizations').insert({
    id: orgId,
    name: 'Demo Organization',
    slug: 'demo-org',
    description: 'Demo organization for testing',
    status: 'active',
    plan: JSON.stringify({
      name: 'Professional',
      features: ['unlimited_menus', 'unlimited_devices', 'analytics'],
      maxMenus: -1,
      maxDevices: -1
    }),
    settings: JSON.stringify({}),
    limits: JSON.stringify({
      maxMenus: -1,
      maxDevices: -1,
      maxUsers: 10
    }),
    created_at: new Date(),
    updated_at: new Date()
  });

  // Create demo user
  const userId = uuidv4();
  const passwordHash = await bcrypt.hash('demo123', 10);
  
  await knex('users').insert({
    id: userId,
    email: 'demo@tvmenudesigner.com',
    username: 'demo',
    password_hash: passwordHash,
    first_name: 'Demo',
    last_name: 'User',
    role: 'organization_admin',
    status: 'active',
    organization_id: orgId,
    permissions: '{manage_menus,manage_devices,view_analytics}',
    profile: JSON.stringify({
      avatar: null,
      timezone: 'UTC'
    }),
    metadata: JSON.stringify({
      lastLogin: null,
      loginCount: 0
    }),
    created_at: new Date(),
    updated_at: new Date()
  });

  console.log('Demo data created successfully!');
  console.log('Login credentials:');
  console.log('  Username: demo');
  console.log('  Password: demo123');
};