import { getScheduledActions } from "../lib/supabase/scheduled_actions/getScheduledActions";
import { runScheduledAction } from "../lib/runScheduledAction";
import { updateScheduledAction } from "../lib/supabase/scheduled_actions/updateScheduledAction";
import { getNextRun } from "../lib/getNextRun";
import { sleep } from "../lib/utils/sleep";

export async function handleScheduledActions(): Promise<void> {
  const now = new Date();
  const scheduledActions = await getScheduledActions({
    next_run: now.toISOString(),
  });
  console.log("[CronController] actionsToRun:", scheduledActions);

  for (let i = 0; i < scheduledActions.length; i++) {
    console.log(
      `[CronController] Running action ${i + 1} of ${scheduledActions.length}`
    );
    const action = scheduledActions[i];
    await runScheduledAction(action);
    const nextRun = getNextRun(action.schedule);
    await updateScheduledAction({
      id: action.id,
      last_run: now.toISOString(),
      next_run: nextRun,
    });
    // Sleep for 1 minute between actions, except after the last one
    // This is a hack to ensure the actions do not exceed Anthropic's rate limit
    // TODO: truly wait for the action to complete for proper queueing
    if (i < scheduledActions.length - 1) {
      await sleep(60000);
    }
  }
}
