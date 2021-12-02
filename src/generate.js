import os from 'os';
import fs from 'fs';
import pkg, { Canvas } from 'canvas';
const { createCanvas, loadImage, Image } = pkg;
import xlsx from 'xlsx';

const assetInfoFile = '/Users/jang-youngjoon/PLAV/에셋 엑셀파일/구찌(완)/구찌_핸드백.xlsx';
const sampleImage = xlsx.readFile(assetInfoFile);
const sheetName = sampleImage.SheetNames[0];
const firstSheet = sampleImage.Sheets[sheetName];

const generateAdditionalResource = () => {
    return new Promise(async (resolve) => {
        // 사진 위치 directory
        const directory = '/Users/jang-youngjoon/PLAV/에셋 엑셀파일/에셋 이미지/누끼 완료/구찌';
        const files = fs.readdirSync(directory);

        //excel에서 column length 구하여 최대 범위 작성해야 함
        //350 까지 진행 완료
        for (let i = 385; i < 386; i++) {
            const assetIdList = [];
            const assetIdCellNum = 'E' + i; //고유 번호가 들어가 있는 셀 넘버
            const assetId = firstSheet[assetIdCellNum].v;
            const filename = `${assetId}_additionalResource.png`; //저장할 파일 이름
            const filepath = `/Users/jang-youngjoon/PLAV/에셋 엑셀파일/에셋 이미지/additionalResource/구찌-additionalResource/${filename}`; //저장할 파일 경로
            for (let j = 0; j < files.length; j += 1) {
                if (files[j].includes(assetId)) {
                    assetIdList.push(files[j]);
                }
            }

            // missing image 확인
            if (assetIdList.length !== 0) {
                // 에셋 이미지가 순서대로 있는 지 확인
                let assetImageListLen = assetIdList.length;
                for (let i = 1; i < 4; i++) {
                    const assetImageName = '__' + assetId + `_${i}`; //에셋 이미지 이름
                    if (fs.existsSync(`${directory}/${assetImageName}.png`) === false) {
                        assetImageListLen += 1;
                    }
                }

                const canvas = createCanvas(1200, assetIdList.length * 1200 + (assetIdList.length - 1) * 100);
                const ctx = canvas.getContext('2d');

                // draw background
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // draw background-구분선
                ctx.fillStyle = '#f7f9f9';
                for (let resourceListIndex = 0; resourceListIndex < assetIdList.length - 1; resourceListIndex += 1) {
                    ctx.fillRect(0, 1200 + 1300 * resourceListIndex, 1200, 100);
                }

                let index = 0;
                for (let i = 1; i < assetImageListLen + 1; i++) {
                    const assetImageName = '__' + assetId + `_${i}`;
                    if (fs.existsSync(`${directory}/${assetImageName}.png`) === true) {
                        let resource = await loadImage(`${directory}/${assetImageName}.png`);
                        let wrh = resource.width / resource.height; //비율 : 가로/높이
                        let newHeight = 1100;
                        if (newHeight * wrh > 1200) {
                            let newWidth = 1100;
                            let newHeight = newWidth / wrh;
                            let xOffset = (canvas.width - newWidth) / 2;
                            let yOffset = (1200 - newHeight) / 2 + 1300 * index;
                            ctx.drawImage(resource, xOffset, yOffset, newWidth, newHeight);
                        } else {
                            let newWidth = newHeight * wrh;
                            let xOffset = (canvas.width - newWidth) / 2;
                            let yOffset = 50 + 1300 * index;
                            ctx.drawImage(resource, xOffset, yOffset, newWidth, newHeight);
                        }
                        index++;
                    }
                }
                const stream = canvas.createPNGStream();
                const out = fs.createWriteStream(filepath);
                stream.pipe(out);

                out.on('finish', () => {
                    resolve(filepath);
                });
            } else {
                console.log(`Missing Image : ${assetId} / cellNum : E${i}`);
            }
        }
    });
};
generateAdditionalResource();
