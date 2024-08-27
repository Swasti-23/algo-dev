const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputPath = path.join(__dirname, 'outputJava');

if (!fs.existsSync(outputPath)) {
    try {
        fs.mkdirSync(outputPath, { recursive: true });
    } catch (err) {
        console.error('Error creating directory:', err);
    }
}

const executeJava = async (filepath, inputPath) => {
    const jobId = path.basename(filepath).split('.')[0];
    const outPath = outputPath;

    return new Promise((resolve, reject) => {
        const command = `javac "${filepath}" -d "${outPath}" && java -cp "${outPath}" ${jobId} < "${inputPath}"`;

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
    executeJava,
};