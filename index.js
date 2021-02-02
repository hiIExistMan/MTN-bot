const PREFIX = "mb:";
const Database = require("@replit/database");
const secrets = {
  commands: {},
  mtns: new Database()
};
const { Client, MessageEmbed } = require("discord.js");
require("dotenv").config();
const fs = require("fs");
const client = new Client();
const dir = fs.readdirSync("./commands");
for(const file of dir) {
  const name = file.substr(0, file.length-3);
  secrets.commands[name] = require(`./commands/${name}`);
}

client.on("guildMemberAdd", async member => {
  let user = await client.users.fetch(member.id);
  let img = await user.displayAvatarURL();
  const embed = new MessageEmbed()
  .setColor("#00F")
  .setTitle(`say welcome to ${member.user.tag}`)
  .setImage(img);
  let welcome = await client.channels.fetch("805496700592455721");
  welcome.send(embed);
  const memberrole = member.guild.roles.cache.find(role => role.id === "805501266829639690");
  member.roles.add(memberrole);
});

client.on("message", async msg => {
  if(Math.random()<0.05){
    msg.reply("You got a mtn");
    let usermtns = await secrets.mtns.get(msg.author.tag);
    if(usermtns == null){
      await secrets.mtns.set(msg.author.tag, 0);
      usermtns = 0;
    }
    await secrets.mtns.set(msg.author.tag, usermtns+1);
  }
  if(msg.content.startsWith(PREFIX)) {
    const txt = msg.content.substring(PREFIX.length);
    const tokens = txt.split(" ");
    const command = tokens.shift();

    if(secrets.commands[command]) {
      secrets.commands[command](tokens, msg, secrets);
    }
  }
  
});








client.login(process.env.BOT_TOKEN);






// web server
const express = require("express");
const app = express();

app.listen(3000, () => {
  
});