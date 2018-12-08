module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("you don't have the manage messages premission");

    var emojiss = message.guild.emojis.array()

    console.log(`there are ${emojiss.length} emojis in this server`)
    message.channel.send(`there are ${emojiss.length} emojis in this server`)

    
    for (i = 0;i < emojiss.length; i++){
        //console.log(`${i}`)
    message.channel.send(`${emojiss[i]}`)
    }

    console.log(`emojis done`)
    message.channel.send(`emojis done`)

 }

module.exports.help ={
    name: "emojis"
}