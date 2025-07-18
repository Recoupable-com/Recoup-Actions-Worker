import cron from "node-cron";
import { handleScheduledActions } from "./controllers/CronController";

// Runs every 15 minutes
cron.schedule("*/15 * * * *", async () => {
  console.log("[Macro Cron] Running every 15 minutes");
  await handleScheduledActions();
});
