import cron from "node-cron";

cron.schedule("* * * * * *", () => {
  console.log("[Macro Cron] Running every second (all stars)");
});
