import { EventType } from '../types/event';

export const isPastDate = (date: string): boolean => {
  return new Date(date) < new Date();
};

export const hasVenueDateConflict = (
  events: EventType[],
  venue: string,
  date: string,
  id: string | null = null
): boolean => {
  return events.some(ev => ev.venue === venue && ev.date === date && ev.id !== id);
};
