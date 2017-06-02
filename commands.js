var pre;
const fs = require('fs'),
      Discord = require('discord.js'),
      bot = new Discord.Client(),
      unirest = require('unirest'),
      request = require('request'),
      leet = require('leet'),
      chance = require('chance').Chance(),
      wa = require("./wolfram_plugin"),
      wolfram_plugin = new wa(),
      info = require('./config/YourInformation'),
      timestamp = new Date()/1000,
      util = require('util'),
      Gamedig = require('gamedig'),
      meme = {
          "brace": 61546,
          "mostinteresting": 61532,
          "fry": 61520,
          "onedoesnot": 61579,
          "yuno": 61527,
          "success": 61544,
          "allthethings": 61533,
          "doge": 8072285,
          "drevil": 40945639,
          "skeptical": 101711,
          "notime": 442575,
          "yodawg": 101716,
          "awkwardpenguin": 61584,
          "woodandbuzz": 347390,
          "noneofmy": 16464531,
          "badluck": 61585,
          "grumpy": 405658,
          "whatif": 100947,
          "gf": 100952
          };
var keyserv = Object.keys(info.servers);
var cmds = module.exports = {
hi:{
    "usage":"hi",
    "desc":"Responds with Hello",
    "perm":0,
    "process":function(msg, sfx, param, bot, log, pre) {
        msg.reply("Hello!");
    }
},
help:{
    "usage":"help",
    "perm":0,
    "desc":"Get "+info.botname+"'s command list",
},
say:{
    "usage":"say <message>",
    "desc":"Make "+info.botname+" say a phrase",
    "perm":0,
    "process":function(msg, sfx, param, bot, log, pre) {
         msg.delete();
         msg.channel.sendMessage(sfx);
    }
},
hug:{
    "usage":"hug <@user>",
    "desc": "Hug your Best Friend :hugging:",
    "perm":0,
    "process":function(msg, sfx, param, bot, log, pre) {
      msg.delete();
        var tohug = param[0]
        var i = (Math.floor((Math.random() * 7) + 0));
        var hug = ["https://giphy.com/gifs/hug-lidOBoOGEiOkM","https://giphy.com/gifs/hug-karneval-yziFo5qYAOgY8","https://giphy.com/gifs/animated-cute-13YrHUvPzUUmkM","https://giphy.com/gifs/love-animation-hug-apcKda9LY1XZS","https://giphy.com/gifs/hugging-jsyBSRFQDY6gU","https://giphy.com/gifs/hug-hugging-huging-NIZKr6XAQWhJC"];
        msg.channel.sendMessage("<@"+msg.author.id+"> hugs "+tohug+" "+hug[i]+"")
        .then(m => m.delete(10000)).catch(console.log);
    }
},
cat:{
    "usage":"cat <png, jpg, gif, or nothing for random>",
    "desc":"Get a random cat",
    "perm":0,
    "process":function(msg, sfx, param, bot, log, pre) {
        msg.delete();
        if (param[0] === "gif") {
            var r = request.get('http://thecatapi.com/api/images/get.php/gif.php?type=gif', function (err, res, body) {
            msg.reply(r.uri.href);
            });
        } else if (param[0] === "jpg") {
            var r1 = request.get('http://thecatapi.com/api/images/get.php/jpg.php?type=jpg', function (err, res, body) {
                msg.reply(r1.uri.href);
            });
        } else if (param[0] === "png") {
            var r2 = request.get('http://thecatapi.com/api/images/get.php/png.php?type=png', function (err, res, body) {
                msg.reply(r2.uri.href);
            });
        } else {
            var r3 = request.get('http://thecatapi.com/api/images/get', function (err, res, body) {
                msg.reply(r3.uri.href);
            });
         }
    }
},
botnick:{
    "usage":"botnick <nick>",
    "desc":"Used to change "+info.botname+"'s Nickname",
    "perm":10,
    "process":function(msg, sfx, param, bot, log, pre) {
            msg.guild.member(bot.user).setNickname(sfx);
    }
},
nick:{
    "usage":"nick <nick>",
    "desc":"Change your nickname",
    "perm":0,
    "process":function(msg, sfx, param, bot, log, pre) {
         msg.member.setNickname(sfx);
         msg.reply("Your nickname has been changed to "+sfx+"\n Will not work if your role is higher than mine.")
       .then(m => m.delete(10000)).catch(console.log);
    }
},
cb:{
  "usage":"cb <message>",
  "desc":"Talk with Cleverbot",
  "perm":0,
  "process":function(msg, sfx, param, bot, log, pre) {
    var Cleverbot = require('cleverbot-node');
    var cleverbot = new Cleverbot();
    Cleverbot.prepare(function(){
    cleverbot.write(sfx, function (response) {
    msg.channel.sendMessage("CleverBot: "+response.message);
     });
   });
  }
},
spank:{
  "usage":"spank <@user>",
  "desc":"No need to explain",
  "perm":0,
  "process":function(msg, sfx, param, bot, log, pre) {
    msg.channel.sendMessage(param[0]+", bend over bitch and accept your punishment\nhttp://30.media.tumblr.com/tumblr_m0azcvP1L41qbs05mo2_500.gif")
    .then(m => m.delete(10000)).catch(console.log);
    msg.delete();
  }
},
google:{
  "usage":"google <message>",
  "desc":"Let me google that for you",
  "perm":0,
  "process":function(msg, sfx, param, bot, log, pre) {
    var outputm = sfx.replace(/\s/g, "+");
    msg.channel.sendMessage("http://lmgtfy.com/?q="+outputm);
  }
},
quote:{
  "usage":"quote",
  "desc":"Get a random quote",
  "perm":0,
  "process":function(msg, sfx, param, bot, log, pre) {
    var x = Math.floor(Math.random() * (1 - 0 + 1) + 0);
    console.log(x);
    var cat = ["movies", "famous"];
    var these = cat[x];
 unirest.post("https://andruxnet-random-famous-quotes.p.mashape.com/?cat="+these)
    .header("X-Mashape-Key", "h6ACHMfAK4mshORsEYws7uaqJSV6p1lt50gjsnQKmDOfEwBWjo")
    .header("Content-Type", "application/x-www-form-urlencoded")
    .header("Accept", "application/json")
    .end(function (result) {
     var txt = JSON.parse(result.body);

     msg.channel.sendMessage("\""+txt.quote+"\"\n~ "+txt.author)
     .then(m => m.delete(10000)).catch(console.log);
  });
  }
},
game:{
  "usage":"game",
  "desc":"Set "+info.botname+"'s game",
  "perm":10,
  "process":function(msg, sfx, param, bot, log, pre) {
      bot.user.setStatus(null, sfx);
  }
},
purge:{
  "usage":"purge <1-100>",
  "desc":"Purge 1-100 message",
  "perm":1,
  "process":function(msg, sfx, param, bot, log, pre) {
    var channel = msg.channel;
    var user = "<@!"+msg.author.id+">";
    var channelname = msg.channel.name;
         if (param[0] === undefined || param[0] > 100 || param[0] < 1) {
            msg.reply("Please provide a number between 1-100");
         } else {
             var messagecount = parseInt(param[0]);
             channel.fetchMessages({limit: messagecount})
                .then(messages => msg.channel.bulkDelete(messages)).catch(console.log);
             msg.channel.sendMessage(user+" cleared "+messagecount+" messages in "+channelname)
                .then(m => m.delete(3000)).catch(console.log);
        }
    }
},
stats:{
  "usage":"stats",
  "desc":"Get "+info.botname+"'s stats and info",
  "perm":0,
  "process":function(msg, sfx, param, bot, log, pre) {
    msg.channel.sendMessage("```css\nStatistics: \n• Servers   : "+bot.guilds.size+"\n• Users     : "+bot.users.size+"\n• Usage     : "+process.memoryUsage().rss / 1024 / 1024+" MB\n• Channels  : "+bot.channels.size+"```")
    .then(m => m.delete(10000)).catch(console.log);
  }
},
number:{
  "usage":"number <number>",
  "desc":"Get a fact about an inputed number",
  "perm":0,
  "process":function(msg, sfx, param, bot, log, pre) {
    var numin = param[0]
    var num = request('http://numbersapi.com/'+numin, function (err, res, body) {
        msg.reply(body)
        .then(m => m.delete(10000)).catch(console.log);
    });
  }
},
prune:{
  "usage":"prune <number>",
  "desc":"Prune messages sent by "+info.botname+"",
  "perm":1,
  "process":function(msg, sfx, param, bot, log, pre) {
    let messagecount = parseInt(param[0]) ? parseInt(param[0]) : 1;
    msg.channel.fetchMessages({limit: 100})
    .then(messages => {
      let msg_array = messages.array();
      msg_array = msg_array.filter(m => m.author.id === bot.user.id);
      msg_array.length = messagecount + 1;
      msg_array.map(m => m.delete().catch(console.error));
     });
  }
},
meme:{
  "usage":"meme <template> \"<top text>\" \"<bottom text>\"",
  "desc":"Available template: `"+Object.keys(meme)+"`",
  "perm":0,
  "process":function(msg, sfx, param, bot, log, pre) {
    var tags = msg.content.split('"');
    var memetype = param[0]
            var Imgflipper = require("imgflipper");
            var imgflipper = new Imgflipper(info.flipuser, info.flippass);
            imgflipper.generateMeme(meme[memetype], tags[1]?tags[1]:"", tags[3]?tags[3]:"", function(err, image){
              if (err) {
                msg.channel.sendMessage("Please format your memes as follows. "+pre+"meme doge \"toptext\" \"bottomtext\"")
                return;
              }
                msg.channel.sendMessage(image);
            });
  }
},
leet:{
  "usage":"leet <message>",
  "desc":"Convert text to l33t sp34k",
  "perm":0,
  "process":function(msg, sfx, param, bot, log, pre) {
    msg.channel.sendMessage(leet.convert(sfx));
  }
},
myid:{
  "usage":"myid",
  "desc":"Get your id",
  "perm":0,
  "process":function(msg, sfx, param, bot, log, pre) {
    msg.channel.sendMessage(msg.author.id);
  }
},
perm:{
  "usage":"perm <@user>",
  "desc":"Get a list of every permission a user has",
  "perm":1,
  "process":function(msg, sfx, param, bot, log, pre) {
    function resolveUser(msgContext,usertxt){
	     var userid = usertxt;
	      if(sfx.startsWith('<@')){
		        userid = usertxt.substr(2,usertxt.length-3);
	         }
	          var user = msg.channel.guild.members.get(userid);
	                        return user;
                        }
                        var user = resolveUser(msg,sfx);
                        console.log(user)
		  try {
        msg.channel.sendMessage("permissions of " + user + ':\n' + util.inspect(msg.guild.member(user).permissions.serialize()));
      } catch(err) {
        msg.channel.sendMessage("The User Has A Higher Role Than Mine.")
      }
  }
},
wolfram:{
  "usage":"wolfram <query>",
  "desc":"Get information from wolfram alpha, The Way This Command Works Can Be Spammy",
  "perm":1,
  "process":function(msg, sfx, param, bot, log, pre) {
      msg.channel.sendMessage("*Querying Wolfram Alpha...*").then(message => {
        wolfram_plugin.respond(sfx,msg.channel,bot,message);
      });
  }
},
support:{
  "usage":"support <subject> <body>",
  "desc":"Write a support ticket to the Technical Support Channel for staff to look over",
  "perm":0,
  "process":function(msg, sfx, param, bot, log, pre) {
    msg.delete();
    if (!param[0] || !param[1]) {
      msg.channel.sendMessage("Please Format Your Request as Follows, `"+pre+"support <subject> <body>`");
      return;
    }
    var msgSupport = [];
    msgSupport.push("**| Support Request.**\n")
    msgSupport.push("**| Author**: <@"+msg.author.id+">\n")
    msgSupport.push("**| Subject**: "+param[0]+"\n")
    param.shift();
    var supported = param.join(' ');
    msgSupport.push("**|** "+supported)
    bot.channels.get(info.support).sendMessage(msgSupport)
  }
},
xkcd:{
  "usage":"xkcd <number>",
  "desc":"Displays a given xkcd comic number",
  "perm":0,
  "process":function(msg, sfx, param, bot, log, pre) {
    var url = "http://xkcd.com/";
			if(sfx != "") url += sfx+"/";
			url += "info.0.json";
			require("request")(url,function(err,res,body){
				try{
					var comic = JSON.parse(body);
					msg.channel.sendMessage(
						comic.title+"\n"+comic.img,function(){
							msg.channel.sendMessage(comic.alt)
					});
				}catch(e){
					msg.channel.sendMessage(
						"Couldn't fetch an XKCD for "+suffix);
				}
			});
		}
  },
website:{
  "usage":"website",
  "desc":"Community's Website Link",
  "perm":0,
  "process":function(msg, sfx, param, bot, log, pre) {
    msg.channel.sendMessage(info.website)
  }
},
forum:{
  "usage":"forum",
  "desc":"Community's Forum Link",
  "perm":0,
  "process":function(msg, sfx, param, bot, log, pre) {
    msg.channel.sendMessage(info.forum)
  }
},
donate:{
  "usage":"website",
  "desc":"Community's Donation Link",
  "perm":0,
  "process":function(msg, sfx, param, bot, log, pre) {
    msg.channel.sendMessage(info.donate)
  }
},
servers:{
  "usage":"servers",
  "desc":"Get information about our current servers",
  "perm":0,
  "process":function(msg, sfx, param, bot, log, pre) {
    var msgServer = [];
    var allservers = Object.keys(info.servers);
    msgServer.push("**------------------**")
    for (y=0;y<Object.keys(info.servers).length;y++) {
    msgServer.push("**Pack: **"+info.servers[allservers[y]].pack);
    msgServer.push("**Version: **"+info.servers[allservers[y]].ver);
    msgServer.push("**IP: **"+info.servers[allservers[y]].ip);
    msgServer.push("**------------------**");
    }
    msg.channel.sendMessage(msgServer, {split:true});
  }
},
ip:{
  "usage":"ip",
  "desc":"Get the ip of each server",
  "perm":0,
  "process":function(msg, sfx, param, bot, log, pre) {
    var msgIp = [];
    var allservers = Object.keys(info.servers);
    msgIp.push("**------------------**")
    for (t=0;t<Object.keys(info.servers).length;t++) {
    msgIp.push("**Server: **"+info.servers[allservers[t]].pack);
    msgIp.push("**IP: **"+info.servers[allservers[t]].ip);
    msgIp.push("**------------------**")
    }
    msg.channel.sendMessage(msgIp, {split:true});
  }
}
}
