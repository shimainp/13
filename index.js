const { Client, Events, GatewayIntentBits, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const keep_alive = require('./keep_alive.js')

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once(Events.ClientReady, async readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    var channel2 = client.guilds.cache.get("1212816251907481761").channels.cache.get("1213092589801181284");
    const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setDescription('```กรุณารายงานตัวด้วย```')

    const confirm = new ButtonBuilder()
        .setCustomId('confirm')
        .setLabel('รายงานตัว')
        .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder()
        .addComponents(confirm);

    const confirm1 = new ButtonBuilder()
        .setCustomId('confirm')
        .setLabel('รายงานตัว')
        .setStyle(ButtonStyle.Danger)
        .setDisabled(true);

    const row1 = new ActionRowBuilder()
        .addComponents(confirm1);

        function changeTimeZone(date, timeZone) {
            if (typeof date === 'string') {
              return new Date(
                new Date(date).toLocaleString('en-US', {
                  timeZone,
                }),
              );
            }
          
            return new Date(
              date.toLocaleString('en-US', {
                timeZone,
              }),
            );
          }

    setInterval(function(){
        

        channel2.messages.fetch({limit: 1})
        .then(messages => {
                try {
                const ae = messages.first()
                const date = changeTimeZone(new Date(), 'Asia/Bangkok');
                // console.log(date); // 👉️ "Tue Jul 25 2023 08:31:12"
    
                const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const currentDayOfWeek = daysOfWeek[date.getDay()];
                
                const currentTime = date.toLocaleTimeString();
                
                // console.log(`Today is ${currentDayOfWeek} and the time is ${currentTime}`);
                if (currentDayOfWeek == "Sunday") {
                    if (ae === undefined) {
                        channel2.send({ content: '@everyone', embeds: [exampleEmbed], components: [row], fetchReply: true });
                    } else {
                        // console.log(ae)
                        if (ae.content === "") {
                            ae.delete();
                            channel2.send({ content: '@everyone', embeds: [exampleEmbed], components: [row], fetchReply: true });
                        } else {
                            ae.edit({ content: '@everyone', embeds: [exampleEmbed], components: [row], fetchReply: true });
                        }
                        // ae.delete();
                        // channel.send({ content: '@everyone', embeds: [exampleEmbed], components: [row], fetchReply: true });
                    }
                } else {
                    if (ae === undefined) {
                        channel2.send({ content: '', embeds: [exampleEmbed], components: [row1], fetchReply: true });
                    } else {
                        // console.log(ae)
                        ae.edit({ content: '', embeds: [exampleEmbed], components: [row1], fetchReply: true });
                    }
                }
            
            } catch (error) {
                console.log(error)
            }
        });

    }, 60000);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isButton()) return;
    // interaction.channel.send("you clicked " + interaction.customId);
    // console.log(interaction);
    const modal = new ModalBuilder()
    .setCustomId('myModal')
    .setTitle('รายงานตัว');
    const amNameInput = new TextInputBuilder()
        .setCustomId('amNameInput')
        .setLabel("ชื่อ")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const amNameRow = new ActionRowBuilder().addComponents(amNameInput);

    modal.addComponents(amNameRow);

    await interaction.showModal(modal);
})

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isModalSubmit()) return;
    const amName = interaction.fields.getTextInputValue('amNameInput');
    console.log({ amName });
    var channel_Success2 = client.guilds.cache.get("1212816251907481761").channels.cache.get("1212823014333489233");
    const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setDescription('```'+ amName +' ได้รายตัวแล้ว``` '+
    "🏷️ Tag"+
    `\n╚ <@!${interaction.user.id}>`)

    interaction.reply({ content: 'ได้ส่งการรายงานตัวแล้ว', ephemeral: true})
    channel_Success2.send({ embeds: [exampleEmbed], fetchReply: true });
	// console.log(interaction.user.id);
});

client.login(process.env.token);
