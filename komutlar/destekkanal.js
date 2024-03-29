const Discord = require('discord.js')
    //var ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {

    const db = require('quick.db');

    var s = 'tr'
    var a = client.commands.get('destek-kanal-ayarla').help.name
    if (db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('destek-kanal-ayarla').help.enname
    }
    const dil = client[s]
    const o = a

    let kanal = message.mentions.channels.first();

    if (!kanal) {
        let e = new Discord.RichEmbed()
            .setDescription(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
            .setColor("AEED13")
        message.channel.send(e)
        return;
    }

    var s = db.set(`destekK_${message.guild.id}`, kanal.id)


    message.channel.send("<:doru:619596371879657513> Destek kanalı başarıyla <#" + s + "> olarak ayarlandı.")

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["destek-kanal"],
    permLevel: 3,
    kategori: "ayarlar",
    category: "settings"
};

exports.help = {
    name: 'destek-kanal-ayarla',
    description: 'Gelişmiş Destek Sistemindeki destek kanalını değiştirmenizi sağlar.',
    usage: 'destek-kanal-ayarla <#kanal>',
    enname: 'set-support-channel',
    endescription: 'Enhanced Support Allows you to change the support channel in the system.',
    enusage: 'set-support-channel <#channel>'
};