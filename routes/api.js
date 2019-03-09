const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userController')
const urlCtrl = require('../controllers/urlController')
const fileCtrl = require('../controllers/fileController')
const likeCtrl = require('../controllers/likeController')


router.get('/checkLog', userCtrl.checkLog);
router.get('/logout', userCtrl.logout);
router.post('/login', userCtrl.login);
router.post('/register', userCtrl.register);
router.put('/change-password', userCtrl.changePassword);

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
const upload = require('../middlewines/uploadMulter')
router.post('/files/file',upload.any(), fileCtrl.createFile)

router.get('/likes/urls/id',likeCtrl.getURLLikesIdByUId)
router.get('/likes/files/id',likeCtrl.getFileLikesIdByUId)
router.get('/likes/urls/limit',likeCtrl.getLimitURLLikesByUId)
router.get('/likes/files/limit',likeCtrl.getLimitFileLikesByUId)
router.post('/likes/like',likeCtrl.createLike)
router.delete('/likes/unlike/url/:rid',likeCtrl.unlikeURL)
router.delete('/likes/unlike/file/:fid',likeCtrl.unlikeFile)


module.exports = router;
