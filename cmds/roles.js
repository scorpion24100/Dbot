const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("you don't have the manage messages premission");

        var roless = message.guild.roles.array()

        console.log(`there are ${roless.length} roles in this server`)
        message.channel.send(`there are ${roless.length} roles in this server`)
    
        
        for (i = 0;i < roless.length; i++){
            //console.log(`${i}`)
        message.channel.send(`${roless[i]} ${roless[i].id}`)
        }
    
        console.log(`roles done`)
        message.channel.send(`roles done`)

    message.delete()
 }










module.exports.help ={
    name: "roles2"
}