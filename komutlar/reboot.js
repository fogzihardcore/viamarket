const Discord = require("discord.js");
const bot = new Discord.Client();
const ayarlar = require("../ayarlar.json");

module.exports.run = async (bot, message, args) => {
  if (message.author.id !== ayarlar.sahip)
    return message.channel.send("Kairøs?");

  message.channel.sendMessage(`Rebooting`).then(msg => {
    console.log(`Yeniden Başlatma İşlemi Başarılı!`);
    process.exit(0);
  });
};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["r"],
  permLevel: 4
};

module.exports.help = {
  name: "reboot",
  description: "Botu Tekrar Başlatılır",
  usage: "reboot"
};
