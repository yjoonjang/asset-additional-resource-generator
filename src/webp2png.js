// webp 이미지를 png로 변환
import sharp from 'sharp';
import fs from 'fs';

const webpPlacedDir = '/Users/jang-youngjoon/PLAV/PLAV 에셋 /에셋 이미지/asset/누끼 이전/발렌티노';
const pngPlacedDir =
    '/Users/jang-youngjoon/PLAV/PLAV 에셋 /에셋 이미지/asset/누끼 이전/발렌티노-png';
const files = fs.readdirSync(webpPlacedDir);
console.log(files);
for (let i = 0; i < files.length; i++) {
    await sharp(`${webpPlacedDir}` + `/${files[i]}`)
        .toFormat('png')
        .png({ quality: 100 })
        .toFile(`${pngPlacedDir}` + `/${files[i].toString().slice(-files[i].toString().length, -4)}.png`);
}
