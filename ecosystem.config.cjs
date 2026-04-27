module.exports = {
  apps: [
    {
      name: "hamingja",
      script: "yarn",
      args: "launch",
      env: {
        REACT_APP_ENV: "production",
        PORT: 3500
      }
    }
  ],

  deploy: {
    production: {
      user: "root",
      host: "51.38.32.198",
      ref: "origin/main",
      repo: "git@github.com:VincentLinet/hamingja.git",
      path: "/home/vincent/apps/hamingja",
      "post-deploy": "yarn install && yarn build && pm2 reload ecosystem.config.cjs --only hamingja"
    }
  }
};
