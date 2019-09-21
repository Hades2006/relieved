const Discord = require('discord.js');

let botid = ('616144893399662602') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor("AEED13")
    .setAuthor(`${client.user.username} Yetkili Komutları`)
    .addField('<:ayar:620143806838472704> | !!ban @kulanıcı Sebep', 'Sunucudan belirtilen kullanıcıyı yasaklar.')
    .addField('<:ayar:620143806838472704> | !!at @kulanıcı Sebep', 'Sunucudan belirtilen kullanıcıyı atar.')
    .addField('<:ayar:620143806838472704> | !!otorol @Rol İsmi #Mesaj Kanalı', 'Sunucuya katılanlara otomatik rol verir.')
    .addField('<:ayar:620143806838472704> | !!otorol-kapat', 'Sunucuya katılanlara otomatik rol verme sistemini kapatır.')
    .addField('<:ayar:620143806838472704> | !!sayaç Hedef ( Örnek: 100 ) #Kanal', 'Sunucunuz için sayaç ayarlama komutudur. ')
    .addField('<:ayar:620143806838472704> | !!güvenlik #kanal', 'Sunucuya katılan üyelerin güvenli olup olmadığını belirtir.')
    .addField('<:ayar:620143806838472704> | !!reklam-filtresi', 'Sunucunuzda reklam yapılmasını yasaklarsınız.')
    .addField('<:ayar:620143806838472704> | !!sa-as', 'Sunucunuzda "SA" yazıldığı zaman cevap verme ayarı. ')
    .addField('<:ayar:620143806838472704> | !!slowmode', 'Bir yazı kanalında minimum mesaj atma hızını ayarlarsınız.')
   .addField('<:ayar:620143806838472704> | !!sunucu-bilgi', 'Sunucunuzun gerekli bilgileri ( Sadece Yöneticiler )')
    .addField('<:ayar:620143806838472704> | !!temizle', 'Sohbeti temizlemenizi sağlar.')
    .addField('<:ayar:620143806838472704> | !!küfür-engelle', 'Sunucunuzdaki küfürleri Botify sayesinde engellersiniz.')
    .addField('<:ayar:620143806838472704> | !!capslock-engel', 'Çok fazla büyük harfli mesajları engeller.')
    .addField('<:ayar:620143806838472704> | !!level ödül @rol', 'Level atlayınca kullanıcılara verilecek ödülü belirlersiniz.')
        .addField('<:ayar:620143806838472704> | !!!log #kanal', 'Sunucu kayıtlarının atılacağı kanalı ayarlarsınız.')
    .addField('<:ayar:620143806838472704> | !!!destek-kanal #kanal', 'Mesaj yazılınca yardım kanalının açılacağı kanalı ayarlar.')
.addField('<:ayar:620143806838472704> | !!!destek-rol @rol', 'Destek kanallarını görebilecek kişileri ayarlarsınız.')
    .addField(`» Linkler`, `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=${616144893399662602}&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/m8Hk2tg) **|** [Bota Oy Ver (Vote)](https://discordbots.org/bot/616144893399662602/vote) **|** [Web Sitesi](https://www.bestdiscordbots.xyz)`)//websiteniz yoksa  **|** [Web Sitesi]() yeri silebilirsiniz
    message.channel.sendEmbed(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'yetkili',
  description: '',
  usage: ''
};