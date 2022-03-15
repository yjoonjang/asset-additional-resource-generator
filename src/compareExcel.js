import path from 'path';
import xlsx from 'xlsx';
import Excel from 'exceljs';
import { execFile } from 'child_process';

const assetInfoFileRoot = '/Users/jang-youngjoon/PLAV/PLAV 에셋 /에셋 엑셀파일';

const pastAssetInfoFile = path.join(assetInfoFileRoot, '구찌(완)/구찌_핸드백.xlsx');
const pastAssetInfo = xlsx.readFile(pastAssetInfoFile);
const sheetName1 = pastAssetInfo.SheetNames[0];
const sheet1 = pastAssetInfo.Sheets[sheetName1];

const assetInfoFile = path.join(assetInfoFileRoot, '구찌(완)/구찌-210111.xlsx');
const assetInfo = xlsx.readFile(assetInfoFile);
const sheetName2 = assetInfo.SheetNames[0];
const sheet2 = assetInfo.Sheets[sheetName2];

let sheet1CellCount;
let sheet2CellCount;
const sheet1AssetList = [];
const sheet2AssetList = [];
const discardedAssetCellNameList = [];
const addedAssetCellNameList = [];

// 과거 등록된 파일의 셀의 개수가 몇 개인 지 검사
for (let i = 1; i++; ) {
    const cellName = 'B' + i;
    if (sheet1[cellName] === undefined) {
        // console.log('과거 파일의 셀의 개수', i - 1);
        sheet1CellCount = i - 1;
        break;
    }
}

console.log(sheet2);

// const wb = new Excel.Workbook();
// const ws = wb.addWorksheet();

// const workbook2 = new Excel.Workbook();
// workbook2.xlsx.readFile(assetInfo).then(() => {
//     const worksheet = workbook2.getWorksheet();
//     const lastRowNum = sheet1CellCount;
//     worksheet.eachRow((row, rowNum) => {
//         if (rowNum !== lastRowNum) {
//             const r = ws.addRow();
//             Object.assign(r, row);
//         }
//     });
// });

// 새로 등록된 파일의 셀의 개수가 몇 개인 지 검사
for (let i = 1; i++; ) {
    const cellName = 'B' + i;
    if (sheet2[cellName] === undefined) {
        // console.log('현재 파일의 셀의 개수', i - 1);
        sheet2CellCount = i - 1;
        break;
    }
}

// sheet1의 에셋 모음집 리스트
for (let i = 2; i < sheet1CellCount + 1; i++) {
    const sheet1CellName = 'B' + i;
    sheet1AssetList.push(sheet1[sheet1CellName].v);
}

// sheet2의 에셋 모음집 리스트
for (let i = 2; i < sheet2CellCount + 1; i++) {
    const sheet2CellName = 'B' + i;
    sheet2AssetList.push(sheet2[sheet2CellName].v);
}

// 삭제된 항목 파일 리스트
for (let i = 0; i < sheet1CellCount - 1; i++) {
    if (!sheet2AssetList.includes(sheet1AssetList[i])) {
        discardedAssetCellNameList.push(sheet1AssetList[i]);
        // console.log(sheet1AssetList[i], '삭제됨');
    }
}

// 추가된 항목 파일 리스트
for (let i = 0; i < sheet2CellCount - 1; i++) {
    if (!sheet1AssetList.includes(sheet2AssetList[i])) {
        addedAssetCellNameList.push(sheet2AssetList[i]);
        // console.log(sheet2AssetList[i], '추가됨');
    }
}

// console.log(discardedAssetList);
// console.log(addedAssetList);

// const checkExcel = () => {
//     const cell = 'B';
//     for (let i = 2; i < 308; i++) {
//         const cellName = cell + i;
//         if (sheet1[cellName].v !== sheet2[cellName].v) {
//             console.log(cellName);
//         }
//     }
// };
// checkExcel();
// console.log(firstSheet1.B2.v);
