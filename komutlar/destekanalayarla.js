const Discord = require('discord.js');

const ayarlar = require('../ayarlar.json');
const p = ayarlar.prefix;
exports.run = function(client, message, args) {
//Komutun Kodları
  const channel = message.mentions.channels.first()

  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('**:xx: Bu işlem için iznin yok!**')
  if(!channel) return message.channel.send('**:xx: Bir kanal etiketlemelisin!**');
  const db = require('quick.db');
  db.set(`hg_kanal_${message.guild.id}`,`${channel.id}`);
  message.channel.send(
  new Discord.RichEmbed()
    .setTitle('**<:DownloadTickMarkPngImage100915Fo:608977806118092802>  Başarılı!**')
    .setColor('0x36393E')
    .setDescription('**Başarı ile giriş çıkış kanalı <#'+channel.id+'> olarak ayarlandı!\n Sıfılamak için '+p+'giriş-çıkış sıfırla yazın!**')
    .setFooter('Clyde Bot',client.user.avatarURL)
  
  )
 
  
};

exports.conf = {
  enabled: true,//True => Komut açık, False => Komut kapalı 
  guildOnly: false, //True => Sadece Servere Özel, False => Heryerde kullanılabilir
  aliases: ['hg-bb','hgbb'],//Komutun farklı kullanımları ÖR: !ping, !p
  permLevel: 0 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: 'giriş-çıkış',//Komutun adı (Komutu girerken lazım olucak)
  description: 'Giriş çıkış resminin atıldığı kanalı ayarlar',//Komutun Açıklaması
  category:'sunucu',
  usage: 'giriş-çıkış #kanal' //komutun kullanım şekli; ÖR: !ban @Kullanıcı
}