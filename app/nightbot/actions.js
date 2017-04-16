export default function(action, user) {
	var lowerAction = action.toLowerCase();
	var message = 'The action "' + action + '" was not recognized';
	if(lowerAction == 'skillrating') {
		message = skillRating(user);
	}

	return message;

	function skillRating(user){
		var username = user.username;
		var sr = user.competitive.rank;

		// NOTE: Will have to figure out what happens if unranked?
		var rank = 'Bronze';
		if(sr >= 4000){ rank = 'Grandmaster'; }
		else if(sr >= 3500){ rank = 'Master'; }
		else if(sr >= 3000){ rank = 'Diamond'; }
		else if(sr >= 2500){ rank = 'Platinum'; }
		else if(sr >= 2000){ rank = 'Gold'; }
		else if(sr >= 1500){ rank = 'Silver'; }

		var lastLetter = username[username.length - 1];
		console.log('lastLetter = ' + lastLetter);

		var plurl = "'s";
		if(lastLetter.toLowerCase() == 's'){
			plurl = "'";
		}

		return username + plurl + ' current skill rating is ' + sr + ' [' + rank + ']';
	}
}