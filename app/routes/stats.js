const express = require('express');
const router = express.Router();

import parse from '../parser/user';
import stats from '../stats/stats';
import cache from '../cache';
import constants from '../constants';

router.get('/:platform/:region/:tag/:action', (req, res) => {
  
  const platform = req.params.platform;
  const region = req.params.region;
  const tag = req.params.tag;
  const action = req.params.action;

  const cacheKey = `user_${platform}_${region}_${tag}`;

  cache.getOrSet(cacheKey, constants.timeout, getUser, function(data) {
    if (data.statusCode) {
      res.status(data.response.statusCode).send(data.response.statusMessage);
    } else {
      if(action == 'json') {
        res.json(data);
      }
      else {
        var message = stats(action, data);
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