import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiLogin, ApiRegister, TUser, TLogin, TApiLogin, TApiRegister } from "./api"

export const loginUser = createAsyncThunk<TApiLogin, TLogin>(
	"auth/login",
	async (data, ThunkApi) => {
		try {
			return await ApiLogin(data);
		} catch (error) {
			return ThunkApi.rejectWithValue(error);
		}
	}
);
export const registerUser = createAsyncThunk<TApiRegister, Omit<TUser, "id">>(
	"auth/register",
	async (data, ThunkApi) => {
		try {
			return await ApiRegister(data)
		} catch (error) {
			return ThunkApi.rejectWithValue(error)
		}
	}
)
export type TState = {
	user: null | Omit<TUser, "password"> | TUser,
	token: null | string,
	error: null | string,
	loading: boolean
}

const authSlide = createSlice({
	name: "auth",
	initialState: {
		user: null,
		token: null,
		error: null,
		loading: false
	},
	reducers: {
		logout: (state: TState) => {
			state.user = null;
			state.token = null;
			localStorage.removeItem("auth");
		},
		clearError: (state: TState) => {
			state.error = null;
		},
		loadUserFromStorage: (state: TState) => {
			const saved = JSON.parse(localStorage.getItem('auth')!);
			if (saved) {
				state.user = saved.user;
				state.token = saved.token;
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state: TState) => {
				state.loading = true;
			})
			.addCase(loginUser.fulfilled, (state: TState, action) => {
				state.loading = false;
				state.token = (action as { payload: { token: string } }).payload.token;
				state.user = (action as { payload: { user: Omit<TUser, "password"> } }).payload.user;
				localStorage.setItem('auth', JSON.stringify({ user: state.user, token: state.token }));
			})
			.addCase(loginUser.rejected, (state: TState, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(registerUser.pending, (state: TState) => {
				state.loading = true
			})
			.addCase(registerUser.fulfilled, (state: TState, action) => {
				state.loading = false;
				state.user = action.payload?.user as TUser;
				state.token = action.payload?.token as string;
				localStorage.setItem('auth', JSON.stringify({ user: state.user, token: state.token }));
			})
			.addCase(registerUser.rejected, (state: TState, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
	},
});

export const { loadUserFromStorage, logout, clearError } = authSlide.actions;
export default authSlide.reducer;