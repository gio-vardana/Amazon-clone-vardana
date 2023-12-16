import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoggedIn: false,
	isLoaded: false,
	email: "",
	exp: 0,
	iat: 0,
	nameid: "",
	nbf: 0,
	role: undefined,
	unique_name: "",
	cartItems: {		
		isLoading: true,
		isLoaded: false,
		isError: false,
		data: {},
	},
};



const usersSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		handleLogin: (state, { payload }) => {
			state.isLoggedIn = true; 
			for (let key in payload) {
				state[key] = payload[key];
			}
		},
		
		handleLogout: (state) => {
			localStorage.removeItem("token");
			window.location.href = "/";
		},
		
		handleInputChange(state, { payload }) {
			state[payload.name] = payload.value;
		},
	},

	
});

export const {
	handleLogin,
	handleLogout,
	handleInputChange,
} = usersSlice.actions;
export default usersSlice.reducer;