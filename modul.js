const Discord = require('discord.js');


exports.run = function(client, message) {
//Komutun Kodları
};

exports.conf = {
  enabled: true,//True => Komut açık, False => Komut kapalı 
  guildOnly: false, //True => Sadece Servere Özel, False => Heryerde kullanılabilir
  aliases: [],//Komutun farklı kullanımları ÖR: !ping, !p
  permLevel: 0 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: '',//Komutun adı (Komutu girerken lazım olucak)
  description: '',//Komutun Açıklaması
  usage: '' //komutun kullanım şekli; ÖR: !ban @Kullanıcı
}
//Coding by -Rhing#5860