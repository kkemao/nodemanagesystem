var express = require('express');

var fs = require("fs");//操作文件
var multer = require('multer');//接收图片

var db = require('../db.js');
var _t = require('../util/index.js');
var router = express.Router();

var upload = multer({
    dest: './uploads'
});//定义图片上传的临时目录

/**
 * 没有用中间件multipartMiddleware的时候需要用到multer
 * 验证过的结果为
 * 上传117M的视频文件
 * 用multer只需要2s
 * 而multipart中间件需要接近10s
 */ 
router.post('/', upload.single('file'), function(req, res, next) {
    // var filename = "./public/uploads/" + req.file.originalname;
    var filetype = req.file.mimetype.split('/')[1];
    var filename = _t.getUuid() + '.' + filetype;
    fs.rename(req.file.path, "./public/uploads/" + filename, function(err) {
        if (err) {
            throw err;
        }
        console.log('上传成功!');
    })
    res.send({errCode: 0, data: "/uploads/" + filename});

});

/* GET home page. */
// router.post('/', function(req, res, next) {
//     console.log(req.files, req.body);
//     var filetype = req.files.file.type.split('/')[1];
//     var filename = _t.getUuid() + '.' + filetype;
//     fs.rename(req.files.file.path, "./public/uploads/" + filename, function(err) {
//         if (err) {
//             throw err;
//         }
//         console.log('上传成功!');
//     })
//     res.send({errCode: 0, data: "/uploads/" + filename});

// });


module.exports = router;
