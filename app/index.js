import index from './routes/index';
import profile from './routes/profile';
import stats from './routes/stats';
import nightbot from './routes/nightbot';
import random from './routes/random';
import echo from './routes/echo';
import badRequest from './routes/badRequest';


export default function(app) {
	var bodyParser = require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use('/', index);
	app.use('/profile', profile);
	app.use('/stats', stats);
	app.use('/nightbot', nightbot);
	app.use('/random', random);
	app.use('/stats', stats);
	app.use('/echo', echo);
	app.use('*', badRequest);
}
