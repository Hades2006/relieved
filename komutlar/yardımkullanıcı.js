const Discord = require('discord.js');

let botid = ('616144893399662602') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor("AEED13")
    .setAuthor(`${client.user.username} Kullanıcı Komutları`)
    .addField('!!level', 'Levelinizi gösterir.')//ne kadar müzik komutunuz varsa o kadar .addField('prefix+komut', 'açıklama/kullanım amacı') koyun
    .addField('!!level renk <renkkodu>', 'Levelinizdekş renkleri ayarlar.')
    .addField('!!level resim <resim url>', 'Level resminizin arkasına resim eklersiniz.')
     .addField('!!level saydamlaştır 1, 2, 3, 4, 5', 'Levelinizin arka siyah katmanının saydamlık ayarı.')
    .addField('!!kullanıcı-bilgi @kullanıcı', 'Kullanıcı hakkında bilgi verir.')
    .addField('!!sonmesaj @kullanıcı', 'Kullanıcının attığı en son mesajı belirtir.')
    .addField('!!roller', 'Sunucuda bulunan rol isimlerini belirtir.')
    .addField('!!instagram <kullanıcı adı>', 'Belirtilen hesabın bilgilerini verir.')
        .addField('!!profil', 'Profilinizi gösterir.')
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
  name: 'kullanıcı',
  description: '',
  usage: ''
};