import React from "react";
import { useSelector } from "react-redux";
import "./App.css"; // CSS file we'll create next

const AssetTable = () => {
  const assets = useSelector((state) => state.assets.assets);
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
  return (
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
          {assets.map((asset, index) => (
            <tr key={asset.symbol}>
              <td>{index + 1}</td>
              <td>
                <img src={asset.logo} alt={asset.name} className="asset-logo" />
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
  );
};

export default AssetTable;
