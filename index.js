const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const db = require("quick.db");
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = "!!";

const ayarlar1 = client.ayarlar;

client.tr = require('./tr.js');
client.en = require('./en.js');

client.ayarlar = {


    "prefix": "!!",

    "secenek": ["tr", "en"],

};


const log = message => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});






client.on("guildCreate", guild => {

    guild.owner.send(":inbox_tray: **| Botify** botu sunucunuza eklediğiniz için teşekkürler. \n\n**Botify** sayesinde sunucunuzu reklamlara, küfürlere, ve spamlara karşı koruyabilir\naynı zamanda destek sistemini kurarak kullanıcılarınıza\ndestek verebilirsiniz. \n**Botify** Resmi Destek Sunucusu: \nhttps://discord.gg/Ha56kHK")
})


client.on("guildCreate", guild => {
    let add = client.channels.get("618161008598319308")
    const eklendim = new Discord.RichEmbed()

    .setTitle(`Sunucuya Eklendim`)
        .setTimestamp()
        .setColor("GREEN")
        .setThumbnail(guild.iconURL)
        .addField(`Sunucu İsmi`, guild.name)
        .addField(`Sunucu ID`, guild.id)
        .addField(`Kurucu`, guild.owner.user.tag)
        .addField(`Kurucu ID`, guild.owner.user.id)
        .addField(`Üye Sayısı`, guild.memberCount)

    add.send(eklendim)

});
//XiR
client.on("guildDelete", guild => {
    let remove = client.channels.get("618161008598319308")
    const atildim = new Discord.RichEmbed()

    .setTitle(`Sunucudan Atıldım`)
        .setTimestamp()
        .setColor("RED")
        .setThumbnail(guild.iconURL)
        .addField(`Sunucu İsmi`, guild.name)
        .addField(`Sunucu ID`, guild.id)
        .addField(`Kurucu`, guild.owner.user.tag)
        .addField(`Kurucu ID`, guild.owner.user.id)
        .addField(`Üye Sayısı`, guild.memberCount)

    remove.send(atildim)

});


client.on("messageDelete", async message => {

    if (message.author.bot) return;

    var user = message.author;

    var kanal = await db.fetch(`modlogK_${message.guild.id}`)
    if (!kanal) return;
    var kanal2 = message.guild.channels.find('name', kanal)

    const embed = new Discord.RichEmbed()
        .setColor("AEED13")
        .setAuthor(`Bir Mesaj Silindi!`, message.author.avatarURL)
        .addField("Kullanıcı Tag", message.author.tag, true)
        .addField("ID", message.author.id, true)
        .addField("Silinen Mesaj", "```" + message.content + "```")
        .setThumbnail(message.author.avatarURL)
    kanal2.send(embed);

});

client.on("messageUpdate", async(oldMsg, newMsg) => {

    if (oldMsg.author.bot) return;

    var user = oldMsg.author;

    var kanal = await db.fetch(`modlogK_${oldMsg.guild.id}`)
    if (!kanal) return;
    var kanal2 = oldMsg.guild.channels.find('name', kanal)

    const embed = new Discord.RichEmbed()
        .setColor("AEED13")
        .setAuthor(`Bir Mesaj Düzenlendi!`, oldMsg.author.avatarURL)
        .addField("Kullanıcı Tag", oldMsg.author.tag, true)
        .addField("ID", oldMsg.author.id, true)
        .addField("Eski Mesaj", "```" + oldMsg.content + "```")
        .addField("Yeni Mesaj", "```" + newMsg.content + "```")
        .setThumbnail(oldMsg.author.avatarURL)
    kanal2.send(embed);

});

client.on("roleCreate", async role => {

    var kanal = await db.fetch(`modlogK_${role.guild.id}`)
    if (!kanal) return;
    var kanal2 = role.guild.channels.find('name', kanal)

    const embed = new Discord.RichEmbed()
        .setColor("AEED13")
        .setAuthor(`Bir Rol Oluşturuldu!`, role.guild.iconURL)
        .addField("Rol", `\`${role.name}\``, true)
        .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
    kanal2.send(embed);

});

client.on("roleDelete", async role => {

    var kanal = await db.fetch(`modlogK_${role.guild.id}`)
    if (!kanal) return;
    var kanal2 = role.guild.channels.find('name', kanal)

    const embed = new Discord.RichEmbed()
        .setColor("AEED13")
        .setAuthor(`Bir Rol Kaldırıldı!`, role.guild.iconURL)
        .addField("Rol", `\`${role.name}\``, true)
        .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
    kanal2.send(embed);

});

