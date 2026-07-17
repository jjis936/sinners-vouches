const { EmbedBuilder } = require("discord.js");

const config = require("../config");
const { getSession } = require("../smsSessions");
const smspool = require("../providers/smspool");


module.exports = {

    customId: "sms_resend",

    async execute(interaction){

        const session = getSession(interaction.user.id);

        if(!session || !session.providerOrderId){
            return interaction.reply({
                content: "❌ No active order found. Run `/getnumber` again.",
                ephemeral: true
            });
        }

        await interaction.deferReply({ ephemeral: true });

        const embed = new EmbedBuilder()
            .setColor(config.COLORS.RED)
            .setFooter({ text: `${config.BRAND.NAME} • SMS Verification` });

        if(session.provider === "smspool"){

            await smspool.resendSms(session.providerOrderId);

            embed
                .setTitle("🔁 CODE RESENT")
                .setDescription("Requested a fresh code from SMSPool. Press **Check SMS** in a moment.");

        }else{

            embed
                .setTitle("ℹ️ NO RESEND ON 5SIM")
                .setDescription(
                    "5sim has no resend endpoint. Trigger a new SMS from the target " +
                    "site using the same number, then press **Check SMS** again."
                );

        }

        await interaction.editReply({ embeds: [embed] });

    }

};
