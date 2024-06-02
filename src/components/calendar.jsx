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
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material";
import { tokens } from "../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8000/accounts/retrieve/events');
        if (response.ok) {
          const events = await response.json();
          setCurrentEvents(events);
        } else {
          const errorData = await response.json();
          setSnackbarMessage(`Failed to fetch events: ${errorData.message}`);
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
      } catch (error) {
        setSnackbarMessage(`Failed to fetch events: ${error.message}`);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    };

    fetchEvents();
  }, []);

  const handleDateClick = async (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      const id = `${selected.dateStr}-${title}`;
      const event = {
        id,
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
            id: event.id,
            title: event.title,
            date: event.start,
          }),
        });

        if (response.ok) {
          calendarApi.addEvent(event);
          setCurrentEvents((prevEvents) => [...prevEvents, event]);
          setSnackbarMessage('Event inserted successfully');
          setSnackbarSeverity('success');
        } else {
          const errorData = await response.json();
          setSnackbarMessage(`Failed to create event: ${errorData.message}`);
          setSnackbarSeverity('error');
        }
      } catch (error) {
        setSnackbarMessage(`Failed to create event: ${error.message}`);
        setSnackbarSeverity('error');
      } finally {
        setSnackbarOpen(true);
      }
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedEvent) {
      try {
        const response = await fetch(`http://localhost:8000/accounts/delete/event/${selectedEvent.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setCurrentEvents((prevEvents) => prevEvents.filter((event) => event.id !== selectedEvent.id));
          setSnackbarMessage('Event deleted successfully');
          setSnackbarSeverity('success');
        } else {
          const errorData = await response.json();
          setSnackbarMessage(`Failed to delete event: ${errorData.message}`);
          setSnackbarSeverity('error');
        }
      } catch (error) {
        setSnackbarMessage(`Failed to delete event: ${error.message}`);
        setSnackbarSeverity('error');
      } finally {
        setSnackbarOpen(true);
        setDeleteDialogOpen(false);
        setSelectedEvent(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedEvent(null);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                button
                onClick={() => handleEventClick(event)}
                sx={{
                  backgroundColor: colors.greenAccent[500],
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
            eventClick={(e) => handleEventClick(e.event)}
            eventsSet={(events) => setCurrentEvents(events)}
          />
        </Box>
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the event '{selectedEvent?.title}'?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar;
