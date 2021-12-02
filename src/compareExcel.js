import fs from 'fs';
import xlsx from 'xlsx';
const assetInfoFile1 = '/Users/jang-youngjoon/PLAV/에셋 엑셀파일/구찌(완)/구찌_핸드백.xlsx';
const sampleImage = xlsx.readFile(assetInfoFile1);
const sheetName1 = sampleImage.SheetNames[0];
const firstSheet1 = sampleImage.Sheets[sheetName1];

const listlyAseetInfoFile = '/Users/jang-youngjoon/Downloads/LISTLY_GROUP_www.gucci._1hZfBp5e_LATEST_20210914 (2).xlsx';
const listlyInfo = xlsx.readFile(listlyAseetInfoFile);
const sheetName2 = listlyInfo.SheetNames[0];
const firstSheet2 = listlyInfo.Sheets[sheetName2];

const checkExcel = () => {
    for (let i = 2; i < 412; i++) {
        const cellName = 'B' + i;
        if (firstSheet1[cellName].v !== firstSheet2[cellName].v) {
            console.log(cellName);
        }
    }
};

checkExcel();
