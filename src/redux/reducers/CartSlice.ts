import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: string;
    type: string;
    name: string;
    price: [
        {
            size: string;
            price: number;
        }
    
    ];
    quantity: number;
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
            state.cart.push(action.payload);
        },
        increaseQuantity: (state, action: PayloadAction<{ id: string; size: string }>) => {
            for (let i = 0; i < state.cart.length; i++) {
                if (state.cart[i].id === action.payload.id && state.cart[i].price[i].size === action.payload.size) {
                    state.cart[i].quantity += 1;
                    break;
                }
            }
        },
        decrementCartItemQuantity: (state, action: PayloadAction<{ id: string; size: string }>) => {
            for (let i = 0; i < state.cart.length; i++) {
                if (state.cart[i].id === action.payload.id && state.cart[i].price[i].size === action.payload.size) {
                    if(state.cart[i].quantity > 1){
                        state.cart[i].quantity -= 1;
                    }
                }
            }  
        }
    },
});

export const { addToCart, increaseQuantity, decrementCartItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
