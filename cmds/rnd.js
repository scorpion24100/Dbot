module.exports.run = async (bot, message, args) => {
  len = 20
  var num = ((Math.random(len)*100000)/5000);
  num = Math.floor(num);
  num = (num+1);
  message.channel.send(num)
 }

module.exports.help ={
    name: "rnd"
}