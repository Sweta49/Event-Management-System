import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import CalendarView from './components/CalendarView';
import { EventType } from './types/event';
import './index.css'; 

const App: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);

  const addOrUpdateEvent = (event: EventType) => {
    setEvents((prev) => {
      const exists = prev.find((e) => e.id === event.id);
      if (exists) {
        return prev.map((e) => (e.id === event.id ? event : e));
      }
      return [...prev, event];
    });
    setEditingEvent(null);
  };

  const handleEdit = (event: EventType) => {
    setEditingEvent(event);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter((ev) => ev.id !== id));
    }
  };

  const cancelEdit = () => {
    setEditingEvent(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Event Management System</h1>
      <EventForm
        onSubmit={addOrUpdateEvent}
        editingEvent={editingEvent}
        events={events}
        cancelEdit={cancelEdit}
      />
      <EventList
        events={events}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CalendarView events={events} />
    </div>
  );
};

export default App;


