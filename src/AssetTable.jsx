import React, { useState } from "react";
import { useSelector } from "react-redux";
//import { useDispatch } from "react-redux";
import "./App.css";
//import { sortAssetsBy24h } from "./features/assets/assetsSlice";
const AssetTable = () => {
  //const dispatch = useDispatch();
  const assets = useSelector((state) => state.assets.assets);
  const [filter, setFilter] = useState("");
  const formatChange = (value) => {
    const rounded = value.toFixed(2);
    const isPositive = value > 0;
    const arrow = isPositive ? "▲" : "▼";
    const color = isPositive ? "green" : "red";

    return (
      <span style={{ color, fontWeight: "bold" }}>
        {arrow}
        {rounded}%
      </span>
    );
  };
  const sortedAssets = [...assets].sort((a, b) => {
    if (filter === "asc") return a.change24h - b.change24h;
    if (filter === "desc") return b.change24h - a.change24h;
    return 0;
  });

  return (
    <>
      <div className="sort-dropdown">
        <label htmlFor="sort-select">Sort by 24h %: </label>
        <select
          id="sort-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="desc">Top Gainers</option>
          <option value="asc">Top Losers</option>
        </select>
      </div>

      <div className="table-container">
        <table className="asset-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Logo</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price ($)</th>
              <th>1h %</th>
              <th>24h %</th>
              <th>7d %</th>
              <th>Market Cap</th>
              <th>24h Volume</th>
              <th>Circulating Supply</th>
              <th>Max Supply</th>
              <th>7D Chart</th>
            </tr>
          </thead>
          <tbody>
            {sortedAssets.map((asset, index) => (
              <tr key={asset.symbol}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={asset.logo}
                    alt={asset.name}
                    className="asset-logo"
                  />
                </td>
                <td>{asset.name}</td>
                <td>{asset.symbol}</td>
                <td>${asset.price.toLocaleString()}</td>
                <td>{formatChange(asset.change1h)}</td>
                <td>{formatChange(asset.change24h)}</td>
                <td>{formatChange(asset.change7d)}</td>
                <td>${asset.marketCap.toLocaleString()}</td>
                <td>${asset.volume24h.toLocaleString()}</td>
                <td>{asset.circulatingSupply.toLocaleString()}</td>
                <td>
                  {asset.maxSupply ? asset.maxSupply.toLocaleString() : "∞"}
                </td>
                <td>
                  <img src={asset.chart} alt="7d chart" className="chart-img" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default AssetTable;
