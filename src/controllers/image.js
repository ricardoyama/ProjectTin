const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');
const { Image } = require('../models');

const ctrl = {};

ctrl.index = async (req, res) => {
  //let viewModel = { image: {}, comments: [] };
  const image = await Image.findOne({filename: { $regex: req.params.image_id }});
  /*if (image) {
    image.views = image.views + 1;
    viewModel.image = image;
    image.save();
    const comments = await Comment.find({image_id: image._id})
      .sort({'timestamp': 1});
    viewModel.comments = comments;
    viewModel = await sidebar(viewModel);
    res.render('image', viewModel);
  } else {
    res.redirect('/');
  }*/
  console.log(image);
  res.render('image',{image});
};

ctrl.create = (req, res) => {
    const saveImage = async () => {
        const imgUrl = randomNumber();
        const images = await Image.find({ filename: imgUrl });
        if (images.length > 0) {
          saveImage();
        } else {
            console.log(imgUrl);
          // Image Location
          const imageTempPath = req.file.path;
          const ext = path.extname(req.file.originalname).toLowerCase();
          const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);
    
          // Validate Extension
          if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
            // you wil need the public/temp path or this will throw an error
            await fs.rename(imageTempPath, targetPath);
            const newImg = new Image({
              title: req.body.title,
              filename: imgUrl + ext,
              description: req.body.description
            });
            const imageSaved = await newImg.save();
            //res.redirect('/images/');
            res.send('works');
          } else {
            await fs.unlink(imageTempPath);
            res.status(500).json({ error: 'Solo imagenes estan permitidas' });
          }
        }
    };
    
    saveImage();
};

ctrl.like = (req, res) => {
    
};
ctrl.comment = (req, res) => {
    
};

ctrl.remove = (req, res) => {
    
};


 module.exports = ctrl;