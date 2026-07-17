const {
SlashCommandBuilder,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} = require("discord.js");

const config = require("../config");


module.exports = {


data: new SlashCommandBuilder()

.setName("panel")

.setDescription("Create the Sinner Services vouch panel"),



async execute(interaction){


const embed = new EmbedBuilder()

.setColor(config.COLORS.RED)

.setTitle("💎 SINNER SERVICES")

.setDescription(
`
# ⭐ CUSTOMER REVIEWS

Thank you for choosing **Sinner Services**.

We appreciate your honest feedback and support.

━━━━━━━━━━━━━━━━━━━━

⭐ **Rating**
Choose your experience from 1-5 stars.

💬 **Feedback**
Tell us about your experience.

🎮 **Service Used**
What service did you purchase?

📸 **Proof**
Upload proof after submitting.

━━━━━━━━━━━━━━━━━━━━

Click the button below to leave your review.
`
)

.setFooter({

text:"Sinner Services • Vouch System"

})

.setTimestamp();



const button = new ButtonBuilder()

.setCustomId("leave_vouch")

.setLabel("📝 Leave a Vouch")

.setStyle(ButtonStyle.Danger);



const row = new ActionRowBuilder()

.addComponents(button);



await interaction.reply({

embeds:[embed],

components:[row]

});


}


};
