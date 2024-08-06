const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputPath = path.join(__dirname, 'outputs');

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive : true});
}

const executeCpp = async (filepath) => {
    const jobId = path.basename(filepath).split('.')[0];
    const output_filename = `${jobId}.exe`;
    const outPath = path.join(outputPath, output_filename);

    return new Promise((resolve, reject) => {
        const command = `g++ "${filepath}" -o "${outPath}" && cd "${outputPath}" && .\\${output_filename}`;
        console.log('Executing command:', command);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Compilation error:', error.message);
                return reject({ error: error.message, stderr });
            }
            if (stderr) {
                console.error('Compilation stderr:', stderr);
            }
            resolve(stdout);
        });
    });
 };

module.exports = {
    executeCpp,
};