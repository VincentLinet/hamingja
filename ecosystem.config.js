module.exports = {
  apps: [
    {
      name: "hamingja",
      append_env_to_name: false,
      script: "yarn build && yarn run",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      exec_mode: "fork",
      env: {
        REACT_APP_ENV: "production",
        PORT: 3500
      }
    }
  ],
  deploy: {
    lectern: {
      user: "root",
      host: "51.38.32.198",
      ref: "origin/main",
      repo: "git@github.com:VincentLinet/hamingja.git",
      path: "/home/amoa/apps/production/lectern",
      "post-deploy": "yarn && pm2 startOrRestart ecosystem.config.js --only hamingja"
    }
  }
};
