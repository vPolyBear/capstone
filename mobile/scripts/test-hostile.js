const path = require('node:path');
const { spawnSync } = require('node:child_process');

const projectDirectory = path.join(__dirname, '..');
const generator = path.join(__dirname, 'generate-test-data.js');
const jest = path.join(projectDirectory, 'node_modules', 'jest', 'bin', 'jest.js');

const generated = spawnSync(process.execPath, [generator], { stdio: 'inherit' });
if (generated.error) throw generated.error;
if (generated.status !== 0) process.exit(generated.status ?? 1);

const result = spawnSync(process.execPath, [jest, '--runInBand'], {
  cwd: projectDirectory,
  stdio: 'inherit',
  env: { ...process.env, TEST_DATA_SET: 'hostile' },
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
