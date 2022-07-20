const config = {
  port: process.env.PORT || 3000,
  mongo: {
    url: process.env.MONGODB_URI || "",
    dbName: process.env.MONGODB_DB || "",
  },
};

export default config;
