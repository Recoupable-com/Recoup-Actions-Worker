import cron from "node-cron";
import { handleScheduledActions } from "./controllers/CronController";

// Runs every minute
cron.schedule("* * * * *", async () => {
  console.log("[Macro Cron] Running every minute");
  await handleScheduledActions();
});
