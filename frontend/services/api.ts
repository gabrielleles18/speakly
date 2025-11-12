import { ENV } from "@/env";
import axios from "axios";
import EncryptedStorage from 'react-native-encrypted-storage';

export const api = axios.create({
    baseURL: ENV.API_BASE_URL,
    timeout: ENV.REQUEST_TIMEOUT,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Interceptor para adicionar token de autenticação em cada requisição
api.interceptors.request.use(
    async (config) => {
        try {
            const userData = await EncryptedStorage.getItem('userData');
            const token = JSON.parse(userData || '{}').token;
            if (token) {
                // Remove "Bearer " se já estiver presente no token
                const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token;
                config.headers.Authorization = `Bearer ${cleanToken}`;
                console.debug("api - Token adicionado à requisição:", config.url, cleanToken.substring(0, 20) + '...');
            } else {
                console.debug("api - Nenhum token encontrado para:", config.url);
            }
        } catch (error) {
            console.error("api - Erro ao buscar token:", error);
        }
        return config;
    },
    (error) => {
        console.error("api - Erro no interceptor de requisição:", error);
        return Promise.reject(error);
    },
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
    (response) => {
        console.debug("api - Resposta bem-sucedida:", response.config.url);
        return response;
    },
    async (error) => {
        console.debug(
            "api - Erro na resposta:",
            error.config?.url,
            error.response?.status,
        );

        try {
            const url = error.config?.url;
            const method = error.config?.method;
            const status = error.response?.status;
            const code = error.code;
            const snippet = typeof error.response?.data === "string"
                ? error.response?.data?.slice(0, 500)
                : JSON.stringify(error.response?.data)?.slice(0, 500);


            const wrappedError = new Error(
                `API ${method?.toUpperCase?.() || ""} ${url} failed with status ${status} (${code || "no-code"})\nBody: ${snippet}`
            );

            console.debug("api - Erro na resposta:", wrappedError);
        } catch (reportErr) {
            console.debug("api - Falha ao reportar erro ao Crashlytics", reportErr);
        }

        return Promise.reject(error);
    },
);