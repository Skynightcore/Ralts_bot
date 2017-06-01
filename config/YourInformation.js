module.exports = {
  botname:"SkyNetCloud", //Enter the Name you chose for the Discord Bot Application.
  bossname:"Sknetcloud",
  botid:"273626063278440448", //The Client ID of your Bot. Listed at the top of the Discord Bot Application.
  boss:"194903234287108097", //Client ID of The Owner/Host of the bot. YOU!
  token:"MjczNjI2MDYzMjc4NDQwNDQ4.DBCKHA.31qQ7GT6jkJCOiCaLjoONbSwk0E", //Enter The Token For Your Bot. KEEP THIS SECRET!!!.
  support:"", //This is the channel id for the Support Command to use. Set To Undefined To Turn OFF
  flipuser:"", //Create An Account at https://imgflip.com and input your details.
  flippass:"",
  logs:"true",
  website:"skynetcloud.xyz", //Main website link
  forum:"", //Forum page link
  donate:"",  //Link to donation page
  Schedule12hours:"", //Any message in here will broadcast in Public channel Every 12 hours.
  Schedule3hours:"", //Message announced to default channel every 3 hours.
  announce:{ //Configure The Message Sent When A User Joins Or Leaves
    "channel":"", //This is the channel id for the message to be sent. Remove ID if you wish to disable
    "welcome":function (guild, member, channel, bot) {
      var user = "<@"+member.user.id+">"

      //-=-=-=-=-=-= This -=-=-=-=-=-=-==-=-=-=-=-=-==-=-=-=
      var themessage = `Welcome ${user} to ${guild}`
      //-=-=-=-=-=-=^^ This ^^ -=-=-=-=-==--=-=--=-=-=-=-=-=
      //This is the welcome message sent to the channel above. Use ${member} for the member name. ${guild} for the guild name. ONLY Edit whats inside of `  ...  ` nothing else

      bot.channels.get(channel).sendMessage(themessage)
    },
    "goodbye":function (guild, member, channel, bot) {
      var user = "<@"+member.user.id+">"

      //-=-=-=-=-=-=-=-=-= This -=-=-=-=-=-=-=-=-=-=-=-=-=-
    var themessage = `${member} has left ${guild}`
      //-=-=-=-=-=-=-=-=-=^^ This ^^ -=-==-=-=-=-=-=-=-=-=
      //This is the goodbye message for when a member leaves. Same ${member} and ${guild} above ONLY Edit whats inside of `  ...    ` nothing else

      bot.channels.get(channel).sendMessage(themessage);
    }
  },
  servers:{ //Fill in tag pack version and ip for each of your servers.
    "tag":{
      "pack":"thispack",
      "ver":"1.1.1",
      "ip":"mc.skynetcloud.xyz",
      "Port":35565 //Only Change from 25565 if players must use play.example.com:25568 or any other port to connect to your server. With SRV records you dont need to change this value
    },
    "tag":{
      "pack":"thisotherpack",
      "ver":"99.1002.4.6e1000",
      "ip":"generic.craftasourus.commerse",
      "Port":25565
    }
  }
}