client.on("roleUpdate", async role => {

    if (!log[role.guild.id]) return;

    var kanal = await db.fetch(`modlogK_${role.guild.id}`)
    if (!kanal) return;
    var kanal2 = role.guild.channels.find('name', kanal)

    const embed = new Discord.RichEmbed()
        .setColor("AEED13")
        .setAuthor(`Bir Rol Güncellendi!`, role.guild.iconURL)
        .addField("Rol", `\`${role.name}\``, true)
        .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
    kanal2.send(embed);

});

client.on('voiceStateUpdate', async(oldMember, newMember) => {



    var kanal = await db.fetch(`modlogK_${oldMember.guild.id}`)
    if (!kanal) return;
    var kanal2 = oldMember.guild.channels.find('name', kanal)

    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel

    if (oldUserChannel === undefined && newUserChannel !== undefined) {

        const embed = new Discord.RichEmbed()
            .setColor("AEED13")
            .setDescription(`**${newMember.user.tag}** adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`)
        kanal2.send(embed);

    } else if (newUserChannel === undefined) {

        const embed = new Discord.RichEmbed()
            .setColor("AEED13")
            .setDescription(`**${newMember.user.tag}** adlı kullanıcı bir sesli kanaldan çıkış yaptı!`)
        kanal2.send(embed);

    }

    client.on('channelCreate', async(channel, member) => {
        var kanal = await db.fetch(`modlogK_${member.guild.id}`)
        const hgK = member.guild.channels.find('name', kanal)
        if (!hgK) return;
        if (!channel.guild) return;
        if (channel.type === "text") {
            var embed = new Discord.RichEmbed()
                .setColor("AEED13")
                .setAuthor(channel.guild.name, channel.guild.iconURL)
                .setDescription(`<#${channel.id}> kanalı oluşturuldu. _(metin kanalı)_`)
                .setFooter(`ID: ${channel.id}`)
            embed.send(embed);
        };
        if (channel.type === "voice") {
            var embed = new Discord.RichEmbed()
                .setColor("AEED13")
                .setAuthor(channel.guild.name, channel.guild.iconURL)
                .setDescription(`${channel.name} kanalı oluşturuldu. _(sesli kanal)_`)
                .setFooter(`ID: ${channel.id}`)
            hgK.send({ embed });
        }

    })



});


