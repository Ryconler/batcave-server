const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (process.env.NODE_ENV === 'production') {
            cb(null, 'C:/Users/Administrator/Desktop/batcave/uploads')
        }else {
            cb(null, 'uploads')
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({storage: storage})
module.exports = upload
