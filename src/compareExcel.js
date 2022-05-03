// 엑셀 파일 비교
import path from 'path';
import xlsx from 'xlsx';

const assetInfoRootFile = '/Users/jang-youngjoon/PLAV/PLAV 에셋 /에셋 엑셀파일'; // 에셋 정보를 저장하는 뿌리 파일
const pastAssetInfoFile = path.join(assetInfoRootFile, '구찌(완)/구찌_핸드백.xlsx'); // 뿌리 파일 안에 있는 엑셀 파일명
const pastAssetInfo = xlsx.readFile(pastAssetInfoFile);
const sheetName1 = pastAssetInfo.SheetNames[0]; // 시트 지정
const sheet1 = pastAssetInfo.Sheets[sheetName1];

const assetInfoFile = path.join(assetInfoRootFile, '구찌(완)/구찌-210111.xlsx'); // 뿌리 파일 안에 있는 엑셀 파일명
const assetInfo = xlsx.readFile(assetInfoFile);
const sheetName2 = assetInfo.SheetNames[0]; // 시트 지정
const sheet2 = assetInfo.Sheets[sheetName2];

let sheet1CellCount;
let sheet2CellCount;
const sheet1AssetList = [];
const sheet2AssetList = [];
const discardedAssetCellNameList = [];
const addedAssetCellNameList = [];

// 과거 등록된 파일의 셀의 개수가 몇 개인지 검사
for (let i = 1; i++; ) {
    const cellName = 'B' + i;
    if (sheet1[cellName] === undefined) {
        // console.log('과거 파일의 셀의 개수', i - 1);
        sheet1CellCount = i - 1;
        break;
    }
}

console.log(sheet2);

// 새로 등록된 파일의 셀의 개수가 몇 개인지 검사
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
