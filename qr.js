const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Jabez_Motari,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("jabez-motari-baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function TITAN_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Jabez_Motari = Jabez_Motari({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.Titan("Desktop"),
			});

			Qr_Code_By_Jabez_Motari.ev.on('creds.update', saveCreds)
			Qr_Code_By_Jabez_Motari.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Jabez_Motari.sendMessage(Qr_Code_By_Jabez_Motari.user.id, { text: 'Titan;;;' + b64data });
	
				   let TITAN_MD_TEXT = `

*✅SESSION PAIRER✅*
*Made With 💜*
*By TITAN TECH*
____________________________________
╔════◇
║『 𝐖𝐎𝐖 𝐘𝐎𝐔'𝐕𝐄 𝐂𝐇𝐎𝐒𝐄𝐍 TITAN MD
║ You've Completed the First Step
║ to Deploy a Whatsapp Bot.
╚════════════════════╝
╔═════◇
║ 『••• 𝗩𝗶𝘀𝗶𝘁 𝗙𝗼𝗿 𝗛𝗲𝗹𝗽 •••』
║❒ WA CHANNEL: _https://whatsapp.com/channel/0029VaLYCPXJENxtW7BU9a0u_
║❒ 𝐎𝐰𝐧𝐞𝐫: _https://wa.me/message/254732647560_
║❒ Github: _https://github.com/Motari27_
║❒ Whatsapp Group: _https://chat.whatsapp.com/Gt1kfUU0w2l70RvMJCzd8P_
║ 💜💜💜
╚════════════════════╝ 
 *TITAN TECH*
___________________________________

Don't Forget To Give Star⭐ To My Repo`
	 await Qr_Code_By_Jabez_Motari.sendMessage(Qr_Code_By_Jabez_Motari.user.id,{text:TITAN_MD_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Jabez_Motari.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					TITAN_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await TITAN_MD_QR_CODE()
});
module.exports = router
