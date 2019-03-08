const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userController')
const urlCtrl = require('../controllers/urlController')
const fileCtrl = require('../controllers/fileController')


router.get('/logstatus', userCtrl.getLogStatus);
router.get('/logout', userCtrl.logout);
router.post('/login', userCtrl.login);
router.post('/register', userCtrl.register);

router.get('/urls/url/:id', urlCtrl.getURLById);
router.get('/urls/home', urlCtrl.getHomeURLs);
router.get('/urls/count', urlCtrl.getCountURLs);
router.get('/urls/limit', urlCtrl.getLimitURLs);
router.get('/urls/count/:uid', urlCtrl.getCountURLsByUid);
router.get('/urls/limit/:uid', urlCtrl.getLimitURLsByUid);
router.get('/urls/limit5/:uid', urlCtrl.getLimit5URLsByUid);
router.post('/urls/url', urlCtrl.createURL)

router.get('/files/file/:id', fileCtrl.getFileById);
router.get('/files/home', fileCtrl.getHomeFiles);
router.get('/files/count', fileCtrl.getCountFiles);
router.get('/files/limit', fileCtrl.getLimitFiles);
router.get('/files/public/count/:uid', fileCtrl.getCountPublicFilesByUid);
router.get('/files/private/count/:uid', fileCtrl.getCountPrivateFilesByUid);
router.get('/files/public/limit/:uid', fileCtrl.getLimitPublicFilesByUid);
router.get('/files/private/limit/:uid', fileCtrl.getLimitPrivateFilesByUid);
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({storage: storage})

router.post('/files/file',upload.any(), fileCtrl.createFile)


module.exports
    = router;
