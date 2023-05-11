const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const { options } = config;

let resultInfo = {}
let scenarios = []
async function compareFiles(dir1, dir2) {
    const files1 = fs.readdirSync(dir1);
    const files2 = fs.readdirSync(dir2);

    for (let i = 0; i < files1.length; i++) {
        const file1 = path.join(dir1, files1[i]);
        const file2 = path.join(dir2, files2[i]);

        const stat1 = fs.statSync(file1);
        const stat2 = fs.statSync(file2);

        if (stat1.isDirectory() && stat2.isDirectory()) {
            await compareFiles(file1, file2); // recursive call for subdirectories
        } else if (stat1.isFile() && stat2.isFile()) {
            const data = await compareImages(
                fs.readFileSync(file1),
                fs.readFileSync(file2),
                options
            );

            let scenario = path.basename(path.dirname(file1))
            scenarios.push(file1)

            const folderPath = `./results/${scenario}`;
            const diffFilePath = `${folderPath}/compare-${path.basename(file1)}`;
            resultInfo[file1] = {
                isSameDimensions: data.isSameDimensions,
                dimensionDifference: data.dimensionDifference,
                rawMisMatchPercentage: data.rawMisMatchPercentage,
                misMatchPercentage: data.misMatchPercentage,
                diffBounds: data.diffBounds,
                analysisTime: data.analysisTime,
                reference: file1,
                test: file2,
                diff: diffFilePath
            }

            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }

            fs.writeFileSync(diffFilePath, data.getBuffer());
        }
    }
}

function scenario(b, info){
    return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h2>Browser: ${b}</h2>
        <p>Data: ${JSON.stringify(info)}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="${info.reference}" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="${info.test}" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="${info.diff}" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`
}

function createReport(datetime, resInfo){
    return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for Ghost</h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
                ${scenarios.map(s=>scenario(s, resInfo[s]))}
            </div>
        </body>
    </html>`
}

const directoryPathGhost3_4_1 = './ghost 3.4.1';
const directoryPathGhost4_44 = './ghost 4.44';
compareFiles(directoryPathGhost3_4_1, directoryPathGhost4_44)

const now = new Date();
const datetime = now.toISOString();
const hash = crypto.createHash('sha256').update(datetime).digest('hex');
console.log(hash);

let reportPath = `./results/${hash}`
if (!fs.existsSync(reportPath)) {
    fs.mkdirSync(reportPath, { recursive: true });
}

fs.writeFileSync(`${reportPath}/report.html`, createReport(now, resultInfo));
fs.copyFileSync('./index.css', `${reportPath}/index.css`);