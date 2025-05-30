import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assets: [],
};

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    setAssets: (state, action) => {
      state.assets = action.payload;
    },

    sortAssetsBy24h: (state, action) => {
      const direction = action.payload;
      console.log("Sorting by 24h %:", direction);
      state.assets.sort((a, b) => {
        return direction === "asc"
          ? a.change24h - b.change24h
          : b.change24h - a.change24h;
      });
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

export const { setAssets, updateAsset, sortAssetsBy24h } = assetsSlice.actions;
export default assetsSlice.reducer;
