// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://1b8db4cc568fe7be90c9f1dda733b566@o4512118581690368.ingest.us.sentry.io/4512118590930944",
  integrations: [Sentry.mongooseIntegration()],
  // Tracing
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/node/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
});