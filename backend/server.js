import express from "express";
import fetch from "node-fetch";
import cors from "cors";
const app = express();
const PORT = 5000;
app.use(cors());

let cachedData = [];
let lastUpdated = null;

const fetchFromCoinGecko = async () => {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h,24h,7d&per_page=10&page=1"
    );
    const data = await res.json();
    cachedData = data;
    lastUpdated = new Date();
    console.log("CoinGecko data updated at", lastUpdated.toLocaleTimeString());
  } catch (error) {
    console.error("Failed to fetch from CoinGecko:", error.message);
  }
};
fetchFromCoinGecko();
setInterval(fetchFromCoinGecko, 15000);
app.get("/api/assets", (req, res) => {
  res.json({ data: cachedData });
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
