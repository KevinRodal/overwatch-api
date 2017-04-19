const express = require('express');
const router = express.Router();

import parse from '../parser/user';
import actions from '../nightbot/actions';
import cache from '../cache';
import constants from '../constants';

/* example of Nightbot headers
headers: { 
  host: 'overwatch-nightbot.herokuapp.com',
   connection: 'close',
  'user-agent': 'Nightbot-URL-Fetcher/0.0.3',
  'nightbot-user': 'name=fuzzycevin&displayName=FuzzyCevin&provider=twitch&providerId=76210611&userLevel=owner',
  'nightbot-channel': 'name=fuzzycevin&displayName=FuzzyCevin&provider=twitch&providerId=76210611',
  'nightbot-response-url': 'https://api.nightbot.tv/1/channel/send/TVRRNU1qUTNPRGN5TnpJME1DOTBkMmwwWTJndk5UaGxaVGswWlRNME5HRTVPVFkxWVdFd09HUXdZMlU0TDJGM2N3OjM0NTAxMzk4MTE3YTgzMzdkNTE0NjUyZjcyNGEzMGNjYjMzYzg3MTQzMzk5N2IxMDVmYTAxM2M5MDMzMWQwZGE',
  'x-request-id': '3b5a8890-b08d-45a9-8b96-9f59e4820bf3',
  'x-forwarded-for': '149.56.175.33',
  'x-forwarded-proto': 'https',
  'x-forwarded-port': '443',
  via: '1.1 vegur',
  'connect-time': '1',
  'x-request-start': '1492478727590',
  'total-route-time': '0' 
}
*/

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