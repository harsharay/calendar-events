import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
// import swal from 'sweetalert';
import Swal from 'sweetalert2'
import DayEvents from "../DayEvents/DayEvents"
import moment from "moment";
import Switch from '@material-ui/core/Switch';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import NightsStayIcon from '@material-ui/icons/NightsStay';

import "./Calendar.css"

function Calendar() {

    const [today, setToday] = useState("")
    const [events, setEvents] = useState({})
    const [clickedDate, setClickedDate] = useState("")
    // const [hourCount, setHourCount] = useState([])
    // const [minutesCount, setMinutesCount] = useState([])
    const [dayNight, setDayNight] = useState(true) //true is for day
    
    const handleToggleChange = () => {
        setDayNight(!dayNight)
    }

    const handleDateClick = (e) => {
        const date = e.dateStr

        // e.dayEl.innerHTML = '<p>Add an event</p>'


        console.log(18, e.dayEl)
        setClickedDate(date)
        Swal.fire({
            title: 'Enter the details of event',
            icon: 'info',
            // input: 'select',
            // inputOptions: hourCount,
            html:
                `<div class="sweetAlert-block">`+
                '<p>Enter the event name</p><input id="eventText" placeholder="type here..." class="title-sweetalert">' +
                '</br>' +
                '<p>Enter the start hours</p><input id="eventHours" placeholder="type here..." class="hours-sweetalert">' +
                '</br>' +
                '<p>Enter the start minutes</p><input id="eventMinutes" placeholder="type here..." class="minutes-sweetalert">'+
                '</br>' +
                '<p>Enter the duration(mins)</p><input id="eventDuration" placeholder="type here..." class="duration-sweetalert">'+
                '</div>',

                // '</br>' +
                // '<p>Enter the event name</p><input id="eventTime" placeholder="type here...">',
            // inputPlaceholder: 'type here...',
            text: `Date: ${date}`,
            button: {
                text: 'Add event'
            },
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                let actualTitle = document.getElementById('eventText').value
                let actualHours = document.getElementById('eventHours').value
                let actualMinutes = document.getElementById('eventMinutes').value
                let actualDuration = document.getElementById('eventDuration').value

                if(actualTitle) {
                    if(!events[date]) {
                        return (
                            setEvents( 
                                {
                                    ...events,
                                    [date]: [{
                                        title: actualTitle,
                                        hours: actualHours,
                                        minutes: actualMinutes,
                                        duration: actualDuration,
                                        date
                                    }]
                                } 
                            )
                        )
                    } else {
                        return (
                            setEvents( 
                                {
                                    ...events,
                                    [date]: [...events[date],{
                                        title: actualTitle,
                                        hours: actualHours,
                                        minutes: actualMinutes,
                                        duration: actualDuration,
                                        date
                                    }]
                                } 
                            )
                        )
                    }
                }
            },
        })
    }




    return (
        <div>
            <div className="calendar-events-block">
                <div className={dayNight ? "events-div-light" : "events-div-dark"}>
                    <div className="events-content">
                        <h4>Your tasks for today</h4>
                        <DayEvents eventsData={events} clickedDate={clickedDate} dayNight={dayNight}/>
                    </div>
                </div>
                <div className={dayNight ? "calendar-div-light" : "calendar-div-dark"}>
                    <div className="calendar-content">
                        <FullCalendar
                            plugins={[ dayGridPlugin, interactionPlugin ]}
                            initialView="dayGridMonth"
                            dateClick={handleDateClick}
                            events={events}
                            headerToolbar={{
                                'left': 'prev',
                                'center': 'title',
                                'right': 'next'
                            }}
                            firstDay = {today}
                        />
                    </div>
                </div>
            </div>
            <div className={dayNight ? "dark-light-toggle-LIGHT" : "dark-light-toggle-DARK"}>
                <Brightness7Icon />
                <Switch
                    // checked={state.checkedB}
                    onChange={handleToggleChange}
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <NightsStayIcon />
            </div>
        </div>
    )
}

export default Calendar
