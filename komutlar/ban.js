

const Discord = require('discord.js');
const client = new Discord.Client();
const db = require("quick.db");

var ayarlar = require("../ayarlar.json")

exports.run = async(client, message, args) => {
const ayarlar = require("../ayarlar.json")


  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: Uyarı :warning:', '`ban` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.sendEmbed(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first() || message.guild.members.get(args[0]);
  let modlog = guild.channels.find('name', 'ceza-takip');
  if (!modlog) return message.reply('`ceza-takip` kanalını bulamıyorum.');
  if (reason.length < 1) return message.channel.send("<:yasak:619596371674005515> Yanlış kullanım tespit edildi. \nDoğru kullanım: `!!ban @kullanıcı sebep`"); 
  if (message.mentions.users.size < 1) return message.reply('Kimi banlayacağını yazmalısın.').catch(console.error);

  if (!message.guild.member(user).bannable) return message.reply('<:yasak:619596371674005515> Yetkilileri yasaklayamam.');
  message.guild.ban(user, 2);



user.send(`<:yasak:619596371674005515> Merhaba, **${guild.name}** adlı sunucudan **${reason}** sebebi ile ** ${message.author.username}** adlı yetkili tarafından yasaklandınız!`)
  const embed = new Discord.RichEmbed()
    .setColor("AEED13")
    .setTimestamp()
    .setThumbnail(user.avatarURL)
    .setTitle("<:oke:616540844408832010> | Bir kullanıcı sunucudan yasaklandı!")
    .addField('Yasaklanan Kullanıcı:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Yasaklayan Yetkili:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Yasaklama Sebebi:', reason);
  return guild.channels.get(modlog.id).sendEmbed(embed);


  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ban"],
  permLevel: 3
};

exports.help = {
  name: 'ban',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'ban [kullanıcı] [sebep]'
};