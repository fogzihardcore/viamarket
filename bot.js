const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(
    ` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 99999999);
//---------------------------------------------------------------------------//
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
require("./util/eventLoader")(client);
var prefix = ayarlar.prefix;
const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
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
client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});
client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//ödeme
client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;


if (message.content.toLowerCase().startsWith(prefix + `ödeme`)) {
    const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "Seller / Satış Sorumlusu")) return message.channel.send(`Sunucu  \`Seller / Satış Sorumlusu\` rolüne sahip değil, bu yüzden yardım talebiniz oluşturulamıyor.`);
    if (message.guild.channels.exists("name", "ödeme-" + message.author.id)) return message.channel.send(`Bir yardım talebine zaten sahipsin.`);
  if (!message.guild.channels.filter(c => c.type === 'category').find(c => c.name === 'Ödeme')) {
    let knl = message.guild.createChannel('Ödeme', 'category').then(ds => {
        message.guild.createChannel(`ödeme-${message.author.id}`, "text").then(c => {
          let role = message.guild.roles.find("name", "Seller / Satış Sorumlusu");
          let role2 = message.guild.roles.find("name", "@everyone");
          c.overwritePermissions(role, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });
          c.overwritePermissions(role2, {
              SEND_MESSAGES: false,
              READ_MESSAGES: false
          });
          c.overwritePermissions(message.author, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });
          message.channel.send(`:white_check_mark: Ödeme talebiniz oluşturuldu, #${c.name}.`);
          const embed = new Discord.RichEmbed()
          .setColor(0xCF40FA)
          .addField(`Hey ${message.author.username}!`, `Ödeme talebi oluşturuldu. Satış Sorumlusu en kısa zamanda cevap verecektir`)
          .setTimestamp();
          c.send({ embed: embed });
        c.setParent(ds)
      }).catch(console.error);
    })
    }
  let kanal = message.guild.channels.filter(c => c.type === 'category').find(c => c.name === 'Ödeme');
  if (kanal) {
    message.guild.createChannel(`ödeme-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Seller / Satış Sorumlusu");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`:white_check_mark: Ödeme talebiniz oluşturuldu, #${c.name}.`);
        const embed = new Discord.RichEmbed()
        .setColor(0xCF40FA)
        .addField(`Hey ${message.author.username}!`, `Ödeme talebi oluşturuldu. Satış Sorumlusu en kısa zamanda cevap verecektir`)
        .setTimestamp();
        c.send({ embed: embed });
      c.setParent(kanal)
    }).catch(console.error);
  }
    }

if (message.content.toLowerCase().startsWith(prefix + `tamamla`)) {
    if (!message.channel.name.startsWith(`ödeme-`)) return message.channel.send(`Yardım talebinizi yardım talebi kanalınızın dışındaki kanallarda kapatamazsınız.`);

    message.channel.send(`Emin misin? Onayladıktan sonra geri alınamaz!\nOnaylamak için,\`-onayla\`. Yazmak için 10 saniyen var yoksa kendiliğinden iptal olur.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '-onayla', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Kapatma talebinin zamanı geçti yardım talebin kapatılmadı.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}

});

