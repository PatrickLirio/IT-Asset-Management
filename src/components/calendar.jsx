import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { formatDate } from '@fullcalendar/core';
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8000/accounts/retrieve/events');
        const data = await response.json();
        const events = data.map(event => ({
          id: event.id,
          title: event.title,
          start: event.date,
        }));
        setCurrentEvents(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDateClick = async (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      };

      try {
        const response = await fetch('http://localhost:8000/accounts/create/event', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newEvent.title,
            date: newEvent.start,
          }),
        });

        if (response.ok) {
          calendarApi.addEvent(newEvent);
          setCurrentEvents(prevEvents => [...prevEvents, newEvent]);
          alert('Event successfully created');
        } else {
          alert('Failed to create event');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to create event');
      }
    }
  };

  const handleEventClick = async (selected) => {
    const eventId = selected.event.id;

    if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
      try {
        const response = await fetch(`http://localhost:8000/accounts/delete/event/${eventId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          selected.event.remove();
          setCurrentEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
          alert('Event successfully deleted');
        } else {
          alert('Failed to delete event');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to delete event');
      }
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[700]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[600],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents} // Use currentEvents for dynamic events
            eventContent={(eventInfo) => (
              <div
                style={{
                  backgroundColor: '#3498db',
                  color: 'white',
                  borderRadius: '5px',
                  padding: '2px 5px',
                  fontSize: '12px',
                }}
              >
                {eventInfo.event.title}
              </div>
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
