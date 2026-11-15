
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const databasePath = process.argv[2];

if (!databasePath) {
    console.error('Provide a path for the smoke-test database.');
    process.exit(1);
}

const migrationsDirectory = path.join(__dirname, '..', 'migrations');

const migrationFiles = [
    '0001-initial.sql',
    '0002-checkin-checks-update.sql',
];

const seedFile = path.join(
    __dirname,
    '..',
    'src',
    'lib',
    'developmentSeed.js'
);

const seedSource = fs.readFileSync(seedFile, 'utf8');

const seedMatch = seedSource.match(
    /export\s+const\s+DEVELOPMENT_SEED_SQL\s*=\s*`([\s\S]*?)`;/ 
);

if (!seedMatch) {
    throw new Error('Could not find DEVELOPMENT_SEED_SQL in developmentSeed.js');
}

const db = new DatabaseSync(databasePath);

try {
    for (let i = 0; i < migrationFiles.length; i++) {
        const migrationPath = path.join(
            migrationsDirectory,
            migrationFiles[i]
        );

        const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

        db.exec(migrationSQL);

        db.prepare(
            'INSERT INTO schema_migrations (version) VALUES (?)'
        ).run(i + 1);
    }

    db.exec(seedMatch[1]);

    console.log(`Smoke-test database created: ${databasePath}`);
} finally {
    db.close();
}
