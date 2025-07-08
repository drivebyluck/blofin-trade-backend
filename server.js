const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

app.post("/trade", (req, res) => {
  const { apiKey, secretKey } = req.body;

  console.log("Received API Key:", apiKey);
  console.log("Received Secret Key:", secretKey);

  if (!apiKey || !secretKey) {
    console.error("Missing required data.");
    return res.status(400).json({ success: false, message: "Missing required data" });
  }

  // Simulate success (replace with real BloFin call later)
  return res.status(200).json({ success: true, message: "Trade successful (mock)" });
});

app.listen(PORT, () => {
  console.log(`✅ Blofin backend running on port ${PORT}`);
});
