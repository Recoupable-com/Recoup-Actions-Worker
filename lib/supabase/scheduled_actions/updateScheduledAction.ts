import supabase from "../serverClient";
import { ScheduledAction } from "./getScheduledActions";

/**
 * Updates a scheduled action row in the scheduled_actions table.
 * @param update - Partial ScheduledAction with at least the id field.
 */
export async function updateScheduledAction(
  update: Partial<ScheduledAction> & { id: string }
): Promise<void> {
  const { id, ...fields } = update;
  const { error } = await supabase
    .from("scheduled_actions")
    .update(fields)
    .eq("id", id);
  if (error) {
    throw new Error(
      `Failed to update scheduled action ${id}: ${error.message}`
    );
  }
}
