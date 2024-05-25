import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CoffeeData from "../../data/CoffeeData";
import BeanData from "../../data/BeansData";

interface Favourite {
    id: string;
    name: string;
    type: string;
    imagelink_square: string;
    description: string;
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
        addToFavoriteList: (state, action: PayloadAction<{ type: string, id: string }>) => {
            const { type, id } = action.payload;
            const item = type === 'Coffee' ?
                state.coffeeList.find(item => item.id === id)
                : state.beanList.find(item => item.id === id);
            if (item) {
                const isFavourite = state.favourite.find(fav => fav.id === id);
                if (isFavourite) {
                    state.favourite = state.favourite.filter(fav => fav.id !== id);
                } else {
                    state.favourite.push(item);
                }
            }
        }

    }
});

export const { addToFavoriteList } = favouriteSlice.actions;
export default favouriteSlice.reducer;
