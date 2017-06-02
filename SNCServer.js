/* DO NOT REMOVE THIS */
    /* global pre */
    /* global log*/
    /* global i */
    /* global repo */
    /* global moment */
    /* global sched */
	  /* global wa */
    /* global wolfram_plugin */




const Discord = require("discord.js"),
    ChatLog = require("./config/logger.js").ChatLog,
    Logger = require("./config/logger.js").Logger,
    version = require("./package.json").version,
    VersionChecker = require("./config/Update"),
    bot = new Discord.Client(),
    request = require("request"),
    leet = require("leet"),
    fs = require("fs"),
    cmds = require('./commands'),
    unirest = require('unirest'),
    info = require('./config/YourInformation'),
    repo = require('./config/customresponse'),
    moment = require("moment")
    sched = require('node-schedule'),
    log = (msg) => {
    console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${msg}`);
    },
    wa = require("./wolfram_plugin"),
    wolfram_plugin = new wa(),
    pre = "!";
    bot.on('guildCreate', (guild) => {
      guild.defaultChannel.sendMessage("Hello!, I Am "+info.botname+", Your Personal Robot Assistant!\nYou Can See All My Commands With `"+pre+"help`\nIf you need technical support contact my creator: <@163735744995655680>");
      console.log("hi")
    });
    bot.on('guildMemberAdd', (guild, member) => {
      if (!info.announce.channel) return;
      info.announce.welcome(guild, member, info.announce.channel, bot)
    });
    bot.on('guildMemberRemove', (guild, member) => {
      if (!info.announce.channel) return;
      info.announce.goodbye(guild, member, info.announce.channel, bot)
    });
    var j = sched.scheduleJob('0 */12 * * *', function(){
      bot.guilds.forEach((g) => {
      g.defaultChannel.sendMessage(info.Schedule12hours, {split:true})
      });
    });
    var j = sched.scheduleJob('0 */3 * * *', function(){
      bot.guilds.forEach((g) => {
      g.defaultChannel.sendMessage(info.Schedule3hours, {split:true})
      });
    });
bot.on('message', (message) => {
var inlow = message.content.toLowerCase(),
    input = message.content,
    insplit = input.split(" "),
    incap = message.content.toUpperCase();
    if (repo.response[inlow]) {
      message.channel.sendMessage(repo.response[inlow]);
    }
    repo.inlinephrase.process(inlow, message)
    if (!input.startsWith(pre)) return;
    if (message.author.bot) return;
    var command = insplit[0].slice(pre.length),
    params = message.content.split(" ").slice(1),
    suffix = params.join(" ");
    if (inlow === pre+"help") {
      var keys = Object.keys(cmds);
      var msgArray1 = [],
          msgArray2 = [],
          msgArray3 = [];
        for (i = 0;i < Object.keys(cmds).length; i++) {
        var permy = cmds[keys[i]].perm;
        var permsy;
        if (permy === 0) {
          permsy = "Everyone";
            msgArray1.push("\n**"+pre+cmds[keys[i]].usage+"**: "+cmds[keys[i]].desc+".")
        } else if (permy === 1) {
          permsy = "Staff Role";
            msgArray2.push("\n**"+pre+cmds[keys[i]].usage+"**: "+cmds[keys[i]].desc+".")
        } else if (permy === 10) {
          permsy = info.bossname+" Only";
            msgArray3.push("\n**"+pre+cmds[keys[i]].usage+"**: "+cmds[keys[i]].desc+".")
        }
      }
      message.author.sendMessage("`I See You Have Triggered "+info.botname+"'s' Help Command, Here Is A List Of Useful Commands`\n");
      message.author.sendMessage("\n***Everyone***"+msgArray1+"\n\n***Staff Role***"+msgArray2+"\n\n***"+info.bossname+" Only***"+msgArray3, {split:true});
      message.delete().catch(console.log);
      message.reply("You were PM'd my commands");
      return;
    }
        if (inlow === pre+"help "+params[0] && cmds.hasOwnProperty(params[0])) {
        var perms;
        if (cmds[params[0]].perm === 0) {
          perms = "Everyone";
        } else if (cmds[params[0]].perm === 1) {
          perms = "Staff Role";
        } else if (cmds[params[0]].perm === 10) {
          perms = info.bossname+" Only";
        }
        message.channel.sendMessage("```css\n"+pre+params[0]+":\n\nUsage: "+pre+cmds[params[0]].usage+"\n\nDescription: "+cmds[params[0]].desc+"\n\nPermission: "+perms+"```");
        return;
    }
    if (cmds.hasOwnProperty(command)) {
      if (cmds[command].perm === 0) {
        log(message.content);
        cmds[command].process(message, suffix, params, bot, log, pre);
      } else if (cmds[command].perm === 1) {
        log("Staff command used "+message.content)
        try {
          if (message.member.roles.has(message.guild.roles.find("name", "Staff").id)) {
            cmds[command].process(message, suffix, params, bot, log, pre);
          } else {
            message.channel.sendMessage("You Do Not Have Permission For This Command");
          }
        } catch(err) {
          console.log(err);
          message.channel.sendMessage("This server does not have the role, `Staff`. Create it to use restricted commands.");
        }
      } else if (cmds[command].perm === 10) {
        if (message.author.id == info.boss) {
          log("Admin Command Used, "+message.content);
          cmds[command].process(message, suffix, params, bot, log, pre);
        } else {
          message.channel.sendMessage("You Do Not Have Permission For This Command");
        }
        
      }
    }
});
    /* global error */


bot.on('ready', function () {
    log(`Ralts: Ready to serve ${bot.users.size} users, in ${bot.channels.size} channels`);
    bot.user.setStatus(null, "With "+bot.users.size+" users.");
    log('You can use This invite link to add me to your server: https://discordapp.com/oauth2/authorize?&client_id='+info.botid+'&scope=bot&permissions=0x1610087479')
});
bot.on("disconnected", function() {
  process.exit(0); // exit node.js without an error, seeing this is 9 out of 10 times intentional.
});

bot.on("ready", function init(){
  Logger.log("info", "Initializing...");
  Logger.log("info", "Checking for updates...");
  VersionChecker.getStatus(function(err, status) {
    if (err) {
      error(err);
    } // error handle
    if (status && status !== "failed") {
      Logger.log("info", status);
    }
  });
})

bot.on("message", function(msg) {
  if (info.log_chat === true && msg.channel.server) { // Note that this is programmed to NOT log DM's.
    var d = new Date();
    var n = d.toUTCString();
    ChatLog.log("info", n + ": " + msg.channel.server.name + ", " + msg.channel.name + ": " + msg.author.username + " said <" + msg + ">");
  }
  if (msg.author == bot.user) {
    return;
  }
});

bot.login(info.token);
