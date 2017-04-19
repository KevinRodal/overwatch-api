import index from './routes/index';
import profile from './routes/profile';
import stats from './routes/stats';
import nightbot from './routes/nightbot';
import random from './routes/random';
import badRequest from './routes/badRequest';

export default function(app) {
  app.use('/', index);
  app.use('/profile', profile);
  app.use('/stats', stats);
  app.use('/nightbot', nightbot);
  app.use('/random', random);
  app.use('/stats', stats)
  app.use('*', badRequest);
}
