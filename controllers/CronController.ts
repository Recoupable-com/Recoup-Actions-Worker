import { getScheduledActions } from "../lib/supabase/scheduled_actions/getScheduledActions";
import { runScheduledAction } from "../lib/runScheduledAction";

export async function handleScheduledActions(): Promise<void> {
  const scheduledActions = await getScheduledActions();
  console.log("[CronController] actionsToRun:", scheduledActions);

  for (const action of scheduledActions) {
    await runScheduledAction(action);
  }
}
