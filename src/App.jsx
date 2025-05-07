import { React, useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { setAssets, updateAsset } from "./features/assets/assetsSlice";
import mockAssets from "./features/assets/mockData";
import AssetTable from "./AssetTable";
const App = () => {
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