client.on('message', async msg => {

            if (!msg.guild) return;

            let prefix = await db.fetch(`prefix_${msg.guild.id}`) || "!!";

            var s = 'tr'
            var r = 'Destek Ekibi'
            var k = 'destek-kanalı'
            if (db.has(`dil_${msg.guild.id}`) === true) {
                var s = 'en'
                var r = 'Support Team'
                var k = 'support-channel'
            }
            const dil = s

            let rol = '';
            let kanal = '';

            if (db.has(`destekK_${msg.guild.id}`) === true) {
                kanal = msg.guild.channels.get(db.fetch(`destekK_${msg.guild.id}`)).name
            }

            if (db.has(`destekK_${msg.guild.id}`) === false) {
                kanal = k
            }

            if (db.has(`destekR_${msg.guild.id}`) === true) {
                rol = msg.guild.roles.get(db.fetch(`destekR_${msg.guild.id}`))
            }

            if (db.has(`destekR_${msg.guild.id}`) === false) {
                rol = r
            }

            const reason = msg.content.split(" ").slice(1).join(" ");
            if (msg.channel.name == kanal) {
                if (msg.author.bot) return;
                /*if (!msg.guild.roles.exists("name", rol)) return msg.reply(client[dil].desteksistem.rolyok.replace("{rol}", r)).then(m2 => {
                        m2.delete(5000)});*/
                if (msg.guild.channels.find(c => c.name === `${client[dil].desteksistem.talep}-${msg.author.discriminator}`)) {

                    msg.author.send(client[dil].desteksistem.aciktalepozel.replace("{kisi}", msg.author.tag).replace("{kanal}", `${msg.guild.channels.get(msg.guild.channels.find(c => c.name === `${client[dil].desteksistem.talep}-${msg.author.discriminator}`).id)}`))
      msg.guild.channels.find(c => c.name === `${client[dil].desteksistem.talep}-${msg.author.discriminator}`).send(client[dil].desteksistem.aciktalep.replace("{kisi}", msg.author.tag).replace("{sebep}", msg.content))
      
      msg.delete()
      return
    }
    if(msg.guild.channels.find(c => c.name === client[dil].desteksistem.kategori)) {
      msg.guild.createChannel(`${client[dil].desteksistem.talep}-${msg.author.discriminator}`, "text").then(c => {
      const category = msg.guild.channels.find(c => c.name === client[dil].desteksistem.kategori)
      c.setParent(category.id)
      let role = msg.guild.roles.find(r => r.name === rol.name);
      let role2 = msg.guild.roles.find(r => r.name === "@everyone");
      c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
      });
      c.overwritePermissions(msg.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });

      const embed = new Discord.RichEmbed()
      .setColor("AEED13")
      .setAuthor(`${client.user.username} | Destek Sistemi`, client.user.avatarURL)
      .setTitle(`_Merhaba ${msg.author.username}!_`)
      .addField(`» Destek Talebi Hakkında Bilgilendirme «`, `Yetkililerimiz en yakın zamanda burada sorunun ile ilgilenecektir! \nDestek talebini kapatmak için \`${prefix}kapat\` yazabilir, \nSunucudaki tüm Destek Taleplerini kapatmak için ise \`${prefix}talepleri-kapat\` yazabilirsin!`)
      .addField(`» Destek Talebi Sebebi «`, `${msg.content}`, true)
      .addField(`» Destek Talebini Açan Kullanıcı «`, `<@${msg.author.id}>`, true)
      .setFooter(`${msg.guild.name} adlı sunucu ${client.user.username} Destek Sistemi'ni kullanıyor teşekkürler!`, msg.guild.iconURL)
      c.send({ embed: embed });
      c.send(`** @here | 📞Destek Talebi! ** \n**${msg.author.tag}** adlı kullanıcı \`${msg.content}\` sebebi ile Destek Talebi açtı!`)
      msg.delete()
      }).catch(console.error);
    }
  }

  if (msg.channel.name== kanal) {
    if(!msg.guild.channels.find(c => c.name === client[dil].desteksistem.kategori)) {
      msg.guild.createChannel(client[dil].desteksistem.kategori, 'category').then(category => {
      category.setPosition(1)
      let every = msg.guild.roles.find(c => c.name === "@everyone");
      category.overwritePermissions(every, {
        VIEW_CHANNEL: false,
        SEND_MESSAGES: false,
        READ_MESSAGE_HISTORY: false
      })
      msg.guild.createChannel(`${client[dil].desteksistem.talep}-${msg.author.discriminator}`, "text").then(c => {
      c.setParent(category.id)
      let role = msg.guild.roles.find(c => c.name === rol.name);
      let role2 = msg.guild.roles.find(c => c.name === "@everyone");
      c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
      });
      c.overwritePermissions(msg.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });

      const embed = new Discord.RichEmbed()
      .setColor("AEED13")
      .setAuthor(`${client.user.username} | Destek Sistemi`, client.user.avatarURL)
      .setTitle(`_Merhaba ${msg.author.username}!_`)
     .addField(`» Destek Talebi Hakkında Bilgilendirme «`, `Yetkililerimiz en yakın zamanda burada sorunun ile ilgilenecektir! \nDestek talebini kapatmak için \`${prefix}kapat\` yazabilir, \nSunucudaki tüm Destek Taleplerini kapatmak için ise \`${prefix}talepleri-kapat\` yazabilirsin!`)
      .addField(`» Destek Talebi Sebebi «`, `${msg.content}`, true)
      .addField(`» Destek Talebini Açan Kullanıcı «`, `<@${msg.author.id}>`, true)
      .setFooter(`${msg.guild.name} adlı sunucu ${client.user.username} Destek Sistemi'ni kullanıyor teşekkürler!`, msg.guild.iconURL)
      c.send({ embed: embed });
      c.send(`** @here | 📞Destek Talebi! ** \n**${msg.author.tag}** adlı kullanıcı \`${msg.content}\` sebebi ile Destek Talebi açtı!`)
      msg.delete()
      }).catch(console.error);
    })
  }
}
})

client.on('message', async message => {
  
  if (!message.guild) return;
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || "!!";
  
  var s = 'tr'
  var r = 'Destek Ekibi'
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var r = 'Support Team'
    }
  const dil = s
  
if (message.content.toLowerCase().startsWith(prefix + `kapat`)) {
  if (!message.channel.name.startsWith(`${client[dil].desteksistem.talep}-`)) return message.channel.send(`Bu komut sadece Destek Talebi kanallarında kullanılabilir.`);

  const embed = new Discord.RichEmbed()
  .setColor("AEED13")
  .setAuthor(`Destek Talebi Kapatma İşlemi!`)
  .setDescription(`Destek talebini kapatma işlemini onaylamak için, \n10 saniye içinde \`evet\` yazınız.`)
  .setFooter(`${client.user.username} | Destek Sistemi`, client.user.avatarURL)
  message.channel.send({embed})
  .then((m) => {
    message.channel.awaitMessages(response => response.content === 'evet', {
      max: 1,
      time: 10000,
      errors: ['time'],
    })
    .then((collected) => {
        message.channel.delete();
      })
      .catch(() => {
        m.edit('Destek talebi kapatma isteği zaman aşımına uğradı.').then(m2 => {
            m2.delete()
        }, 3000);
      });
  });
  }
  
});

