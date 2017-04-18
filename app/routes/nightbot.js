const express = require('express');
const router = express.Router();

import parse from '../parser/user';
import actions from '../nightbot/actions'
import cache from '../cache';

router.get('/:platform/:region/:tag/:action', (req, res) => {

  console.log(req.headers);

  const action = req.params.action;
  const platform = req.params.platform;
  const region = req.params.region;
  const tag = req.params.tag;

  const cacheKey = `nightbot_${platform}_${region}_${tag}`;
  const timeout = 60 * 5; // 5 minutes.

  cache.getOrSet(cacheKey, timeout, getUser, function(data) {
    if (data.statusCode) {
      res.status(data.response.statusCode).send(data.response.statusMessage);
    } else {
      if(action == 'json') {
        res.json(data);
      }
      else {
        var message = actions(action, data);
        res.send(message);
      }
    }
  });

  function getUser(callback) {
    parse(platform, region, tag, (data) => {
        callback(data);
    });
  }
});

export default router;