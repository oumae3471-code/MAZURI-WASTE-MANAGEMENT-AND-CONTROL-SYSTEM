const fs = require('fs');
const path = require('path');
const { sequelize, Sequelize } = require('../config/sequelize');

async function runMigrations() {
  const migrationsDir = path.join(__dirname, '..', 'migrations');
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.js')).sort();
  const qi = sequelize.getQueryInterface();

  try {
    console.log('Running migrations:', files);
    for (const file of files) {
      const migration = require(path.join(migrationsDir, file));
      if (migration && typeof migration.up === 'function') {
        console.log('Applying', file);
        await migration.up({ context: qi, Sequelize });
      }
    }
    console.log('Migrations complete');
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  runMigrations().then(() => process.exit(0));
}

module.exports = runMigrations;
