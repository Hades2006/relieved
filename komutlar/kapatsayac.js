const Discord = require('discord.js')
const fs = require('fs')

exports.run = async (client, message, args) => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
        if(!sayac[message.guild.id]) {
            const embed = new Discord.RichEmbed()
                .setDescription(`<a:carpi:616152962938568733> | Sayaç, ayarlanmadığından dolayı sıfırlanamaz!`)
        .setFooter('Botify, Sayaç sıfırlama sistemi', client.user.avatarURL)
                .setColor("1ED760")
                .setTimestamp()
            message.channel.send({embed})
            return
        }
        delete sayac[message.guild.id]
        fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
            console.log(err)
        })
        const embed = new Discord.RichEmbed()
            .setDescription(`Sayaç, başarılı bir şekilde sıfırlandı!`)
      .setFooter('Botify, iyi eğlenceler diler!', client.user.avatarURL)
            .setColor("1ED760")
            .setTimestamp()
        message.channel.send({embed})
        return
    }

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ['sayaç-kapat'],
  permLevel: 0
};

exports.help = {
  name: 'sayaç-sıfırla', 
  description: 'Sayaçı, sıfırlar!',
  usage: 'sayaç-sıfırla'
};