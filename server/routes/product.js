const express = require('express');
const { default: UploadProductPage } = require('../../client/src/components/views/UploadProductPage/UploadProductPage');
const router = express.Router();
const multer = require('multer');


//=================================
//             Product
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
})

var upload = multer({storage: storage}).single("file");

router.post('/image', (req, res) => {

    //가져온 이미지를 저장을 해주면 된다.
    UploadProductPage(req, res, err => {
        if (err) {
            return req.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

});


module.exports = router;
