const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");
const fs = require('fs');
const path = require('path');

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

            const folderPath = `results/${scenario}`;
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

function scenario(s, info) {
    let parts = s.split('/');
    return `
    <div class="btitle">
      <h3>Scenario: ${parts[1]}</h3><h4>Step:${parts[2]}</h4>
    </div>
      <div class="row images">
        <div class="col-md-3">
          <span class="imgname">Reference</span>
          <img class="img2" src="../../${info.reference}" id="refImage" label="Reference">
        </div>
        <div class="col-md-3">
          <span class="imgname">Test</span>
          <img class="img2" src="../../${info.test}" id="testImage" label="Test">
        </div>
        <div class="col-md-3">
            <span class="imgname">Diff</span>
            <img class="img2" src="../../${info.diff}" id="diffImage" label="Diff">
        </div>
        <div class="col-md-3">
        <span class="imgname">Result Information</span>
            <div class="row"><p class="key">Same dimensions:</p><span>${info.isSameDimensions}</span></div>
            <div class="row"><p class="key">Raw mismatch percentage: </p><span>${info.rawMisMatchPercentage}%</span></div>
            <div class="row"><p class="key">Mistmatch percentage: </p><span>${info.misMatchPercentage}%</span></div>
            <div class="row"><p class="key">Analysis Time: </p><span>${info.analysisTime}</span></div>
        </div>
  </div>`
}

function createReport(datetime, resInfo) {
    return `
    <html>
  <head>
    <title> VRT Report </title>
    <link href="index.css" type="text/css" rel="stylesheet">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      </head>
      <body>
        <div class="container-fluid">
                <h1>Report for Ghost</h1>
                <p>Executed: ${datetime}</p>
                ${scenarios.map(s => scenario(s, resInfo[s]))}
          </div>
      </body>
    </html>`
}

const directoryPathGhost3_4_1 = './ghost 3.4.1';
const directoryPathGhost4_44 = './ghost 4.44';

(async function () {
    await compareFiles(directoryPathGhost3_4_1, directoryPathGhost4_44)

    const now = new Date();
    const year = now.getFullYear().toString().substring(2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const formattedDate = `results_${year}_${month}_${day}_${hours}_${minutes}_${seconds}`;
    console.log(formattedDate);


    let reportPath = `./results/${formattedDate}`
    if (!fs.existsSync(reportPath)) {
        fs.mkdirSync(reportPath, { recursive: true });
    }

    fs.writeFileSync(`${reportPath}/report.html`, createReport(now, resultInfo));
    fs.copyFileSync('./index.css', `${reportPath}/index.css`);
})();