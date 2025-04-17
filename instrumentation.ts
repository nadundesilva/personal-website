import * as Sentry from "@sentry/nextjs";

const defaultSentryInitConfig = {
    dsn: "https://639f507631857dffcfd70a636765a5c0@o4507214991917056.ingest.us.sentry.io/4507287404544000",
    tracesSampleRate: 1,
    debug: false,
};

export const onRequestError = Sentry.captureRequestError;

export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        Sentry.init({
            ...defaultSentryInitConfig,
            enabled: process.env.NODE_ENV === "production",
            spotlight: process.env.NODE_ENV === "development",
        });
    }

    if (process.env.NEXT_RUNTIME === "edge") {
        Sentry.init({
            ...defaultSentryInitConfig,
            enabled: process.env.NODE_ENV === "production",
        });
    }
}
