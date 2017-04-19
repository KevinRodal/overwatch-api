var utils = require('../utils.js');

module.exports = {
	
	getSkillRating: function(user) {
		var sr = user.competitive.rank;

		// NOTE: Will have to figure out what happens if unranked?
		var rank = 'Bronze';
		if(sr >= 4000){ rank = 'Grandmaster'; }
		else if(sr >= 3500){ rank = 'Master'; }
		else if(sr >= 3000){ rank = 'Diamond'; }
		else if(sr >= 2500){ rank = 'Platinum'; }
		else if(sr >= 2000){ rank = 'Gold'; }
		else if(sr >= 1500){ rank = 'Silver'; }

		return sr + ' [' + rank + ']';
	},

	getWinLossTie: function(user) {
		var compGameStats = user.games.competitive;
		var etcGameStats = user.stats.miscellaneous.competitive;
		var win = compGameStats.wins;
		var loss = null;
		var tie = null;

		for(var i = 0; i < etcGameStats.length; ++i) {
			var stat = etcGameStats[i];
			if(stat.title == 'Games Tied') {
				tie = stat.value;
			}
			if(stat.title == 'Games Lost') {
				loss = stat.value;
			}
		}

		if(win != null && loss != null && tie != null) {
			// message = plurlUsername + ' win-loss for Season ' + season + ' is ' + win + '-' + loss;
			return win + '-' + loss + '-' + tie;
		}
		return null;
	},

	getRandomStat: function(user) {
		var combatStats = user.stats.combat.competitive;
		var deathStats = user.stats.deaths.competitive;
		var matchAwardStats = user.stats.match_awards.competitive;
		var assistStats = user.stats.assists.competitive;
		var averageStats = user.stats.average.competitive;
		var miscStats = user.stats.miscellaneous.competitive;
		var bestStats = user.stats.best.competitive;
		var gameStats = user.stats.game.competitive;

		var categoryValue = utils.getRandomInt(0, 8);
		var category = combatStats;

		switch(categoryValue) {
			case 0: category = combatStats; break;
			case 1: category = deathStats; break;
			case 2: category = matchAwardStats; break;
			case 3: category = assistStats; break;
			case 4: category = averageStats; break;
			case 5: category = miscStats; break;
			case 6: category = bestStats; break;
			case 7: category = gameStats; break;
		}

		var categoryLength = category.length;
		var randomStatIndex = utils.getRandomInt(0, categoryLength);
		var randomStat = category[randomStatIndex];
		var stat = randomStat.value + ' ' + randomStat.title;
		return stat;
	},

	getLeastPlayedHero: function(user) {
		var topHeroes = user.stats.top_heroes.competitive;
		topHeroes.reverse();
		var theHero = topHeroes[0];

		return theHero.hero;
	}

}