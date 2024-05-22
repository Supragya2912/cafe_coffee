import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import BeansData from '../../data/BeansData'; // Import your static data

interface Price {
  size: string;
  price: string;
  currency: string;
}

interface Bean {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: any;
  imagelink_portrait: any;
  ingredients: string;
  special_ingredient: string;
  prices: Price[];
  index: number;
}

interface BeansState {
  beans: Bean[];
}

const initialState: BeansState = {
  beans: BeansData,
};

const beansSlice = createSlice({
  name: 'beans',
  initialState,
  reducers: {
    setBeans: (state, action: PayloadAction<Bean[]>) => {
      state.beans = action.payload;
    },
  
    addBean: (state, action: PayloadAction<Bean>) => {
      state.beans.push(action.payload);
    },
    updateBean: (state, action: PayloadAction<Bean>) => {
      const { id } = action.payload;
      const index = state.beans.findIndex(bean => bean.id === id);
      if (index !== -1) {
        state.beans[index] = action.payload;
      }
    },
  },
});

export const { setBeans, addBean, updateBean } = beansSlice.actions;
export default beansSlice.reducer;
