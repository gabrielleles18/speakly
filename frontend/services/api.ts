import { ENV } from "@/env";
import axios from "axios";

export const api = axios.create({
    baseURL: ENV.API_BASE_URL,
    timeout: ENV.REQUEST_TIMEOUT,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

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