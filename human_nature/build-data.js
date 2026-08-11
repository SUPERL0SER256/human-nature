// build-data.js — run once with: node build-data.js
import fs from 'fs';

const IMAGES_DIR = './images';
const files = fs.readdirSync(IMAGES_DIR)
  .filter(f => /\.(png|jpg|jpeg)$/i.test(f))
  .sort();

const slides = files.map((file, index) => {
  const word = file.replace(/\.(png|jpg|jpeg)$/i, '');
  const id = String(index + 1).padStart(2, '0');
  return {
    id,
    word,
    image: `images/${file}`,
    prompt: `When did you last feel ${word.toLowerCase()}?`
  };
});

const output = `const slides = ${JSON.stringify(slides, null, 2)};\n`;
fs.writeFileSync('./data.js', output);
console.log(`data.js generated with ${slides.length} slides.`);
fs.writeFileSync('./data.js', output);