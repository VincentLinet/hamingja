export default {
  app: {
    port: 9000
  },
  databases: {
    default: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_BASE,
      port: process.env.DB_PORT
    }
  },
  experience: {
    cooldown: 2,
    choice: "1492993796286447686"
  }
};
