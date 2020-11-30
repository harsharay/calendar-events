import React, { useEffect, useState, useRef } from 'react';
import DayEvents from "../DayEvents/DayEvents";

import Switch from '@material-ui/core/Switch';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import NightsStayIcon from '@material-ui/icons/NightsStay';

import "./Calendar.css"

function Calendar() {


    const [dayNight, setDayNight] = useState(true) //true is for day

    const [daysInCurrentMonth, setDaysInCurrentMonth] = useState([])
    const [currentDay, setCurrentDay] = useState('')
    const [currentMonth, setCurrentMonth] = useState('')
    const [currentYear, setCurrentYear] = useState(0)
    const [currentCompleteDate, setCurrentCompleteDate] = useState("")
    const [allMonths, setAllMonths] = useState({
        1 : 'January',
        2 : 'February',
        3 : 'March',
        4 : 'April',
        5 : 'May',
        6: 'June',
        7 : 'July',
        8 : 'August',
        9 : 'September',
        10: 'October',
        11 : 'November',
        12 : 'December'
    })
    const [popup, setPopup] = useState(false)
    const [eventName, setEventName] = useState("")
    const [hours, setHours] = useState([])
    const [minutes, setMinutes] = useState([])
    const [duration, setDuration] = useState("")
    const [amPm, setAmPm] = useState('AM')
    const [clickedDate, setClickedDate] = useState('')
    const [selectedHours, setSelectedHours] = useState(0)
    const [selectedMinutes, setSelectedMinutes] = useState(0)
    const [events, setEvents] = useState({})

    useEffect(() => {
        // let presentMonth = (new Date().getMonth()+1)
        // let presentYear = new Date().getFullYear()
        console.log(49, currentMonth)
        if(currentMonth) {
            let numOfDays = new Date(currentYear, currentMonth, 0).getDate()
            for(let i=1;i<=numOfDays;i++){
                setDaysInCurrentMonth(prevValue => {
                    return (
                        [...prevValue, i]
                    )
                })
            }
        }
        
    },[currentMonth, currentYear])

    useEffect(() => {
        let presentMonth = (new Date().getMonth()+1)
        let presentYear = new Date().getFullYear()

        setCurrentMonth(presentMonth)
        setCurrentYear(presentYear)

        for(let i=1; i<=12;i++) {
            setHours(prevValue => {
                return (
                    [...prevValue, i]
                )
            })
        }

        for(let i=1; i<=60;i++) {
            setMinutes(prevValue => {
                return (
                    [...prevValue, i]
                )
            })
        }
    },[])

    
    const handleToggleChange = () => {
        setDayNight(!dayNight)
    }
    
    const handlePopupClose = () => {
        setPopup(false)
    }

    const handleDayClick = day => {
        setPopup(true);
        setCurrentDay(day)
        const clickedDate = `${day}-${currentMonth}-${currentYear}` 
        setClickedDate(clickedDate)
        console.log(91, clickedDate, currentCompleteDate)

        // setCurrentDate()
        console.log(day, currentMonth, allMonths[currentMonth]);
    }

    const handleEventNameChange = e => {
        let name = e.target.value
        setEventName(name)
    }

    const handleAddEventClick = () => {
        let fullDate = `${currentDay}-${currentMonth}-${currentYear}`
        setCurrentCompleteDate(fullDate)
        if(events[fullDate]){
                setEvents({
                    ...events,
                    [fullDate]: [...events[fullDate],{
                        name: eventName,
                        selectedHours,
                        selectedMinutes,
                        amPm,
                        duration
                    }]
                })
                setEventName("")
                setDuration("")
        } else {
                setEvents({
                    ...events,
                    [fullDate]: [{
                        name: eventName,
                        selectedHours,
                        selectedMinutes,
                        amPm,
                        duration
                    }]
                })
                setEventName("")
                setDuration("")
        }

    }


    return (
        <div>
            { popup && 
                <div className="eventPopup">
                    <HighlightOffIcon onClick={handlePopupClose}/>
                    <h3>Add the event details</h3>
                    <div className="event-popup-content">
                        <p>Enter event Name</p>
                        <input type="text" value={eventName} onChange={handleEventNameChange} className="event-popup-input"/>
                    </div>
                    <div className="event-popup-time">
                        <div>
                            <p>Select Time</p>
                        </div>
                        <div>
                            { hours && 
                                <select className="event-popup-dropdown" onChange={(e) => setSelectedHours(e.target.value)}>
                                    { hours.map((hour, hourIndex) => {
                                    return (
                                        <option key={hourIndex}>{hour}</option>
                                    )
                                })}
                                </select>
                            }
                            { minutes && 
                                <select className="event-popup-dropdown" onChange={(e) => setSelectedMinutes(e.target.value)}>
                                    { minutes.map((minute, minuteIndex) => {
                                    return (
                                        <option key={minuteIndex}>{minute}</option>
                                    )
                                })}
                                </select>
                            }
                            <select className="event-popup-dropdown" onChange={(e) => setAmPm(e.target.value)}>
                                { ['AM','PM'].map((item, index) => {
                                    return (
                                        <option key={index}>{item}</option>
                                    )
                                }) }
                            </select>
                        </div>
                    </div>
                    <div>
                        <p>Enter duration of the event(minutes)</p>
                        <input type="text" value={duration} onChange={e => setDuration(e.target.value)} className="event-popup-input"/>
                    </div>
                    <div className="event-popup-date">
                            <p>Event Date</p> 
                            <p>{`${currentDay}-${currentMonth}-${currentYear}`}</p>
                    </div>
                    <button onClick={handleAddEventClick}>Add event</button>
                </div>   
            }
            <div className="calendar-events-block">
                <div className={dayNight ? "events-div-light" : "events-div-dark"}>
                    <div className="events-content">
                        <h4>Your tasks for today</h4>
                        <DayEvents events={events} clickedDate={clickedDate} dayNight={dayNight}/>
                    </div>
                </div>
                <div className={dayNight ? "calendar-div-light" : "calendar-div-dark"}>
                    <h1 className="calendar-title">{ allMonths[currentMonth] }</h1>
                    <div className="calendar-content">
                        {
                            daysInCurrentMonth && 
                                daysInCurrentMonth.map((day, dayIndex) => {
                                    return (
                                        <div key={dayIndex} className="singleDay-block" onClick={() => handleDayClick(day)}>
                                            <p>{day}</p>
                                        </div>
                                    )
                                })
                        }
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