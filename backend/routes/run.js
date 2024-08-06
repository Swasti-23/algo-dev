const express = require('express');
const { generateFile } = require('../utils/generateFile');
const { executeCpp } = require('../utils/executeCpp');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));



router.post('/', async (req, res) => {
    const { language = 'cpp', code } = req.body;
    if(code === undefined){
        return res.status(500).json({"success" : false, message : "Empty code body"});
    }
    try {
        const filePath = await generateFile(language, code);
        console.log(filePath);
        const output = await executeCpp(filePath);
        console.log(output);
        res.status(200).json({filePath, output});
    } catch (error) {
        return res.status(500).json({"success" : false, message : error.message});
    }
});

module.exports = router;