client.on("message", async message => {
  
  if (!message.guild) return;
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || "!!";
  
  var s = 'tr'
  var r = 'Destek Ekibi'
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var r = 'Support Team'
    }
  const dil = s
  
  if (message.content.toLowerCase().startsWith(`${prefix}talepleri-kapat`)) {
  
  if (!message.guild.channels.get(db.fetch(`destekK_${message.guild.id}`))) return;
  if (!message.guild.roles.get(db.fetch(`destekR_${message.guild.id}`))) return;
  
  if (db.has(`destekK_${message.guild.id}`) === true) {
  var kanal = message.guild.channels.get(db.fetch(`destekK_${message.guild.id}`)).name
  var rol = message.guild.roles.get(db.fetch(`destekR_${message.guild.id}`))
  }
  
  if (db.has(`destekK_${message.guild.id}`) === false) {
  var kanal = client[dil].desteksistem.kanal
  var rol = client[dil].desteksistem.rol
  }
    
  if (!message.channel.name.startsWith(`${client[dil].desteksistem.talep}-`)) return message.channel.send(`Bu komut sadece Destek Talebi kanallarında kullanılabilir.`);
    
  if(message.member.roles.has(rol.toString().replace("<@&", "").toString().replace(">", "")) === false) return message.reply(`Bu komutu sadece ${rol} rolüne sahip kullanıcılar kullanabilir!`);

  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Tüm Destek Talepleri Kapatma İşlemi!`)
  .setDescription(`Tüm Destek taleplerini kapatma işlemini onaylamak için, \n10 saniye içinde \`evet\` yazınız.`)
  .setFooter(`${client.user.username} | Destek Sistemi`, client.user.avatarURL)
  message.channel.send({embed})
  .then((m) => {
    message.channel.awaitMessages(response => response.content === 'evet', {
      max: 1,
      time: 10000,
      errors: ['time'],
    })
    .then((collected) => {
   try {
    message.guild.channels.filter(c => c.name.startsWith('yardım-')).forEach(async (kanal, id) => {
     kanal.delete()
  });
  } catch(e){
      //console.log(e.stack);
  }
    })
      .catch(() => {
        m.edit('Tüm Destek taleblerini kapatma isteği zaman aşımına uğradı.').then(m2 => {
            m2.delete()
        }, 3000);
      });
  });
  }
  
});


client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let otorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let arole = otorole[member.guild.id].sayi
  let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('Otorol Sistemi')
    .setDescription(`<:oke:616540844408832010> | Sunucuya hoşgeldin \`@${member.user.tag}\` otomatik rol verildi. `)
.setColor("GREEN")
    .setFooter("Botify", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`<:oke:616540844408832010> | Sunucuya hoşgeldin \`@${member.user.tag}\` otomatik rol verildi.`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

});

client.on("guildMemberAdd", async (member) => {
      let autorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let role = autorole[member.guild.id].sayi

      member.addRole(role)

});



client.on("message", async message => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    if(sayac[message.guild.id]) {
        if(sayac[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Tebrikler, başarılı bir şekilde ${sayac[message.guild.id].sayi} kullanıcıya ulaştık!`)
                .setColor("AEDD13")
                .setTimestamp()
            message.channel.send({embed})
            delete sayac[message.guild.id].sayi;
            delete sayac[message.guild.id];
            fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
                console.log(err)
            })
        }
    }
})
client.on("guildMemberRemove", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("AEDD13")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`<:sayacout:620149633095827457> | \`${member.user.tag}\`, aramızdan ayrıldı, \`${sayac[member.guild.id].sayi}\` kişi olmamıza \`${sayac[member.guild.id].sayi - member.guild.memberCount}\` kişi kaldı!`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }
 
});
client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("AEDD13")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`<:sayacg:620149260125601792> | \`${member.user.tag}\`, sunucuya katıldı \`${sayac[member.guild.id].sayi}\` kişi olmamıza \`${sayac[member.guild.id].sayi - member.guild.memberCount}\` kişi kaldı!` );
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }
 
});



client.login(ayarlar.token);