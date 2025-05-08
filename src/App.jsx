import { React, useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { setAssets } from "./features/assets/assetsSlice";
//import mockAssets from "./features/assets/mockData";
import AssetTable from "./AssetTable";
const mockCharts = [
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1027.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/825.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1839.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/5426.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/52.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/2010.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/74.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/5805.svg",
  "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/6636.svg",
];
const App = () => {
  const dispatch = useDispatch();
  /* 
  const dispatch = useDispatch();
  const randomUpdate = () => {
    const randomIndex = Math.floor(Math.random() * mockAssets.length);
    const randomAsset = mockAssets[randomIndex];

    const randomPriceChange = (Math.random() - 0.5) * 10;
    const randomPercentChange = (Math.random() - 0.5) * 10;

    return {
      symbol: randomAsset.symbol,
      price: randomAsset.price + randomPriceChange,
      change1h: randomAsset.change1h + randomPercentChange,
      change24h: randomAsset.change24h + randomPercentChange,
      volume24h: randomAsset.volume24h + randomPercentChange * 1000000,
    };
  };
  useEffect(() => {
    dispatch(setAssets(mockAssets));
    const interval = setInterval(() => {
      dispatch(updateAsset(randomUpdate()));
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);
  */
  //const dispatch = useDispatch();

  const fetchAssets = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/assets");
      const json = await res.json();
      const data = json.data;

      dispatch(
        setAssets(
          data.map((coin, index) => ({
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            logo: coin.image,
            price: coin.current_price,
            change1h: coin.price_change_percentage_1h_in_currency,
            change24h: coin.price_change_percentage_24h_in_currency,
            change7d: coin.price_change_percentage_7d_in_currency,
            marketCap: coin.market_cap,
            volume24h: coin.total_volume,
            circulatingSupply: coin.circulating_supply,
            maxSupply: coin.max_supply,
            chart: mockCharts[index % mockCharts.length],
          }))
        )
      );
      console.log("Assets received:", data);
    } catch (error) {
      console.error("Failed to fetch assets:", error);
    }
  };
  useEffect(() => {
    fetchAssets();
    const interval = setInterval(fetchAssets, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="App">
        <h1 className="main-title">💰 Crypto Assets Tracker</h1>
        <AssetTable />
      </div>
    </>
  );
};

export default App;
