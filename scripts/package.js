import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '../dist');
const infoPath = path.join(distDir, 'info.json');

if (!fs.existsSync(infoPath)) {
  console.error('Error: dist/info.json not found. Run the build script first.');
  process.exit(1);
}

const info = JSON.parse(fs.readFileSync(infoPath, 'utf-8'));
const pluginName = info.identifier.split('.').pop();
const version = info.version;
const outputFileName = `${pluginName}-v${version}.bobplugin`;
const outputPath = path.join(__dirname, '..', outputFileName);

const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', {
  zlib: { level: 9 }
});

archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.warn(err);
  } else {
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);
archive.directory(distDir, false);
archive.finalize();

output.on('close', () => {
  console.log(`Successfully created ${outputFileName} (${archive.pointer()} bytes)`);
});
