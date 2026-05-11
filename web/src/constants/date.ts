import { formatDate } from "date-fns";

/**
 * Today's date as `yyyy-MM-dd` — computed at call time so it stays fresh
 * across midnight on long-running servers.
 */
export const currentDateISO = () => formatDate(new Date(), "yyyy-MM-dd");
