import {
  getScheduledActions,
  ScheduledAction,
} from "../lib/supabase/scheduled_actions/getScheduledActions";
import parser from "cron-parser";

function shouldRunAction(action: ScheduledAction, now: Date): boolean {
  if (!action.enabled) return false;
  if (!action.schedule) return false;

  // If never run, and next_run is now or earlier, run it
  if (!action.last_run) {
    if (!action.next_run) return true; // If next_run and last_run are null, run it
    return new Date(action.next_run) <= now;
  }

  // If next_run is now or earlier, and last_run is before next_run, run it
  if (action.next_run && new Date(action.next_run) <= now) {
    if (
      !action.last_run ||
      new Date(action.last_run) < new Date(action.next_run)
    ) {
      return true;
    }
  }

  // Fallback: use cron-parser to check if a run is due
  try {
    const interval = parser.parseExpression(action.schedule, {
      currentDate: now,
    });
    const prev = interval.prev().toDate();
    // If last_run is before the previous scheduled time, it's due
    if (!action.last_run || new Date(action.last_run) < prev) {
      return true;
    }
  } catch (e) {
    console.error(
      `[CronController] Invalid cron schedule for action ${action.id}:`,
      action.schedule
    );
  }
  return false;
}

export async function handleScheduledActions(): Promise<void> {
  const scheduledActions = await getScheduledActions();
  const now = new Date();
  const actionsToRun = scheduledActions.filter((action) =>
    shouldRunAction(action, now)
  );
  console.log("[CronController] actionsToRun:", actionsToRun);
}
