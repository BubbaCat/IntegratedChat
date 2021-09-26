const router = require('express').Router()
const { updateSettings, getSettings } = require('../controllers/settingsController')
const { validate } = require('../validators')
const { auth } = require('../middleware/admin-auth')

router.post('/settings', [auth, validate], updateSettings)
//router.get('/settings', auth, getSettings)

module.exports = router