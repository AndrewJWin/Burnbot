const Command = require("../base/Command.js");

class Champion extends Command {
  constructor(client) {
    super(client, {
      name: "champion",
      description: "Tells you the current Champion of the Guild..",
      usage: "champion",
      aliases: ["champ"]
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    var champ = message.guild.champion;
    if (message.flags[0] === "r") {
      if (!level >= 2) return message.channel.send("You do not have permission to remove the current Champion."); 
      if (champ === undefined) return message.channel.send("There is no Champion to remove.");
      const champion = await this.verifyUser(message, champ);
      const reply = await this.client.awaitReply(message, `Are you sure you want to remove the current Champion ${champion.tag}?`, m => m.author.id === message.author.id, 60000);
      if (["y","yes"].includes(reply.toLowerCase())) {
        await this.client.champions.delete(message.guild.id);
        return message.channel.send("The Champion has been dethroned.");
      }
    }
    if (message.flags[0] === "s") {
      if (!level >= 2) return message.channel.send("You do not have permission to remove the current Champion.");
      const users = message.mentions.users;
      if (users.size === 0) return message.channel.send("To set a new Champion, please mention a user.");
      if (users.first().bot) return message.channel.send("Hey, bots can't be Champions, try using a **REAL** user.");
      if (!champ === undefined) {
        const reply = await this.client.awaitReply(message, `Are you sure you want to replace the current Champion ${champion.tag} with ${users.first().tag}?`, m => m.author.id === message.author.id, 60000);
        if (["y","yes"].includes(reply.toLowerCase())) {
          await this.client.champions.set(message.guild.id, users.first().id);
          return message.channel.send("The new Champion has been crowned!");
        }
      } else {
        const reply = await this.client.awaitReply(message, `Are you sure you want to set the current Champion to ${users.first().tag}?`, m => m.author.id === message.author.id, 60000);
        if (["y","yes"].includes(reply.toLowerCase())) {
          await this.client.champions.set(message.guild.id, users.first().id);
          return message.channel.send("The new Champion has been crowned!");
        }
      }
    }

    if (champ === undefined) return message.channel.send("There is no champion!");
    const champion = await this.verifyUser(message, champ);
    try {
      return message.channel.send(`The current reigning Champion is ${champion.tag}`);
    } catch (e) {
      console.log(e);
    } 
  }
}

module.exports = Champion;
