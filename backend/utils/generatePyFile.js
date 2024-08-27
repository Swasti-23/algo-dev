const fs = require('fs');
const path = require('path');
const {v4 : uuid} = require('uuid');

const dirCodes = path.join(__dirname, 'codesPy');


if(!fs.existsSync(dirCodes)) {
    try {
        fs.mkdirSync(dirCodes, { recursive: true });
    } catch (err) {
        console.error('Error creating directory:', err);
    }
}

const generatePyFile = async (code, language) => {
    const jobId = uuid();
    const filename = `${jobId}.${language}`;
    const filePath = path.join(dirCodes, filename);
    fs.writeFileSync(filePath, code);
    return filePath;
}

module.exports = {
    generatePyFile,
};