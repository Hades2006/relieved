const Discord = require('discord.js')
    //var ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {

    const db = require('quick.db');

    var s = 'tr'
    var a = client.commands.get('destek-rol-ayarla').help.name
    if (db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('destek-rol-ayarla').help.enname
    }
    const dil = client[s]
    const o = a

    let rol = message.mentions.roles.first();

    if (!rol) {
        let e = new Discord.RichEmbed()
            .setDescription(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
            .setColor("AEED13")
        message.channel.send(e)
        return;
    }

    var s = db.set(`destekR_${message.guild.id}`, rol.id)


    message.channel.send("<:doru:619596371879657513> Destek rolü başarıyla `@" + rol.name + "` olarak ayarlandı.")

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["destek-rol"],
    permLevel: 3,
    kategori: "ayarlar",
    category: "settings"
};

exports.help = {
    name: 'destek-rol-ayarla',
    description: 'Gelişmiş Destek Sistemindeki destek ekibi rolünü değiştirmenizi sağlar.',
    usage: 'destek-rol-ayarla <@rol>',
    enname: 'set-support-role',
    endescription: 'Enhanced Support Allows you to change the support team role in the system.',
    enusage: 'set-support-role <@role>'
};