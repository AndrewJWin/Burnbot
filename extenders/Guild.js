const { Structures } = require("discord.js");

module.exports = Structures.extend("Guild", DiscordGuild => {
  return class Guild extends DiscordGuild {

    constructor(...args) {
      super(...args);
      
    }

    get champion() {
      return this.client.champions.get(this.id);
    }
  };
});