module.exports = async (args, msg, secrets) => {
  let amt = await secrets.mtns.get(msg.author.tag);
  if(amt == null) {
    console.log("NaN");
    await secrets.mtns.set(msg.author.tag, 0);
    amt = 0;
  }
  msg.channel.send(`you own ${amt} mtns!`);
}