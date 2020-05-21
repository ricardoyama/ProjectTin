const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');

const ctrl = {};

ctrl.index = (req, res) => {
    
};

ctrl.create = async (req, res) => {
    const imgUrl = randomNumber();
    console.log(imgUrl);
    const imageTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        // you wil need the public/temp path or this will throw an error
        await fs.rename(imageTempPath, targetPath);
    }
    res.send('works');

};

ctrl.like = (req, res) => {
    
};
ctrl.comment = (req, res) => {
    
};

ctrl.remove = (req, res) => {
    
};


 module.exports = ctrl;