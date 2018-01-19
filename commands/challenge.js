const Command = require("../base/Command.js");

class Challenge extends Command {
  constructor(client) {
    super(client, {
      name: "challenge",
      description: "Are you prepared to challenge the Champion?",
      usage: "challenge",
      aliases: [""]
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    try {
      const champ = message.guild.champion;
      if (champ === undefined) return message.channel.send("There is no champion!");
      const champion = message.guild.members.filter(m => m.id === champ).first();
      const agreement = await this.client.awaitReply(message, `Are you sure you want to challenge the current reigning Champion ${champion.user.tag}?`, m => m.author.id === message.author.id, 60000);
      if (["y", "yes", "hell yes"].includes(agreement.toLowerCase())) {
        const msg = await champion.send(`${message.author.tag} has challenged you!`);
        const response = await this.client.awaitReply(msg, "Do you accept this challenge?!",m => m.author.id === champion.id, 86400000);
        if (["y", "yes", "hell yes"].includes(response.toLowerCase())) {
          return message.channel.send(`The Champion has entertained your request for a bout ${message.author}, are you ready to **feel the burn?!**`);
        } else {
          return message.channel.send(`The Champion has refused your request for a bout ${message.author}! Does he feel threatened?!`);
        }
      } else {
        return message.channel.send("You claim to be not worthy with your response. Try again when you grow a pair.");
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Challenge;
