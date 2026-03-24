import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const treesDir = join(__dirname, '../src/routes/_demos/trees');

const files = [
  {
    url: 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/latest/pose_landmarker_full.task',
    dest: join(treesDir, 'pose_landmarker_full.task')
  },
  {
    url: 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.32/wasm/vision_wasm_internal.js',
    dest: join(treesDir, 'vision_wasm_internal.js')
  },
  {
    url: 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.32/wasm/vision_wasm_internal.wasm',
    dest: join(treesDir, 'vision_wasm_internal.wasm')
  }
];

async function downloadFile(url, dest) {
  if (existsSync(dest)) {
    console.log(`✓ ${dest} already exists`);
    return;
  }

  console.log(`Downloading ${url}...`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.statusText}`);
  }

  const buffer = await response.arrayBuffer();
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, Buffer.from(buffer));
  console.log(`✓ Downloaded ${dest}`);
}

async function main() {
  console.log('Downloading MediaPipe models...');
  for (const file of files) {
    await downloadFile(file.url, file.dest);
  }
  console.log('Done!');
}

main().catch(console.error);
