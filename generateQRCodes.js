// generateQRCodes.js — run once with: node generateQRCodes.js
import QRCode from 'qrcode';
import fs from 'fs';

const OUTPUT_DIR = './qr-codes';
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

async function generate() {
  for (let i = 1; i <= 50; i++) {
    const id = String(i).padStart(2, '0');
    await QRCode.toFile(`${OUTPUT_DIR}/emotion-${id}.png`, id, { width: 500, margin: 2 });
    console.log(`Generated card ${id}`);
  }
}
generate();