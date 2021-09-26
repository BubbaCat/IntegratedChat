const router = require('express').Router();
const { index, create, messages, deleteChat, imageUpload, addUserToGroup, leaveCurrentChat } = require('../controllers/chatController');
const { auth } = require('../middleware/auth');
//const { chatFile } = require('../middleware/fileUpload');

router.get('/', [auth], index);
router.get('/messages', [auth], messages);
router.post('/create', [auth], create);

module.exports = router;