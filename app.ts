import cron from "node-cron";
import { handleScheduledActions } from "./controllers/CronController";

// Runs every 5 seconds
cron.schedule("*/5 * * * * *", async () => {
  console.log("[Macro Cron] Running every 5 seconds");
  await handleScheduledActions();
});
