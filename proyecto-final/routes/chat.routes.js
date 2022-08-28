const { iniciarChatController } = require('../controllers/foros.controller');
const express = require('express');
const { Router } = express;
const router = Router();

router.get("/chat", iniciarChatController);

module.exports = router;