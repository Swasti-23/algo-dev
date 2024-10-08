const fs = require('fs');
const path = require('path');
const {v4 : uuid} = require('uuid');

const dirCodes = path.join(__dirname, 'codesCpp');

if(!fs.existsSync(dirCodes)) {
    try {
        fs.mkdirSync(dirCodes, { recursive: true });
    } catch (err) {
        console.error('Error creating directory:', err);
    }
}


const generateFile = async (code, language) => {
    const jobId = uuid();
    const fileName = `${jobId}.${language}`;
    const filePath = path.join(dirCodes, fileName);
    fs.writeFileSync(filePath, code);
    return filePath;
};

module.exports = {
    generateFile,
};