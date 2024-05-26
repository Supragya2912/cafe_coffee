import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CoffeeData from "../../data/CoffeeData";
import BeanData from "../../data/BeansData";

interface Favourite {
    id: string;
    name: string;
    type: string;
    imagelink_square: string;
    favourite: boolean;
}

interface FavouriteState {
    favourite: Favourite[];
    coffeeList: Favourite[];
    beanList: Favourite[];
}

const initialState: FavouriteState = {
    favourite: [],
    coffeeList: CoffeeData,
    beanList: BeanData
};

const favouriteSlice = createSlice({
    name: 'favourite',
    initialState,
    reducers: {

        addToFavoriteList: (state, action: PayloadAction<Favourite>) => {
            const { id, name, type, imagelink_square } = action.payload;
            state.favourite.push({ id, name, type, imagelink_square, favourite: true });
        }
        ,
        removeFromFavoriteList: (state, action: PayloadAction<Favourite>) => {
            const { id, name, type, imagelink_square } = action.payload;
            state.favourite = state.favourite.filter((item) => item.id !== id);
        }

    }
});

export const { addToFavoriteList ,removeFromFavoriteList} = favouriteSlice.actions;
export default favouriteSlice.reducer;
