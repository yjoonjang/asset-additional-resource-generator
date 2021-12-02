import fs from 'fs';
import xlsx from 'xlsx';
const assetInfoFile =
    '/Users/jang-youngjoon/PLAV/에셋 엑셀파일/루이비통(완)/루이비통_핸드백.xlsx';
const sampleImage = xlsx.readFile(assetInfoFile);
const sheetName = sampleImage.SheetNames[0];
const firstSheet = sampleImage.Sheets[sheetName];
const missingAssetFileList = [];
const checkExists = () => {
    return new Promise(async (resolve) => {
        const directory =
            '/Users/jang-youngjoon/PLAV/에셋 엑셀파일/에셋 이미지/누끼 완료/루이비통';
        const files = fs.readdirSync(directory);
        for (let i = 2; i < 412; i++) {
            const assetIdList = [];
            const assetIdCellNum = 'E' + i; //고유 번호가 들어가 있는 셀 넘버
            const assetId = firstSheet[assetIdCellNum].v;

            for (let j = 0; j < files.length; j += 1) {
                if (files[j].includes(assetId)) {
                    assetIdList.push(files[j]);
                }
            }

            for (let i = 1; i < assetIdList.length + 1; i++) {
                const assetImageName = '__' + assetId + `_${i}`; //에셋 이미지 이름
                if (fs.existsSync(`${directory}/${assetImageName}.png`) === false) {
                    missingAssetFileList.push(assetImageName);
                }
            }
        }
        console.log(missingAssetFileList);
    });
};
checkExists();
