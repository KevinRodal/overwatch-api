const express = require('express');
const router = express.Router();

import random from '../random/random';

router.get('/:action', (req, res) => {
  const action = req.params.action;
  const headers = req.headers;
  var message = random(action, headers);
  res.send(message);
});

export default router;