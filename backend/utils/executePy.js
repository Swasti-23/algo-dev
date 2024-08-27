const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputPath = path.join(__dirname, 'outputPy');

if (!fs.existsSync(outputPath)) {
    try {
        fs.mkdirSync(outputPath, { recursive: true });
    } catch (err) {
        console.error('Error creating directory:', err);
    }
}

const executePy = async (filepath, inputPath) => {
    return new Promise((resolve, reject) => {
        const command = `python "${filepath}" < "${inputPath}"`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Execution Error:', error);
                reject({ error, stderr });
                return; 
            }
            if (stderr) {
                console.error('Standard Error:', stderr);
                reject(stderr);
                return;
            }
            resolve(stdout);
        });
    });
};

module.exports = {
    executePy,
};