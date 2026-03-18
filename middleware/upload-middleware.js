const multer = require('multer');

const path = require('path');


//set our multer storge
const storge = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        )
    }
})

//file filter function
const checkFileFillter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb(new Error('Not an image! Please upload only images'), false);
    }
}

//multer middleware
module.exports = multer({
    storage: storge,
    fileFilter: checkFileFillter,
    limits: {
        fileSize: 5 * 1024 * 1024//file size limit
    }
})