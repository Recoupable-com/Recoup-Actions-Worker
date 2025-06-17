import { getScheduledActions } from "../lib/supabase/scheduled_actions/getScheduledActions";
import { runScheduledAction } from "../lib/runScheduledAction";
import { updateScheduledAction } from "../lib/supabase/scheduled_actions/updateScheduledAction";
import { getNextRun } from "../lib/getNextRun";

export async function handleScheduledActions(): Promise<void> {
  const now = new Date();
  const scheduledActions = await getScheduledActions({
    next_run: now.toISOString(),
  });
  console.log("[CronController] actionsToRun:", scheduledActions);

  for (const action of scheduledActions) {
    await runScheduledAction(action);
    const nextRun = getNextRun(action.schedule);
    await updateScheduledAction({
      id: action.id,
      last_run: now.toISOString(),
      next_run: nextRun,
    });
  }
}
