import sharp from 'sharp';
import fs from 'fs';
import xlsx from 'xlsx';

const webpPlacedDir =
    '/Users/jang-youngjoon/PLAV/에셋 엑셀파일/에셋 이미지/누끼 완료/루이비통-1';
const pngPlacedDir =
    '/Users/jang-youngjoon/PLAV/에셋 엑셀파일/에셋 이미지/누끼 완료/루이비통-2(png)';
const files = fs.readdirSync(webpPlacedDir);
for (let i = 0; i < files.length; i += 1) {
    await sharp(`${webpPlacedDir}` + `/${files[i]}`)
        .toFormat('png')
        .png({ quality: 100 })
        .toFile(`${pngPlacedDir}` + `/${files[i].toString().slice(-files[i].toString().length, -5)}.png`);
}
