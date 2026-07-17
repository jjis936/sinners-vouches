const { EmbedBuilder } = require("discord.js");

const config = require("../config");
const { getSession } = require("../smsSessions");
const { updateNumberOrder } = require("../database/numbers");

const fivesim = require("../providers/fivesim");
const smspool = require("../providers/smspool");


module.exports = {

    customId: "sms_check",

    async execute(interaction){

        const session = getSession(interaction.user.id);

        if(!session || !session.providerOrderId){
            return interaction.reply({
                content: "❌ No active order found. Run `/getnumber` again.",
                ephemeral: true
            });
        }

        await interaction.deferReply({ ephemeral: true });

        let result;

        if(session.provider === "5sim"){
            result = await fivesim.checkOrder(session.providerOrderId);
        }else{
            result = await smspool.checkSms(session.providerOrderId);
        }

        if(session.localOrderId){
            updateNumberOrder(session.localOrderId, {
                status: result.code ? "received" : session.status || "pending",
                code: result.code || null
            });
        }

        const embed = new EmbedBuilder()
            .setColor(config.COLORS.RED)
            .setTitle(result.code ? "📩 CODE RECEIVED" : "⏳ WAITING FOR CODE")
            .setDescription(
                result.code
                    ? `**Code:** \`${result.code}\`\n**Status:** ${result.status}`
                    : `No code yet.\n**Status:** ${result.status}`
            )
            .setFooter({ text: `${config.BRAND.NAME} • SMS Verification` });

        await interaction.editReply({ embeds: [embed] });

    }

};
