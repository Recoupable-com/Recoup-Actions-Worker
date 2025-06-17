import { CronExpressionParser } from "cron-parser";

/**
 * Returns the next run ISO string for a given cron schedule and current date, or null if parsing fails.
 */
export function getNextRun(schedule: string): string | null {
  try {
    const now = new Date();
    const interval = CronExpressionParser.parse(schedule, { currentDate: now });
    return interval.next().toISOString();
  } catch (e) {
    console.error(`[getNextRun] Failed to parse cron:`, e);
    return null;
  }
}
