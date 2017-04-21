export default function(action, headers) {
	var utils = require('../utils.js');
	var constants = require('../constants.js');
	var request = require('request');

	var actions = {
		seagull: getSeagullMessages,
		heroes: getHeroes
	};

	var lowerAction = action.toLowerCase();
	if(lowerAction == 'joke') {
		return getJoke(headers);
	}

	var fAction = actions[lowerAction];
	if(fAction == null) {
		return 'The action "' + action + '" was not recognized';
	}
	var messages = fAction();

	var randomIndex = utils.getRandomInt(0, messages.length);
	return messages[randomIndex];

	function getSeagullMessages() {
		var messages = [
			/* !bastion */ "My favorite character is Bastion. I am learning Binary to play Overwatch on PC with no subtitles, and one day I will move to Silicon Valley to become a PC, so that everyone may play Overwatch on me. Wish me luck in Silicon Valley!",
			/* !bird */ "My favorite character is Bastion's Bird. I am learning Flappy Bird to play Overwatch on my phone, one day I will glue feathers on my skin and perch on my washing machine. Then I will become an actual bird. Wish me luck! Tweet Tweet, Beep Boop!",
			/* !genji */ "My favorite character is Genji. I am learning Japanese to play Overwatch in Japanese with no subtitles, and one day I will move to Japan to become a pro gamer. Wish me luck in Japan!",
			/* !hanzo */ "PogChamp 竜が我が敵を喰らう PogChamp RYUU GA WAGA TEKI WO KURAU PogChamp",
			/* !lucio */ "TriHard OH TriHard LETS TriHard BREAK TriHard IT TriHard DOWN TriHard",
			/* !mei */ "PanicVis 冻住，不许走！ PanicVis Dòng PanicVis zhù PanicVis bùxǔ PanicVis zǒu! PanicVis",
			/* !tire */ "My favourite character is @tire. One day I will change my skin into rubber, eat explosives and roll towards my enemies with a cry of wrath and edgy spikes. Wish me luck!",
			/* !torbjorn */ "My favorite character is Torguebarn. I am learning Norwegian to play Overwatch on PC with no subtitles, and one day I will move to Copenhagen to become a Swedish dwarf like Torbborn Wish me luck in Oslo! AARDWAARK;",
			/* !tracer */ "My least favorite character is Tracer. I am currently learning foreign languages to spread my book of Tracism to riot Blizzard HQ, so i can play Overwatch on PC with no Tracer. One day i will take a trip around the globe to flush out the world of remaining Tracers. Wish me luck!"
		];	

		return messages;
	}

	function getJoke(headers) {
		var jokes = constants.jokes;

		var randomIndex = utils.getRandomInt(0, jokes.length);
		var joke = jokes[randomIndex];

		var callerParamString = headers['nightbot-user'];
		var callerParams = utils.parseHeaderValues(callerParamString);

		var message = joke.question;
		var answer = joke.answer;
		
		var displayName = callerParams.displayName;
		if(displayName != null) {
			message = '@' + displayName + ' ' + message;
			answer = '@' + displayName + ' ' + answer;
		}

		var nightbotPostBack = headers['nightbot-response-url'];
		if(nightbotPostBack != null) {
			var nightbotMessage = {
				message: answer
			}

			setTimeout(function() {				
				request({
					url: nightbotPostBack,
					method: 'POST',
					json: nightbotMessage
				}, function (error, response, body) {
					// console.log(response);
				});
				
			}, constants.jokeDelayTime);
		}		

		return message;
	}

	function getHeroes() {
		var heroes = [ "Mercy", "Lucio", "Zenyatta", "Ana" ];
		return heroes;
	}
}