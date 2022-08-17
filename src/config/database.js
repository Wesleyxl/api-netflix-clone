module.exports = {
  dialect: process.env.DB_CONNECTION || "mysql",
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "api_node",
  define: {
    timestamps: true,
    underscored: true,
  },
};
