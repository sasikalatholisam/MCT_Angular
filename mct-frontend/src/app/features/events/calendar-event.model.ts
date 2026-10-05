/**
 * CalendarEvent — data model for MCT events.
 */
export interface CalendarEvent {
  id:          string;   // unique identifier
  title:       string;   // event name
  date:        string;   // ISO format: YYYY-MM-DD
  time:        string;   // 24-hour format: HH:MM
  venue:       string;   // location
  category:    EventCategory;
  description: string;
  img:         string;   // image path relative to public/
}

/**
 * Allowed event categories.
 * These map to the colour legend and filter chips on the Events page.
 */
export type EventCategory =
  | 'Daily'
  | 'Weekly'
  | 'Monthly'
  | 'Annual'
  | 'Ongoing'
  | 'Special';
