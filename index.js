const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const { TOKEN_AUTH, ID_TELEGRAM, TOKEN, SERVER_URL } = process.env;

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
  //   const text = req.body.message.text;
  //   await axios.post(`${TELEGRAM_API}/sendMessage`, {
  //     chat_id: chatId,
  //     text: text,
  //   });
  return res.send();
});

// API RX
app.post("/api/rx", async (req, res) => {
    console.log(req.headers);
  const token = req.headers;
  if (token !== TOKEN_AUTH) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const text = req.body.text || "...";
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: ID_TELEGRAM,
    text: text,
  });
  return res.send("Message sent...");
});

app.listen(process.env.PORT || 4040, async () => {
  console.log("🚀 app running on port", process.env.PORT || 4040);
  await init();
});
