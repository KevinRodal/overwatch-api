export default function(action, user) {
	var constants = require('../constants.js');
	var stats = require('../stats/processStats.js');

	var actions = {
		skillrating: stats.getSkillRating,
		leastplayedhero: stats.getLeastPlayedHero,
		winlosstie: stats.getWinLossTie,
		season: function(){
			return 'Season ' + constants.season;
		}
	};

	var lowerAction = action.toLowerCase();

	var fAction = actions[lowerAction];
	if(fAction == null) {
		return 'The action "' + action + '" was not recognized';
	}
	return fAction(user);
}