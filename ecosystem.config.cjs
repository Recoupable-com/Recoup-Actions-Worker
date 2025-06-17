module.exports = {
    apps: [
      {
        name: "recoup-actions-worker",
        script: "bun",
        args: "start",
        cron_restart: "0 */12 * * *",
        watch: false,
        autorestart: true,
      },
    ],
  };