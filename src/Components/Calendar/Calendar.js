import React, { useEffect, useState, useRef } from 'react';
import DayEvents from "../DayEvents/DayEvents";

import Switch from '@material-ui/core/Switch';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import "./Calendar.css"

function Calendar() {


    const [dayNight, setDayNight] = useState(true) //true is for day

    const [daysInCurrentMonth, setDaysInCurrentMonth] = useState([])
    const [currentDay, setCurrentDay] = useState('')
    const [currentMonth, setCurrentMonth] = useState('')
    const [currentYear, setCurrentYear] = useState(0)
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
    const [selectedHours, setSelectedHours] = useState(9)
    const [selectedMinutes, setSelectedMinutes] = useState(30)
    const [events, setEvents] = useState({})

    useEffect(() => {
        setDaysInCurrentMonth([""])
        
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

    useEffect(() => {
        let presentMonth = (new Date().getMonth()+1)
        
        let listOfElements;
        if(document.querySelector(".singleDay-block-light")) {
            listOfElements = [...document.querySelectorAll(".singleDay-block-light")]

            listOfElements.forEach(element => {
                if(element.innerText === String(new Date().getDate())){
                    if(presentMonth === currentMonth ) {
                        element.style.backgroundColor = "#d9b002";
                        element.style.color = "white"
                    } else {
                        element.style.backgroundColor = "";
                        element.style.color = ""
                    } 
                }
        })
        } else if(document.querySelector(".singleDay-block-dark")) {
            listOfElements = [...document.querySelectorAll(".singleDay-block-dark")]

            listOfElements.forEach(element => {
                if(element.innerText === String(new Date().getDate())){
                    if(presentMonth === currentMonth ) {
                        element.style.backgroundColor = "#d9b002";
                        element.style.color = "white"
                    } else {
                        element.style.backgroundColor = "";
                        element.style.color = ""
                    } 
                }
        })
        }

        
        
    },[daysInCurrentMonth, currentMonth, dayNight])

    
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

        
        console.log(day, currentMonth, allMonths[currentMonth]);
    }

    const handleEventNameChange = e => {
        let name = e.target.value
        setEventName(name)
    }

    const handleAddEventClick = () => {
        let fullDate = `${currentDay}-${currentMonth}-${currentYear}`

        let temp = `${currentMonth}-${currentDay}-${currentYear} ${selectedHours}:${selectedMinutes}:00 ${amPm} `
        let formattedDate = new Date(temp)

        if(events[fullDate]){
                setEvents({
                    ...events,
                    [fullDate]: [...events[fullDate],{
                        name: eventName,
                        selectedHours,
                        selectedMinutes,
                        amPm,
                        duration,
                        formattedDate
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
                        duration,
                        formattedDate
                    }]
                })
                setEventName("")
                setDuration("")
        }

    }

    const handlePreviousMonthClick = () => {
        setCurrentMonth(prev => {
            return (
                prev - 1
            )
        })
    }

    const handleNextMonthClick = () => {
        setCurrentMonth(prev => {
            return (
                prev + 1
            )
        })
    }

    const handleDurationChange = e => {
        let durationValue = parseInt(e.target.value)
        if(!isNaN(durationValue)) {
            setDuration(durationValue)
        }
    }


    return (
        <div>
            { popup && 
                <div className={dayNight ? "eventPopup-light" : "eventPopup-dark"}>
                    <HighlightOffIcon onClick={handlePopupClose} fontSize="large" className="eventPopup-close"/>
                    <h3>Add the event details</h3>
                    <div className="event-popup-content">
                        <p>Enter event Name</p>
                        <input type="text" value={eventName} onChange={handleEventNameChange} className={dayNight ? "event-popup-input-light" : "event-popup-input-dark"}/>
                    </div>
                    <div className="event-popup-time">
                        <div>
                            <p>Select Time</p>
                        </div>
                        <div>
                            { hours && 
                                <select className="event-popup-dropdown" onChange={(e) => setSelectedHours(e.target.value)} value={selectedHours}>
                                    { hours.map((hour, hourIndex) => {
                                    return (
                                        <option key={hourIndex}>{hour}</option>
                                    )
                                })}
                                </select>
                            }
                            { minutes && 
                                <select className="event-popup-dropdown" onChange={(e) => setSelectedMinutes(e.target.value)} value={selectedMinutes}>
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
                    <div className="event-popup-content">
                        <p>Duration (minutes)</p>
                        <input type="text" value={duration} onChange={handleDurationChange} className={dayNight ? "event-popup-input-light" : "event-popup-input-dark"}/>
                    </div>
                    <div className="event-popup-date">
                            <p>Event Date</p> 
                            <p>{`${currentDay}-${currentMonth}-${currentYear}`}</p>
                    </div>
                    <button onClick={handleAddEventClick} className="addEvent-button">Add</button>
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
                    <div className="calendar-header">
                        { currentMonth>1 && <NavigateBeforeIcon className={dayNight ? "previous-next-icons-light" : "previous-next-icons-dark"} fontSize="large" onClick={handlePreviousMonthClick}/> }
                        <h1 className="calendar-title">{ allMonths[currentMonth] }</h1>
                        { currentMonth<12 && <NavigateNextIcon className={dayNight ? "previous-next-icons-light" : "previous-next-icons-dark"} fontSize="large" onClick={handleNextMonthClick}/> }
                    </div>
                    <div className="calendar-content">
                        {
                            daysInCurrentMonth && 
                                daysInCurrentMonth.map((day, dayIndex) => {
                                    return (
                                        <div key={dayIndex} className={dayNight ? "singleDay-block-light" : "singleDay-block-dark"} onClick={() => handleDayClick(day)}>
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
