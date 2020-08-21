const Discord = require('discord.js');
exports.run = async(client, msg, args) => {
if (!msg.guild) {
const ozelmesajuyari = new Discord.RichEmbed()
.setColor(0xFF0000)
.setTimestamp()
.setAuthor(msg.author.username, msg.author.avatarURL)
.addField(':warning: Uyarı :warning:', '`canlıdestek` adlı komutu özel mesajlarda kullanamazsın.')
return msg.author.send(ozelmesajuyari); }
const emoji = msg.client.emojis.get('');
let isEnabled;
msg.reply("Ödeme desteği yolladınız. Birazdan yetkili ekibimiz sizinle ilgilenicektir.");
let mesaj = args.slice(0).join(' ');
let chan = msg.channel;
let destekKanal = "745216909531807745";
const embed = new Discord.RichEmbed()
.addField('Dikkat', ` Canlı Destek Çağrısı`)
.setAuthor(`${msg.author.tag} (${msg.author.id})`, `${msg.author.avatarURL}`)
.setColor("RANDOM")
.addField(`Bilgiler`, `
**Sunucu**: ${msg.guild.name} (${msg.guild.id}) \n
**Kanal**: ${msg.channel.name} (${msg.channel.id}) \n
**Destek İsteyen**: ${msg.author.tag} (${msg.author.id}) \n
**Destek Mesajı**: ${mesaj}`)
.setFooter("Canlı Destek")
.setTimestamp()
client.channels.get(destekKanal).send({
embed: embed
});
const collector = client.channels.get(destekKanal).createCollector(msg => msg.content.startsWith(''), {
time: 0
})
client.channels.get(destekKanal).send(' Destek çagrısı bağlanmak için `katıl` yazınız. İptal Etmek İçin `kapat` yazınız.')
collector.on('message', (msg) => {
if (msg.content === 'iptal') collector.stop('aborted')
if (msg.content === 'katıl') collector.stop('success')
/* {
if (isEnabled == true) return msg.channel.send('Başka bir destek çağrısı mevcut.')
collector.stop('success')
} */
})
collector.on('end', (collected, reason) => {
if (reason === 'time') return msg.reply(' Çagrı zaman aşımına uğradı.')
if (reason === 'aborted') {
msg.reply('Çağrı reddedildi.')
client.channels.get(destekKanal).send(' Başarıyla çağrı reddedildi.')
}
if (reason === 'success') {
client.channels.get(destekKanal).send(' Destek çagrısı alındı!')
client.channels.get(destekKanal).send(' Destek çağrısını iptal etmek için `iptal` yazınız.')
chan.send(`${msg.author}` + ', Destek çagrısı iptal etmek için `iptal` yazınız. ' + 'Çağrınıza bir destek yetkilisi giriş sağladı!')
isEnabled = true
client.on('message', msg => {
function contact() {
if (isEnabled === false) return
if (msg.author.id === client.user.id) return
if (msg.content.startsWith('iptal')) {
msg.channel.send(' Çağrı İptal Edildi.')
if (msg.channel.id === chan.id) client.channels.get(destekKanal).send(' Çağrı karşı taraftan kapatıldı.')
if (msg.channel.id === destekKanal) chan.send(' Çağrı karşı taraftan iptal edildi.')

return isEnabled = false
}
if (msg.channel.id === chan.id) client.channels.get(destekKanal).send(` **${msg.author.tag}**: ${msg.content}`)
if (msg.channel.id === destekKanal) chan.send(` **${msg.author.tag}**: ${msg.content}`)
}
contact(client)
})
}
})
}

exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0
};

exports.help = {
name: 'ödsdeme',
description: 'Canlı Destek Tablebi Oluşturur.',
usage: 'canlıdestek',
category: "sunucu"
};