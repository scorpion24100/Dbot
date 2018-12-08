module.exports.run = async (bot, message, args) => {

    //message.channel.send(`${message.guild.emojis.get(id)}`)
    console.log(`there are ${message.guild.emojis.array().length} emojis in this server`)
    // message.guild.emojis.forEach(element => {
    //     //var emoji = message.channel.send(`${element.id}`)
    //     message.channel.send(`${element}`)
    // });


        for (i = 0;i < args; i++){
        var emojis = message.guild.emojis.array()
        var rnnd = Math.floor((Math.random(emojis.length)*100000)/(100000/emojis.length))
        message.react(emojis[rnnd])
        }

    }


module.exports.help ={
    name: "react"
}