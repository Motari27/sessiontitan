const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
    default: Jabez_Motari,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("jabez-motari-baileys");

function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
 };
router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
        async function TITAN_MD_PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/'+id)
     try {
            let Pair_Code_By_Jabez_Motari = Jabez_Motari({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "fatal"}).child({level: "fatal"}),
                browser: ["Chrome (Linux)", "", ""]
             });
             if(!Pair_Code_By_Jabez_Motari.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            const code = await Pair_Code_By_Jabez_Motari.requestPairingCode(num)
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            Pair_Code_By_Jabez_Motari.ev.on('creds.update', saveCreds)
            Pair_Code_By_Jabez_Motari.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                await delay(5000);
                let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                await delay(800);
               let b64data = Buffer.from(data).toString('base64');
               let session = await Pair_Code_By_Jabez_Motari.sendMessage(Pair_Code_By_Jabez_Motari.user.id, { text: 'Titan;;;' + b64data });

               let TITAN_MD_TEXT = `
*✅SESSION PAIRER✅*
*Made With 💜*
*By TITAN TECH*
____________________________________
╔════◇
║『 𝐖𝐎𝐖 𝐘𝐎𝐔'𝐕𝐄 𝐂𝐇𝐎𝐒𝐄𝐍 TITAN-MD
║ You've Completed the First Step
║ to Deploy a Whatsapp Bot.
╚════════════════════╝
╔═════◇
║ 『••• 𝗩𝗶𝘀𝗶𝘁 𝗙𝗼𝗿 𝗛𝗲𝗹𝗽 •••』
║❒ WA CHANNEL: _
║❒ 𝐎𝐰𝐧𝐞𝐫: _https://wa.me/message/254732647560_
║❒ Github: _https://github.com/Motari27_
║❒ 𝐖𝐚𝐆𝐫𝐨𝐮𝐩: _
║ 💜💜💜
╚════════════════════╝ 
 *TITAN TECH*
___________________________________

Don't Forget To Give Star⭐ To My Repo`
 await Pair_Code_By_Jabez_Motari.sendMessage(Pair_Code_By_Jabez_Motari.user.id,{text:TITAN_MD_TEXT},{quoted:session})
 

        await delay(100);
        await Pair_Code_By_Jabez_Motari.ws.close();
        return await removeFile('./temp/'+id);
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    TITAN_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./temp/'+id);
         if(!res.headersSent){
            await res.send({code:"Service Unavailable"});
         }
        }
    }
    return await TITAN_MD_PAIR_CODE()
});
module.exports = router
