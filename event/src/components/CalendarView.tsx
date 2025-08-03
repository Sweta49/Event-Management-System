import React from 'react';
import  { FC } from 'react';

import { EventType } from '../types/event';

interface Props {
  events: EventType[];
}

const CalendarView: React.FC<Props> = ({ events }) => {
  const grouped = events.reduce((acc: Record<string, EventType[]>, ev) => {
    if (!acc[ev.date]) {
      acc[ev.date] = [];
    }
    acc[ev.date].push(ev);
    return acc;
  }, {});

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Calendar View</h2>
      {Object.keys(grouped).sort().map((date) => (
        <div key={date} className="mb-4">
          <h4 className="font-semibold">📅 {date}</h4>
          <ul className="ml-4 list-disc">
            {grouped[date].map((ev) => (
              <li key={ev.id}>
                {ev.title} at {ev.venue}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CalendarView;
