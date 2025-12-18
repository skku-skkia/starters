const logger = {
  debug: (msg: string) => {
    console.log(`DEBUG: ${msg}`);
  },
  warn: (msg: string) => {
    console.warn(`WARN: ${msg}`);
  },
  info: (msg: string) => {
    console.info(`INFO: ${msg}`);
  },
  error: (msg: string) => {
    console.error(`ERROR: ${msg}`);
  },
};

export default logger;
