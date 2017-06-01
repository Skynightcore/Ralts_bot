module.exports = {
  response:{ //Custom Responses in this Object will only trigger if the users message exactly matches the phrase.
    "Hi How Are you":"Tell me please", "what is love":"baby dont hurt me please", "i swear i wont hurt you":"how do i know"
    /*Template for use: {"triggerphrase":"reponse","triggerphrase":"reponse","triggerphrase":"reponse"}
    Add as many phrases as you want! */
  },
  inlinephrase:{ //Custom Responses In this block will trigger if the phrase is anywere in the users message. Not recommanded because it can cause spam.
    "process":function(inlow, msg) {
      if (inlow.includes("what is the server ip")) { //will also repsond if user write "what is the server ip for resonant rise"
        msg.channel.sendMessage("get the ip yourself silly willy")
      }
      /*Template for use:
      if (inlow.includes("TriggerPhrase")) {
        msg.channel.sendMessage("Response")
      },
      if (inlow.includes("TriggerPhrase")) {
        msg.channel.sendMessage("Response")
      } */
    }
  }
}
