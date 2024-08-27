const express = require('express');
const { generateFile } = require('../utils/generateFile');
const { executeCpp } = require('../utils/executeCpp');
const { generateInputFile } = require('../utils/generateInputFile');
const { generateJavaFile } = require('../utils/generateJavaFile.js');
const { generatePyFile } = require('../utils/generatePyFile.js');
const { executeJava } = require('../utils/executeJava.js');
const { executePy } =  require('../utils/executePy.js');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));



router.post('/', async (req, res) => {
    const { language = 'cpp', code , input } = req.body;
    if (!code) {
        return res.status(500).json({ success: false, message: "Empty code body" });
    }
    try {
        let filePath, output, input_filePath;

        if (language === 'cpp') {
            filePath = await generateFile(code, language);
            input_filePath = await generateInputFile(input);
            output = await executeCpp(filePath, input_filePath);
        } else if (language === 'java') {
            filePath = await generateJavaFile(code, language);
            input_filePath = await generateInputFile(input);
            output = await executeJava(filePath, input_filePath);
        } else if (language === 'py') {
            filePath = await generatePyFile(code, language);
            input_filePath = await generateInputFile(input);
            output = await executePy(filePath, input_filePath);
        } else {
            return res.status(400).json({ success: false, message: "Unsupported language" });
        }

        res.json({ filePath, output, input_filePath });
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
