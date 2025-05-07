import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assets: [], // will be populated with mock data
};

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    setAssets: (state, action) => {
      state.assets = action.payload;
    },
    updateAsset: (state, action) => {
      const updatedAsset = action.payload;
      const index = state.assets.findIndex(
        (asset) => asset.symbol === updatedAsset.symbol
      );
      if (index !== -1) {
        state.assets[index] = {
          ...state.assets[index],
          price: updatedAsset.price,
          change1h: updatedAsset.change1h,
          change24h: updatedAsset.change24h,
          volume24h: updatedAsset.volume24h,
        };
      }
    },
  },
});

export const { setAssets, updateAsset } = assetsSlice.actions;
export default assetsSlice.reducer;
