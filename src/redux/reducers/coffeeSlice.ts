import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CoffeeData from '../../data/CoffeeData'; // Import your static data

interface Coffee {
  id: string;
  name: string;
  type: string;
}

interface CoffeeState {
  coffee: Coffee[];
}

const initialState: CoffeeState = {
  coffee: CoffeeData,
};

const coffeeSlice = createSlice({
  name: 'coffee',
  initialState,
  reducers: {
    setCoffee: (state, action: PayloadAction<Coffee[]>) => {
      state.coffee = action.payload;
    },
    addCoffee: (state, action: PayloadAction<Coffee>) => {
      state.coffee.push(action.payload);
    },
    updateCoffee: (state, action: PayloadAction<Coffee>) => {
      const { id } = action.payload;
      const index = state.coffee.findIndex(coffee => coffee.id === id);
      if (index !== -1) {
        state.coffee[index] = action.payload;
      }
    },
  },
});

export const { setCoffee, addCoffee, updateCoffee } = coffeeSlice.actions;
export default coffeeSlice.reducer;
