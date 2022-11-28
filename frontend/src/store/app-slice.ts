import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAppSlice {
	_id: string | null;
	name: string | null;
	email: string | null;
	token: string | null;
	isLoggedIn: boolean;
	isAdmin: boolean;
}

const initialState: IAppSlice = {
	_id: null,
	name: null,
	email: null,
	token: null,
	isLoggedIn: false,
	isAdmin: false,
};

const appSlice = createSlice({
	name: 'bookstore-app',
	initialState,
	reducers: {
		updateUser(state: IAppSlice, action: PayloadAction<Partial<IAppSlice>>) {
			state._id = action.payload._id ? action.payload._id : state._id;
			state.name = action.payload.name ? action.payload.name : state.name;
			state.email = action.payload.email ? action.payload.email : state.email;
			state.isAdmin = action.payload.isAdmin ? action.payload.isAdmin : state.isAdmin;
		},
		login(state: IAppSlice, payload: PayloadAction<string>) {
			state.isLoggedIn = true;
			state.token = payload.payload;
		},
		logout(state: IAppSlice) {
			state.isLoggedIn = false;
			state.token = null;
			state.name = null;
			state.email = null;
			state._id = null;
		},
	},
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
