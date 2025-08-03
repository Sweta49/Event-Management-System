import React from 'react';
import { EventType } from '../types/event';
import { isPastDate } from '../utils/helpers';

interface Props {
  events: EventType[];
  onEdit: (event: EventType) => void;
  onDelete: (id: string) => void;
}

const EventList: React.FC<Props> = ({ events, onEdit, onDelete }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Events</h2>
      <ul className="space-y-4">
        {events.map(ev => (
          <li key={ev.id} className={`p-4 rounded border ${isPastDate(ev.date) ? 'bg-gray-200' : 'bg-green-100'}`}>
            <h3 className="text-lg font-bold">{ev.title}</h3>
            <p><strong>Date:</strong> {ev.date}</p>
            <p><strong>Venue:</strong> {ev.venue}</p>
            <div className="flex gap-2 mt-2">
              <button className="text-blue-600" onClick={() => onEdit(ev)}>Edit</button>
              <button className="text-red-600" onClick={() => onDelete(ev.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;