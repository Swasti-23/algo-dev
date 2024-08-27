const fs = require('fs');
const path = require('path');
const {v4 : uuid} = require('uuid');

const dirCodes = path.join(__dirname, 'codeJava');

if (!fs.existsSync(dirCodes)) {
    try {
        fs.mkdirSync(dirCodes, { recursive: true });
    } catch (err) {
        console.error('Error creating directory:', err);
    }
}

const generateJavaFile = async (code, language) => {
    const jobId = 'Class_' + uuid().replace(/-/g, '_'); 
    const filename = `${jobId}.java`;
    const filePath = path.join(dirCodes, filename);
    
    const javaCode = code.replace(/public class \w+/, `public class ${jobId}`);
    
    fs.writeFileSync(filePath, javaCode);
    return filePath; 
}

module.exports = {
    generateJavaFile,
};