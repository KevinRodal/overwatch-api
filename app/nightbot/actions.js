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
		var message = 'When ' + username + ' started streaming his skill rating was ' + sr + ' [' + rank + ']';
		return message;
	}

	function winLoss(user){
		var username = user.username;
		// var plurlUsername = getPlurlUsernameFromUser(user);

		var compGameStats = user.games.competitive;
		var win = compGameStats.wins;
		var total = compGameStats.played;
		
		var message = 'Data not available for ' + plurlUsername + ' win-loss at this time';
		if(win != null && total != null) {
			var loss = total - win;
			// message = plurlUsername + ' win-loss for Season ' + season + ' is ' + win + '-' + loss;
			message = 'When ' + username + ' started streaming his win-loss for Season ' + season + ' was ' + win + '-' + loss;
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
				message += '\n > ' + topHeroes[i].hero + ': ' + topHeroes[i].played; 
			}
		}

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

	function stackTrace() {
	    var err = new Error();
	    console.log(err.stack);
	}
}