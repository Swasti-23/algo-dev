const express = require('express');
const { generateFile } = require('../utils/generateFile');
const { executeCpp } = require('../utils/executeCpp');
const { generateInputFile } = require('../utils/generateInputFile');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));



router.post('/', async (req, res) => {
    const { language = 'cpp', code , input } = req.body;
    if(code === undefined){
        return res.status(500).json({"success" : false, message : "Empty code body"});
    }
    try {
        const filePath = await generateFile(language, code);
        const input_filepath = await generateInputFile(input);
        const output = await executeCpp(filePath, input_filepath);
        res.status(200).json({filePath, output});
    } catch (error) {
        return res.status(500).json({"success" : false, message : error.message});
    }
});

module.exports = router;
