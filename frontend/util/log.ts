import { logger } from "react-native-logs";

const isDev = __DEV__;

const appLogger = logger.createLogger({
    enabled: true,
    // Em produção, priorize erros; em dev, tudo
    severity: isDev ? 'debug' : 'error',
});

function serialize(value: unknown): string {
    if (typeof value === 'string') return value;
    try {
        return JSON.stringify(value, null, 2);
    } catch (e) {
        return String(value);
    }
}

export default function log(message: unknown, context?: Record<string, unknown>) {
    // Evita logs verbosos em produção
    if (!isDev) return null;

    const msg = serialize(message);
    const ctx = context ? ` ${serialize(context)}` : '';
    const line = `${msg}${ctx}`;

    appLogger.info(line);
}

export const logInfo = (message: unknown, context?: Record<string, unknown>) => log(message, context);