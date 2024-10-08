const fs = require('fs');
const path = require('path');
const {v4 : uuid} = require('uuid');

const dirInputs = path.join(__dirname, 'inputs');

if(!fs.existsSync(dirInputs)) {
    try {
        fs.mkdirSync(dirInputs, { recursive: true });
    } catch (err) {
        console.error('Error creating directory:', err);
    }
}

const generateInputFile = async (input) => {
    const jobId = uuid();
    const input_fileName = `${jobId}.txt`;
    const input_filePath = path.join(dirInputs, input_fileName);
    fs.writeFileSync(input_filePath, input); 
    return input_filePath;
};

module.exports = {
    generateInputFile,
};