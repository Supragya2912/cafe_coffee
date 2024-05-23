import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartState {
    cart: CartItem[];
}

const initialState: CartState = {
    cart: [],
};

const cartSlice = createSlice({

    name: 'cart',
    initialState,
   reducers: {

    addToCart : (state, action: PayloadAction<CartItem>) => {
        const { id, quantity } = action.payload;
        const index = state.cart.findIndex(item => item.id === id);
        if (index !== -1) {
            state.cart[index].quantity += quantity;
        } else {
            state.cart.push(action.payload);
        }
    }
   }
});

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;
