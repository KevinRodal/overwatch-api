export default function(action, user) {
	var lowerAction = action.toLowerCase();
	var season = 4; // TODO: Get this from somewhere

	var message = 'The action "' + action + '" was not recognized';
	if(lowerAction == 'skillrating') {
		message = skillRating(user);
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

	return message;

	function skillRating(user){
		var username = user.username;
		// var plurlUsername = getPlurlUsernameFromUser(user);
		var sr = user.competitive.rank;

		// NOTE: Will have to figure out what happens if unranked?
		var rank = 'Bronze';
		if(sr >= 4000){ rank = 'Grandmaster'; }
		else if(sr >= 3500){ rank = 'Master'; }
		else if(sr >= 3000){ rank = 'Diamond'; }
		else if(sr >= 2500){ rank = 'Platinum'; }
		else if(sr >= 2000){ rank = 'Gold'; }
		else if(sr >= 1500){ rank = 'Silver'; }

		
		// TODO: test string replace in message
		// var msg = '{username} current skill rating is {sr} [{rank}]';
		// var message = plurlUsername + ' current skill rating is ~' + sr + ' [' + rank + ']';
		var message = 'When ' + username + ' last started streaming his skill rating was ' + sr + ' [' + rank + ']';
		return message;
	}

	function winLoss(user){
		var username = user.username;
		// var plurlUsername = getPlurlUsernameFromUser(user);

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
		
		var message = 'Data not available for ' + username + ' win-loss-tie at this time';
		if(win != null && loss != null && tie != null) {
			// message = plurlUsername + ' win-loss for Season ' + season + ' is ' + win + '-' + loss;
			message = 'When ' + username + ' last started streaming he was ' + win + '-' + loss + '-' + tie + ' in Season ' + season;
		}
		return message;
	}

	function topHeroes(user) {
		var mostPlayedCount = 3;
		var plurlUsername = getPlurlUsernameFromUser(user);

		var topHeroes = user.stats.top_heroes.competitive;

		var message = 'Data not available for ' + plurlUsername + ' most played heros at this time';
		if(topHeroes != null && topHeroes.length >= mostPlayedCount) {
			message = plurlUsername + ' top 3 heroes in Season ' + season + ' are:';
			for(var i = 0; i < mostPlayedCount; ++i) {
				message += '  (' + (i+1) + ') ' + topHeroes[i].hero + ': ' + topHeroes[i].played; 
			}
		}

		return message;
	}

	function randomStat(user) {
		var username = user.username;

		var combatStats = user.stats.combat.competitive;
		var deathStats = user.stats.deaths.competitive;
		var matchAwardStats = user.stats.match_awards.competitive;
		var assistStats = user.stats.assists.competitive;
		var averageStats = user.stats.average.competitive;
		var miscStats = user.stats.miscellaneous.competitive;
		var bestStats = user.stats.best.competitive;
		var gameStats = user.stats.game.competitive;

		var categoryValue = getRandomInt(0, 8);
		var category = combatStats;

		switch(categoryValue){
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
		var randomStatIndex = getRandomInt(0, categoryLength);
		var randomStat = category[randomStatIndex];
		var stat = randomStat.value + ' ' + randomStat.title;
		var message = 'In Season ' + season + ', ' + username + ' has ' + stat;

		return message;
	}

	function getPlurlUsernameFromUser(user){
		var username = user.username;
		var lastLetter = username[username.length - 1];
		var plurl = "'s";
		if(lastLetter.toLowerCase() == 's'){
			plurl = "'";
		}
		return username + plurl;
	}

	function getRandomInt(min, max) {
		min = Math.floor(min);
	  	max = Math.floor(max);
	  	return Math.floor(Math.random() * (max - min)) + min;
	}

	function stackTrace() {
	    var err = new Error();
	    console.log(err.stack);
	}
}