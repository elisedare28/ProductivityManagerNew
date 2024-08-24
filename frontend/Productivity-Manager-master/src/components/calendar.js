import React from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = ({tasklist}) => {
    const events = tasklist.map(task => ({
        title: task.task,
        start: new Date(task.deadline),
        end: new Date(task.deadline),
        allday: true,
    }));

    return (
        <div className="myCustomHeight">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                views={{ month: true }} 
                defaultView="month"
            />
        </div>
    );
};

export default MyCalendar;
