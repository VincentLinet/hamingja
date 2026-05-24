module.exports = {
  apps: [
    {
      name: "hamingja",
      script: "dist/main.cjs",
      interpreter: "yarn",
      interpreter_args: "node",
      autorestart: true,
      restart_delay: 100,
      max_restarts: 20,
      exp_backoff_restart_delay: 100,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
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
      "post-deploy":
        "yarn install --frozen-lockfile && yarn build && pm2 startOrReload ecosystem.config.cjs --env production --only hamingja && pm2 save"
    }
  }
};
