import supabase from "../serverClient";
import { Database } from "../../../types/database.types";

export type ScheduledAction =
  Database["public"]["Tables"]["scheduled_actions"]["Row"];

/**
 * Fetches all enabled scheduled actions whose next_run is in the future OR last_run is null, ordered by next_run ascending.
 */
export async function getScheduledActions(): Promise<ScheduledAction[]> {
  const { data, error } = await supabase
    .from("scheduled_actions")
    .select("*")
    .eq("enabled", true)
    .order("next_run", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch scheduled actions: ${error.message}`);
  }
  return data || [];
}
