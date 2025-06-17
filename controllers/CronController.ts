import { getScheduledActions } from "../lib/supabase/scheduled_actions/getScheduledActions";

export async function handleScheduledActions(): Promise<void> {
  const scheduledActions = await getScheduledActions();
  console.log("[CronController] Scheduled Actions:", scheduledActions);
}
