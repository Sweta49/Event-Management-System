import React, { useState, useEffect } from 'react';
import { EventType } from '../types/event';
import { hasVenueDateConflict } from '../utils/helpers';

interface Props {
  onSubmit: (event: EventType) => void;
  editingEvent: EventType | null;
  events: EventType[];
  cancelEdit: () => void;
}

const EventForm: React.FC<Props> = ({ onSubmit, editingEvent, events, cancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDescription(editingEvent.description);
      setVenue(editingEvent.venue);
      setDate(editingEvent.date);
    }
  }, [editingEvent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !venue || !date) return setError('All fields are required');
    if (hasVenueDateConflict(events, venue, date, editingEvent?.id || null)) return setError('Venue and date conflict with another event.');

    const newEvent: EventType = {
      id: editingEvent?.id || Date.now().toString(),
      title,
      description,
      venue,
      date,
    };
    onSubmit(newEvent);
    setTitle(''); setDescription(''); setVenue(''); setDate(''); setError('');
  };

  return (
    <form className="space-y-4 p-4 border rounded" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold">{editingEvent ? 'Edit' : 'Add'} Event</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input className="input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="input" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input className="input" placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} />
      <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <div className="flex gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">{editingEvent ? 'Update' : 'Add'}</button>
        {editingEvent && <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={cancelEdit}>Cancel</button>}
      </div>
    </form>
  );
};

export default EventForm;
