import { api } from '@/services/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.post('/login', credentials);
            const userData = response.data;

            // salva token localmente (sem "Bearer " prefix)
            await EncryptedStorage.setItem('userData', JSON.stringify(userData));
            api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;

            return userData;
        } catch (error) {
            return rejectWithValue((error as AxiosError).response?.data || 'Erro no login');
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const token = await EncryptedStorage.getItem('userData');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await api.post('/logout');
        }
    } catch (error) {
        console.log('Erro ao fazer logout no servidor, continuando com logout local:', error);
    } finally {
        await EncryptedStorage.removeItem('userData');
        delete api.defaults.headers.common['Authorization'];
    }

    return { user: null, token: null, isAuthenticated: false };
});

export const loadStoredToken = createAsyncThunk('auth/loadToken', async () => {
    try {
        const storedData = await EncryptedStorage.getItem('userData');
        if (storedData) {
            const userData = JSON.parse(storedData);

            if (userData && userData.token) {
                // Remove "Bearer " se já estiver presente no token
                const cleanToken = userData.token.startsWith('Bearer ')
                    ? userData.token.substring(7)
                    : userData.token;

                // Configura o token no header da API
                api.defaults.headers.common['Authorization'] = `Bearer ${cleanToken}`;

                // Retorna o userData completo com o token limpo
                return {
                    ...userData,
                    token: cleanToken
                };
            }
        }
        return null;
    } catch (error) {
        console.error('Erro ao carregar dados do storage:', error);
        return null;
    }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (data: { name: string; currentPassword: string; newPassword: string }, { rejectWithValue }) => {
    try {
        const response = await api.put('/profile', data);
        const userData = response.data;

        // salva token localmente (sem "Bearer " prefix)
        await EncryptedStorage.setItem('userData', JSON.stringify(userData));
        api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;

        return userData;
    } catch (error) {
        return rejectWithValue((error as AxiosError).response?.data || 'Erro ao atualizar perfil');
    }
});

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserData {
    user: User;
    token: string;
    isAuthenticated: boolean;
}

interface AuthState {
    userData: UserData | null;
    loading: boolean;
    error: string | null;
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userData: null as UserData | null,
        loading: false,
        error: null as string | null,
    },
    reducers: {
        setCredentials: (state: AuthState, action: { payload: { userData: UserData } }) => {
            console.log(action.payload);
            console.log('--------------------------------');
            state.userData = action.payload.userData;
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
                state.userData = action.payload;

            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as any).message as string | null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.userData = null;
            })
            .addCase(loadStoredToken.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadStoredToken.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload || null;
            })
            .addCase(loadStoredToken.rejected, (state) => {
                state.loading = false;
                state.userData = null;
            });
    },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
