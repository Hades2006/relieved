const Discord = require('discord.js')
const db = require('quick.db')
const fs = require('fs')
 
exports.run = async (client, message, args) => {
        if(!args[0]) {
     
                        message.channel.send(`<:red:617608486381158416> | Lütfen geçerli bir sayı belirtiniz! \n\n> <a:loading:616310048963952654> Örnek Kullanım: !!sayaç Hedef #sayaç Kanalı`)
            
                return
  }
 
        let profil = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  var mentionedChannel = message.mentions.channels.first();
  const s1 = new Discord.RichEmbed()
  .setDescription('Sayaç kanalı belirtmelisiniz!')
  .setColor("AEDD13")
                        .setTimestamp()
  if (!mentionedChannel && args[0] !== "sıfırla") return message.channel.send(s1);
 
 
        if(args[0] === "sıfırla") {
                if(!profil[message.guild.id]) {
                        const embed = new Discord.RichEmbed()
                                .setDescription(`<a:carpi:616152962938568733> | Sayaç ayarlanmadığından dolayı sıfırlanamaz!`)
                                .setColor("AEDD13")
                                .setTimestamp()
                        message.channel.send({embed})
                        return
                }
                delete profil[message.guild.id]
                fs.writeFile("./ayarlar/sayac.json", JSON.stringify(profil), (err) => {
                        console.log(err)
                })
               
                        message.channel.send(`<a:carpi:616152962938568733> | Sayaç başarılı bir şekilde sıfırlandı!`)
                    
                return
        }
 
        if(isNaN(args[0])) {
                const embed = new Discord.RichEmbed()
                        .setDescription(`<a:carpi:616152962938568733> | Lütfen geçerli bir sayı belirtiniz!`)
                        .setColor("AEDD13")
                        .setTimestamp()
                message.channel.send({embed})
                return
        }
 
        if(args[0] <= message.guild.memberCount) {
                const embed = new Discord.RichEmbed()
                        .setDescription(`<a:carpi:616152962938568733> | Lütfen, [${message.guild.memberCount}] rakamlı sayıdan daha yüksek bir değer belirtiniz!`)
                        .setColor("AEDD13")
                        .setTimestamp()
                message.channel.send({embed})
                return
        }
 
        if(!profil[message.guild.id]){
                profil[message.guild.id] = {
                        sayi: args[0],
      kanal: mentionedChannel.id
                };
        }
       
        profil[message.guild.id].sayi = args[0]
  profil[message.guild.id].kanal = mentionedChannel.id
       
        fs.writeFile("./ayarlar/sayac.json", JSON.stringify(profil), (err) => {
                console.log(err)
        })
 

                message.channel.send(`<a:onay11:616310053267439675> ◆ **Sayaç Ayarlandı** ◆ \n\n┏╋━━━━◥◣◆◢◤━━━━╋┓\n\nAyarlanan Hedef: \`${args[0]}\`  \n\nSayaç Kanalı: ${mentionedChannel} \n\n┗╋━━━━◥◣◆◢◤━━━━╋┛`)
        
}
 
exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ['sayaç'],
        permLevel: 2,
        kategori: "moderasyon"
}
 
exports.help = {
        name: 'sayaç-ayarla',
        description: 'Sayaç, ayarlar!',
        usage: 'sayaç-ayarla [sayı/sıfırla] [kanal]'
}