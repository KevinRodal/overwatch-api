const express = require('express');
const router = express.Router();

import random from '../random/random';

router.get('/:action', (req, res) => {
  const action = req.params.action;
  var message = random(action);
  res.send(message);
});

export default router;