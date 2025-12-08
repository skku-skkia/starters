import pino from "pino";

const logger = pino({
  level: process.env.NODE_ENV === "development" ? "debug" : "warn",
  browser: {
    write: (o) => {
      const { msg } = o as Record<string, string>;

      if (process.env.NODE_ENV === "development") {
        console.log(`${msg}`);
      }
    },
  },
});

export default logger;
