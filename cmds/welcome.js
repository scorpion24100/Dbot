module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("you don't have the manage messages premission");

    var fetched = await message.channel.fetchMessages({limit: 99})
    message.channel.bulkDelete(fetched)

    await message.channel.send(" ", {
        file: "https://i.imgur.com/Zjx9QAz.png"
    });

    message.channel.send(`

    Welcome to Outpost Gamma!
a genuinely active discord server with every category under the sun.
    
    ★Feel free to join anyone in the voice channels, have a convo with the other members of your table or 
       discuss your favourite topics in one of our many channels listed below.
    
    ★Each voice channel has a secret text channel that you can only see when connected to the voice channel!

    ★if a message gets 5 or more 📌 reactions it will be pinned! (unless in a table in which case they will be insta-pinned)
    
    ★Into streaming? we gottcha if you start streaming on the server you will be given the <@&400304130523922444> role and your name will be shown at the top
       of the member list!
            
    ★we also have many self-assignable roles <@&399965785700958208> can give you, just say .lsar in <#512772586979983361> to get a complete list and 
       use .iam to give yourself a role and .iamn to remove one.
    
    ★don't forget if someone misbehaves just @mention a <@//398140531265241089> member or one of the <@//399327558920962068> and they'll proably get sent to <#398991322331217933>.


    `)

    await message.channel.send(" ", {
        file: "https://i.imgur.com/xoBQVDn.png"
    });

    message.channel.send(`

    🍹 The Lounge 🍹 - The general hagin' out place, talk about whatever and meme about whatever(but keep it pg).


    👾 Arcade 👾  - The place for gamin' and talking about gamin'. you can also show off your setup if you want.
    
    
    🍺 Otaku Bar 🍺  - The place for all that sweet sweet weaboo shit.
    
    
    🎨Creative Corner🎨  - The place for posting Your creations or sharing cool-looking shit - good place for feedback to.
    
    
    🔊 Nightclub 🔊  - The Place for Music & production, share cool music or stuff you made - another goodplace for feedback.
    
    
    📻 Radio 📻  - The chill zone for people the wanna relax or study.
    
    
    🏢The-Garage 🏢  - The place for all thing automobile. 
    
    
    🗑 The Backally 🗑  - This it outlaw counrty, you proably think you wanna be here but you really don't.
    
    
    🤐 The Pound 🤐  - This is where all the naughty bois go, you dont wanna end up here.`)

    await message.channel.send(" ", {
        file: "https://i.imgur.com/vh4zjy3.png"
    });

    message.channel.send(`


If you break any of these rules You will be sent to The Pound, be muted, or be banned depending on what the moderators decide.

    ★ NSFW content is only allowed in NSFW channels.

    ★ No Bulli (don’t harass other users).

    ★ No gore or other "shock" posts. 

    ★ Don't sexually harass people on the server, not even <@//259338131222822913>  (even though he secretly enjoys it.)

    ★ Try to keep chats in allocated channels. - If a conversation fits in more than one category, pick whichever one fits best.

    ★ No spam unless in <#400034692600168448> (or <@&399965785700958208> will temp mute you).

    ★ Server invites will be automaticly deleted by <@&399965785700958208> unless posted in <#400034692600168448>`)


    //★we also have a text channel that is only avalible specifically on a Tuesday!
    message.delete()
 }

module.exports.help ={
    name: "wel"
}