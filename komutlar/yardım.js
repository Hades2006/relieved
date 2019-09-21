const Discord = require("discord.js");

exports.run = async (client, message, args, tools, con) => {
 
  let logsEmbed = new Discord.RichEmbed() 
  .setColor("AEED13")
  .setTimestamp()
  .addField('**Botify Komut Listesi**', `${client.commands.map(cmd => `\`${cmd.help.name}\``).join("\n ")}`)
  message.channel.send(logsEmbed);
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Komut kategorilerini gösterir.',
  usage: 'yardım'
};
 