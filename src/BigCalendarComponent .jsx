import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import Modal from 'react-modal';

const localizer = momentLocalizer(moment);

const BigCalendarComponent = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Event 1',
      start: new Date(2023, 7, 10, 10, 0),
      end: new Date(2023, 7, 10, 12, 0),
      description: 'This is Event 1',
    },
    {
      id: 2,
      title: 'Event 2',
      start: new Date(2023, 7, 15, 14, 0),
      end: new Date(2023, 7, 15, 16, 0),
      description: 'This is Event 2',
    },
    // Add more events as needed
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleSlotSelect = (slotInfo) => {
    const title = window.prompt('Enter event title:');
    if (title) {
      const newEvent = {
        id: events.length + 1,
        title,
        start: slotInfo.start,
        end: slotInfo.end,
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleEventUpdate = (event) => {
    const newTitle = window.prompt('Enter new event title:', event.title);
    if (newTitle) {
      const updatedEvents = events.map((ev) =>
        ev.id === event.id ? { ...ev, title: newTitle } : ev
      );
      setEvents(updatedEvents);
      setSelectedEvent(null);
    }
  };

  console.log(events)

  return (
    <div style={{ height: 500, minWidth: 600 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        selectable
        onSelectEvent={handleEventClick}
        onSelectSlot={handleSlotSelect}
      />

      <Modal
        isOpen={!!selectedEvent}
        onRequestClose={() => setSelectedEvent(null)}
      >
        {selectedEvent && (
          <div>
            <h2>{selectedEvent.title}</h2>
            <p>{selectedEvent.description}</p>
            <button onClick={() => handleEventUpdate(selectedEvent)}>
              Update Event
            </button>
            <button
              onClick={() =>
                setEvents(events.filter((ev) => ev.id !== selectedEvent.id))
              }
            >
              Delete Event
            </button>
            <button onClick={() => setSelectedEvent(null)}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BigCalendarComponent;
