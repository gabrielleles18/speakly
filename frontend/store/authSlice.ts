import { api } from '@/services/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';


export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.post('/login', credentials);
            const { token, user, isAuthenticated } = response.data;

            // salva token localmente
            await EncryptedStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            return { user, token };
        } catch (error) {
            return rejectWithValue((error as AxiosError).response?.data || 'Erro no login');
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const token = await EncryptedStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await api.post('/logout');
        }
    } catch (error) {
        console.log('Erro ao fazer logout no servidor, continuando com logout local:', error);
    } finally {
        await EncryptedStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
    }

    return { user: null, token: null, isAuthenticated: false };
});

export const loadStoredToken = createAsyncThunk('auth/loadToken', async () => {
    const token = await EncryptedStorage.getItem('token');
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return token;
    }
    return null;
});

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null as User | null,
        token: null as string | null,
        isAuthenticated: false as boolean,
        loading: false,
        error: null as string | null,
    },
    reducers: {
        setCredentials: (state: AuthState, action: { payload: { user: User; token: string, isAuthenticated: boolean } }) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = !!action.payload.token;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = !!action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as any).message as string | null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            })
            .addCase(loadStoredToken.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadStoredToken.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                state.isAuthenticated = !!action.payload;
            })
            .addCase(loadStoredToken.rejected, (state) => {
                state.loading = false;
                state.token = null;
                state.isAuthenticated = false;
            });
    },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
