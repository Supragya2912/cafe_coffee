import { createSlice , PayloadAction} from "@reduxjs/toolkit";

interface Favourite {
    id: string;
    // name: string;
    type: string;
}

interface FavouriteState {
    favourite: Favourite[];
}

const initialState: FavouriteState = {
    favourite: [],
};

const favouriteSlice = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
        setFavourite: (state, action: PayloadAction<Favourite[]>) => {
            state.favourite = action.payload;
        },
        addFavourite: (state, action: PayloadAction<Favourite>) => {
            state.favourite.push(action.payload);
        },
        updateFavourite: (state, action: PayloadAction<Favourite>) => {
            const { id } = action.payload;
            const index = state.favourite.findIndex(favourite => favourite.id === id);
            if (index !== -1) {
                state.favourite[index] = action.payload;
            }
        },
        deleteFavourite: (state, action: PayloadAction<string>) => {
            const index = state.favourite.findIndex(favourite => favourite.id === action.payload);
            if (index !== -1) {
                state.favourite.splice(index, 1);
            }
        }
    },
});

export const { addFavourite, setFavourite, updateFavourite, deleteFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;

