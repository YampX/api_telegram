const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
//const Groq = require("groq-sdk");
const { GROQ_API_KEY, TOKEN, SERVER_URL } = process.env;

// const groq = new Groq({
//     apiKey: GROQ_API_KEY
// });

async function getGroqChatCompletion(prompt) {
    const result = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        model: "llama3-8b-8192"
    });
    return result.choices[0].message.content;
}

const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;

const app = express();
app.use(bodyParser.json());

// Seteo url Webhook en Telegram
const init = async () => {
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  console.log(res.data);
};

// Webhook Telegram
app.post(URI, async (req, res) => {
//   const chatId = req.body.message.chat.id;
   const text = req.body.message.text;
//   const response = await getGroqChatCompletion(text);
//   await axios.post(`${TELEGRAM_API}/sendMessage`, {
//     chat_id: chatId,
//     text: text,
//   });
  console.log(text);
  return res.send();
});

// API RX
app.post("/api/rx", async (req, res) => {
  return res.send("API rx Ok...");
});

app.listen(process.env.PORT || 4040, async () => {
  console.log("🚀 app running on port", process.env.PORT || 4040);
  await init();
});
