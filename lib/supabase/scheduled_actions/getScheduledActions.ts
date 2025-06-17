import supabase from "../serverClient";
import { Database } from "../../../types/database.types";

export type ScheduledAction =
  Database["public"]["Tables"]["scheduled_actions"]["Row"];

export interface GetScheduledActionsOptions {
  next_run?: string;
}

/**
 * Fetches all enabled scheduled actions, optionally filtering by next_run <= provided value or next_run is null.
 */
export async function getScheduledActions(
  options: GetScheduledActionsOptions = {}
): Promise<ScheduledAction[]> {
  let query = supabase
    .from("scheduled_actions")
    .select("*")
    .eq("enabled", true)
    .order("next_run", { ascending: true });

  if (options.next_run) {
    query = query.or(`next_run.lte.${options.next_run},next_run.is.null`);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(`Failed to fetch scheduled actions: ${error.message}`);
  }
  return data || [];
}
