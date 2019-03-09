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
router.get('/urls/my/count', urlCtrl.getMyURLsCount);
router.get('/urls/my/limit', urlCtrl.getMyLimitURLs);
router.get('/urls/other/limit/:uid', urlCtrl.getOtherLimitURLs);
router.get('/urls/other/count/:uid', urlCtrl.getOtherURLsCount);
router.post('/urls/url', urlCtrl.createURL)

router.get('/files/file/:id', fileCtrl.getFileById);
router.get('/files/home', fileCtrl.getHomeFiles);
router.get('/files/count', fileCtrl.getCountFiles);
router.get('/files/limit', fileCtrl.getLimitFiles);
router.get('/files/my/public/count', fileCtrl.getMyPublicFilesCount);
router.get('/files/my/private/count', fileCtrl.getMyPrivateFilesCount);
router.get('/files/my/public/limit', fileCtrl.getMyPublicLimitFiles);
router.get('/files/my/private/limit/', fileCtrl.getMyPrivateLimitFiles);
router.get('/files/other/public/limit/:uid', fileCtrl.getOtherPublicLimitFiles);
router.get('/files/other/public/count/:uid', fileCtrl.getOtherPublicFilesCount);
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
