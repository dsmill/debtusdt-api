import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

async function getDebt() {
  const resp = await fetch("https://api.usdebtclock.org/debt");
  const data = await resp.json();
  return data.total;
}

app.get("/api/v3/ticker/price", async (req, res) => {
  const symbol = req.query.symbol;

  if (symbol !== "DEBTUSDT") {
    return res.json({ error: "unknown symbol" });
  }

  try {
    const debt = await getDebt();
    res.json({
      symbol: "DEBTUSDT",
      price: String(debt)
    });
  } catch (e) {
    res.json({ error: "fetch_failed", details: e.toString() });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
