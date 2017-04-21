var utils = require('./utils.js');

var composeJoke = function(question, answer) {
	return {
		question: question,
		answer: answer
	};
};

var jokes = [
	composeJoke('Why is Mercy the top support?', 'Because she has high heals!'),
	composeJoke('What did Pharah say during the hail storm?', 'Just ice rains from above!'),
	composeJoke('What did Zenyatta say when Tracer asked if he had something in his eye?', 'Yes, it\'s in the iris'),
	composeJoke('Tracer, D.Va and Mei walk into a bar.', 'Only Mei walks out...'),
	composeJoke('What\'s a more appropriate name for Ana\'s ultimate?', 'Nanaboost!'),
	composeJoke('Why didn\'t Zarya get in front of the rest of her team?', 'She was Russian, and everyone else was Stalin.'),
	composeJoke('Why is capture the flag Mccree\'s favorite game mode?', 'Because every round ends in a draw.'),
	composeJoke('What do you call a Mercy that only pockets a Roadhog?', 'A Hogpocket :D'),
	composeJoke('How did Widowmaker describe an assassination in Mexico?', 'Juan shot, Juan kill.'),
	composeJoke('Why did McCree invite Reinhardt to his birthday party?', 'Because he was a fan of hammers.'),
	composeJoke('Why is Lúcio no aloud in the produce section?', 'He always drops the beets.'),
	composeJoke('Reinhardt, Roadhog, and Winston walk into a bar.', 'Torbjorn walks under it.'),
	composeJoke('Is Zarya\'s hair color natural?', 'Yes, because heroes never dye!'),
	composeJoke('What did everyone think about Reinhardt\'s ult?', 'The enemy team didn\'t like it, but the ground was cracking up.'),
	composeJoke('Why doesn\'t Junkrat eat Taco Bell?', 'Too much fire in the hole.'),
	composeJoke('Why isn\'t Widow maker talking to Torbjorn?', 'They just don\'t see thigh to eye.'),
	composeJoke('How come Soldier: 76 understands Bastion?', 'Bastion uses Morris\' code.'),
	composeJoke('Why was Winston disappointed when Ana used her ultimate on him?', 'He thought she said "nanner boost"')
];

module.exports = {

	season: 4,
	jokes: jokes,
	timeout: 60 * 5, // 5 minutes
	jokeDelayTime: 1000 * 10, // 10 seconds

}