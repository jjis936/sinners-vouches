const { EmbedBuilder } = require("discord.js");

const config = require("../config");
const { getSession, clearSession } = require("../smsSessions");
const { updateNumberOrder } = require("../database/numbers");

const fivesim = require("../providers/fivesim");
const smspool = require("../providers/smspool");


module.exports = {

    customId: "sms_cancel",

    async execute(interaction){

        const session = getSession(interaction.user.id);

        if(!session || !session.providerOrderId){
            return interaction.reply({
                content: "❌ No active order found. Run `/getnumber` again.",
                ephemeral: true
            });
        }

        await interaction.deferReply({ ephemeral: true });

        if(session.provider === "5sim"){
            await fivesim.cancelOrder(session.providerOrderId);
        }else{
            await smspool.cancelSms(session.providerOrderId);
        }

        if(session.localOrderId){
            updateNumberOrder(session.localOrderId, { status: "canceled" });
        }

        clearSession(interaction.user.id);

        const embed = new EmbedBuilder()
            .setColor(config.COLORS.RED)
            .setTitle("🚫 ORDER CANCELED")
            .setDescription(
                "Cancel/refund requested.\n" +
                "Note: this only refunds if no code had been delivered yet - " +
                "check your provider balance to confirm."
            )
            .setFooter({ text: `${config.BRAND.NAME} • SMS Verification` });

        await interaction.editReply({ embeds: [embed] });

    }

};
