import { getScheduledActions } from "../lib/supabase/scheduled_actions/getScheduledActions";

export async function handleScheduledActions(): Promise<void> {
  const scheduledActions = await getScheduledActions();
  console.log("[CronController] actionsToRun:", scheduledActions);

  for (const action of scheduledActions) {
    const messages = [
      {
        role: "user",
        content: action.prompt,
      },
    ];
    // Minimal POST body, can be expanded as needed
    const body = {
      messages,
      artistId: action.artist_account_id,
      accountId: action.account_id,
    };
    fetch("https://chat.recoupable.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch((err) => {
      console.error(
        `[CronController] Failed to call chat API for action ${action.id}:`,
        err
      );
    });
  }
}
