import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.resolve(__dirname, '../src/assets/logo.png');
const outputDir = path.resolve(__dirname, '../public/icons');

const sizes = [16, 32, 96, 128];

async function generateFavicons() {
  try {
    if (!fs.existsSync(inputPath)) {
      console.error('Input logo image not found at:', inputPath);
      process.exit(1);
    }
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const size of sizes) {
      const outputPath = path.join(outputDir, `favicon-${size}x${size}.png`);
      await sharp(inputPath)
        .resize(size, size)
        .toFile(outputPath);
      console.log(`Generated favicon: ${outputPath}`);
    }
    console.log('Favicons generated successfully.');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();
