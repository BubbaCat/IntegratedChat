const router = require('express').Router();

router.get('/home',(req,res,next)=>{
	res.send('home');
})

router.use('/', require('./auth'));
//router.use('/chats', require('./chat'));
router.use('/settings', require('./settings'));

module.exports = router;