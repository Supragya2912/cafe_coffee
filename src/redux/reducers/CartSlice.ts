import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: string;
    type: string;
    name: string;
    price: any;
    quantity: number;
    size: string;
    special_ingredient: string;
    imagelink_square: string;
    roasted: string;
    index: string;
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
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const { id, size, quantity } = action.payload;
            const index = state.cart.findIndex(item => item.id === id && item.size === size);
            if (index !== -1) {
                state.cart[index].quantity += quantity;
            } else {
                state.cart.push({ ...action.payload });
            }
        },
        // increaseQuantity: (state, action: PayloadAction<{ id: string; size: string }>) => {
        //     const index = state.cart.findIndex(item => item.id === action.payload.id && item.size === action.payload.size);
        //     if (index !== -1) {
        //         state.cart[index].quantity += 1;
        //     }
        // },
    },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
