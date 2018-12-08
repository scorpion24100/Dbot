const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("you don't have the manage messages premission");

    var levelno = [
        5,
        10,
        15,
        20,
        25,
        30,
        35,
        40,
        45,
        50,
    ]

    var embed = new Discord.RichEmbed()


    for (i = 0;i < levelno.length; i++){
        if(!message.guild.roles.exists(`name`, `level ${levelno[i]}`)){
            message.guild.createRole({
                name: `level ${levelno[i]}`,
            })
            embed.addField(`level ${levelno[i]}`, `(new)`)
        }else{

        embed.addField(`level ${levelno[i]}`, `(existing)`)
        
        }
    }

    embed.setTitle(`generated ${levelno.length} level roles`)
    message.channel.send({embed})
 }

module.exports.help ={
    name: "genlevelroles"
}