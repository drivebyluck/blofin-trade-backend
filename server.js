const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/trade', async (req, res) => {
  const { apiKey, secretKey, passphrase, order } = req.body;

  // Validate payload
  if (!apiKey || !secretKey || !order) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  // Prepare request to Blofin
  try {
    const result = await axios.post('https://api.blofin.com/v1/order', order, {
      headers: {
        'X-BLOFIN-APIKEY': apiKey,
        'X-BLOFIN-SECRETKEY': secretKey,
        'Content-Type': 'application/json'
      }
    });

    res.json(result.data);
  } catch (error) {
    console.error('Blofin API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Trade failed', details: error.response?.data || error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Blofin backend running on port ${PORT}`));
