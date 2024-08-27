const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputPath = path.join(__dirname, 'outputCpp');

if (!fs.existsSync(outputPath)) {
    try {
        fs.mkdirSync(outputPath, { recursive: true });
    } catch (err) {
        console.error('Error creating directory:', err);
    }
}

const executeCpp = async (filepath, inputPath) => {
    const jobId = path.basename(filepath).split('.')[0];
    const output_filename = `${jobId}.out`;
    const outPath = path.join(outputPath, output_filename);

    return new Promise((resolve, reject) => {
        const command = `g++ "${filepath}" -o "${outPath}" && cd "${outputPath}" && ./${output_filename} < "${inputPath}"`;
        console.log('Executing command:', command);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Compilation error:', error.message);
                reject({ error: error.message, stderr });
                return;
            }
            if (stderr) {
                console.error('Compilation stderr:', stderr);
                reject({ stderr });
                return;
            }
            resolve(stdout);
        });
    });
 };

module.exports = {
    executeCpp,
};