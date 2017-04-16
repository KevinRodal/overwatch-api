const cheerio = require('cheerio');
const rp = require('request-promise');

export default function(platform, region, tag, cb) {

  const url = platform === 'pc'
    ? `https://playoverwatch.com/en-us/career/${platform}/${region}/${tag}`
    : `https://playoverwatch.com/en-us/career/${platform}/${tag}`;

  const options = {
    uri: encodeURI(url),
    encoding: 'utf8'
  }

  rp(options).then((htmlString) => {

    // Begin html parsing.
    const $ = cheerio.load(htmlString);
    const user = $('.header-masthead').text();
    const level = $('.player-level div').first().text();
    const portrait = $('.player-portrait').attr('src');
    const won = {};
    const played = {};
    const time = {};

    let compRank;
    let compRankImg;
    let star = '';

    const quickplayWonEl = $('#quickplay td:contains("Games Won")').next().html();
    const quickplayPlayedEl = $('#quickplay td:contains("Games Played")').next().html();
    const quickplayTimePlayedEl = $('#quickplay td:contains("Time Played")').next().html();

    const compWonEl = $('#competitive td:contains("Games Won")').next().html();
    const compPlayedEl = $('#competitive td:contains("Games Played")').next().html();
    const compTimePlayedEl = $('#competitive td:contains("Time Played")').next().html();
    const compRankEl = $('.competitive-rank');

    const levelFrame = $('.player-level').attr('style').slice(21, 109);
    const starEl = $('.player-level .player-rank').html();

    if (compRankEl !== null) {
      compRankImg = $('.competitive-rank img').attr('src');
      compRank = $('.competitive-rank div').html();
    }

    if (quickplayWonEl !== null) {
      won.quickplay = quickplayWonEl.trim().replace(/,/g, '');
    }

    if (quickplayPlayedEl !== null) {
      played.quickplay = quickplayPlayedEl.trim().replace(/,/g, '');
    }

    if (quickplayTimePlayedEl !== null) {
      time.quickplay = quickplayTimePlayedEl.trim().replace(/,/g, '');
    }

    if (compWonEl !== null) {
      won.competitive = compWonEl.trim().replace(/,/g, '');
    }

    if (compPlayedEl !== null) {
      played.competitive = compPlayedEl.trim().replace(/,/g, '');
    }

    if (compTimePlayedEl !== null) {
      time.competitive = compTimePlayedEl.trim().replace(/,/g, '');
    }

    if (starEl !== null) {
      star = $('.player-level .player-rank').attr('style').slice(21, 107);
    }

    //
    // STATS
    //
    const stats = {};

    //
    // Top Heroes.
    //
    // Quickplay.
    const quickplayTopHeroesEls = $('#quickplay [data-category-id="overwatch.guid.0x0860000000000021"]')
      .find('.progress-category-item');
    let quickplayTopHeroes = [];
    quickplayTopHeroesEls.each(function(i, el) {
      const stat = {};
      stat.hero = $(this).find('.title').text();
      stat.played = $(this).find('.description').text();
      stat.img = $(this).find('img').attr('src');
      quickplayTopHeroes.push(stat);
    });
    stats['top_heroes'] = { quickplay: [] };
    stats['top_heroes']['quickplay'] = quickplayTopHeroes;

    // Competitive.
    const compTopHeroesEls = $('#competitive [data-category-id="overwatch.guid.0x0860000000000021"]')
      .find('.progress-category-item');
    let compTopHeroes = [];
    compTopHeroesEls.each(function(i, el) {
      const stat = {};
      stat.hero = $(this).find('.title').text();
      stat.played = $(this).find('.description').text();
      stat.img = $(this).find('img').attr('src');
      compTopHeroes.push(stat);
    });
    stats['top_heroes']['competitive'] = [];
    stats['top_heroes']['competitive'] = compTopHeroes;

    //
    // Career Stats
    //
    const statCategories = [
      'Combat',
      'Deaths',
      'Match Awards',
      'Assists',
      'Average',
      'Miscellaneous',
      'Best',
      'Game'
    ];

    // Quickplay Stats.
    statCategories.forEach(function(item) {
      const els = $(`#quickplay [data-category-id="0x02E00000FFFFFFFF"] span:contains("${item}")`).closest('table').find('tbody tr');
      let statsArr = [];
      els.each(function(i, el) {
        let stat = {};
        stat.title = $(this).find('td').first().text();
        stat.value = $(this).find('td').next().text();
        statsArr.push(stat);
      });
      item = item.replace(' ', '_').toLowerCase();
      stats[item] = { quickplay: [] };
      stats[item]['quickplay'] = statsArr;
    });

    // Competitive Stats.
    statCategories.forEach(function(item) {
      const els = $(`#competitive [data-category-id="0x02E00000FFFFFFFF"] span:contains("${item}")`).closest('table').find('tbody tr');
      let statsArr = [];
      els.each(function(i, el) {
        let stat = {};
        stat.title = $(this).find('td').first().text();
        stat.value = $(this).find('td').next().text();
        statsArr.push(stat);
      });
      item = item.replace(' ', '_').toLowerCase();
      stats[item]['competitive'] = [];
      stats[item]['competitive'] = statsArr;
    });


    const json = {
      username: user,
      level: parseInt(level),
      portrait: portrait,
      games: {
        quickplay: { wins: won.quickplay, played: played.quickplay },
        competitive: { wins: won.competitive, played: played.competitive },
      },
      playtime: { quickplay: time.quickplay, competitive: time.competitive },
      competitive: { rank: compRank, rank_img: compRankImg },
      levelFrame: levelFrame,
      star: star,
      stats: stats
    }

    cb(json);
  }).catch(err => {
    cb(err);
  });
}
