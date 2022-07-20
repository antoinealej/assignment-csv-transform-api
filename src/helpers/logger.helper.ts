const loggerHelper = {
  error(...data: unknown[]) {
    console.error(...data);
  },
  info(...data: unknown[]) {
    console.info(...data);
  },
  warn(...data: unknown[]) {
    console.warn(...data);
  },
};

export default loggerHelper;
