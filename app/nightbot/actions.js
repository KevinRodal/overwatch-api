export default function(action, user) {
	var utils = require('../utils.js');
	var constants = require('../constants.js');
	var stats = require('../stats/processStats.js');

	var lowerAction = action.toLowerCase();

	var message = 'The action "' + action + '" was not recognized';
	if(lowerAction == 'skillrating') {
		message = skillRating(user);
	}
	if(lowerAction == 'sr') {
		message = stats.getSkillRating(user);
	}
	if(lowerAction == 'winloss') {
		message = winLoss(user);
	}
	if(lowerAction == "topheroes") {
		message = topHeroes(user);
	}
	if(lowerAction == 'randomstat') {
		message = randomStat(user);
	}
	if(lowerAction == 'randomhero') {
		message = randomHero(user);
	}
	if(lowerAction == 'leastplayedhero') {
		message = leastPlayedHero(user);
	}

	return message;

	function skillRating(user) {
		var sr = stats.getSkillRating(user);
		var username = user.username;
		
		// TODO: test string replace in message
		// var msg = '{username} current skill rating is {sr} [{rank}]';
		var message = 'When ' + username + ' last started streaming his skill rating was ' + sr;
		return message;
	}

	function winLoss(user) {
		var username = user.username;
		var winLossTie = stats.getWinLossTie(user);

		var message = 'Data not available for ' + username + ' win-loss-tie at this time';
		if(winLossTie != null) {
			message = 'When ' + username + ' last started streaming he was ' + winLossTie + ' in Season ' + constants.season;
		}
		return message;
	}

	function topHeroes(user) {
		var mostPlayedCount = 3;
		var plurlUsername = utils.getPlurlUsernameFromUser(user);

		var topHeroes = user.stats.top_heroes.competitive;

		var message = 'Data not available for ' + plurlUsername + ' most played heros at this time';
		if(topHeroes != null && topHeroes.length >= mostPlayedCount) {
			message = plurlUsername + ' top 3 heroes in Season ' + constants.season + ' are:';
			for(var i = 0; i < mostPlayedCount; ++i) {
				message += '  (' + (i+1) + ') ' + topHeroes[i].hero + ': ' + topHeroes[i].played; 
			}
		}

		return message;
	}

	function randomStat(user) {
		var username = user.username;
		var stat = stats.getRandomStat(user);

		var message = 'In Season ' + constants.season + ', ' + username + ' has ' + stat;
		return message;
	}

	function randomHero(user) {
		var heros = user.stats.top_heroes.quickplay;
		var heroIndex = utils.getRandomInt(0, heros.length);
		var hero = heros[heroIndex];

		var message = 'Hero = ' + hero.hero;

		return message;
	}

	function leastPlayedHero(user) {
		var username = user.username;
		var hero = stats.getLeastPlayedHero(user);

		var message = 'Get ' + username + ' to play ' + hero + ' ;D';
		return message;
	}
}