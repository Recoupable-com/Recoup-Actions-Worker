import { ScheduledAction } from "./supabase/scheduled_actions/getScheduledActions";

export async function runScheduledAction(
  action: ScheduledAction
): Promise<void> {
  const messages = [
    {
      role: "user",
      parts: [
        {
          type: "text",
          text: action.prompt,
        },
      ],
    },
  ];
  const body = {
    messages,
    artistId: action.artist_account_id,
    accountId: action.account_id,
  };
  try {
    await fetch("https://chat.recoupable.com/api/chat/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(
      `[runScheduledAction] Failed to call chat API for action ${action.id}:`,
      err
    );
  }
}
