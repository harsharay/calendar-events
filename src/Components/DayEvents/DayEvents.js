import React, { useState, useEffect } from 'react'


import "./DayEvents.css"

function DayEvents({ clickedDate, events, dayNight }) {

    const [eventsOfTheDay, setEventsOfTheDay] = useState([])
    const [noEventForTheDay, setNoEventForTheDay] = useState(true)
    

    useEffect(() => {
        if(events[clickedDate]){
            setNoEventForTheDay(false)
            console.log("Events are present for the day",events[clickedDate])
            setEventsOfTheDay(events[clickedDate])
        } else {
            setNoEventForTheDay(true)
            console.log("no events scheduled for the day")
        }
        
    },[clickedDate, events])

    
    return (
        <div>
            <p>{clickedDate}</p>
            { !noEventForTheDay 
                ?
                <div>
                    <div className="events-block">
                        { eventsOfTheDay.map((item, index) => {
                            return (
                                <div key={index} className="events-for-the-day">
                                    <p className={dayNight ? "events-hours-light" : "events-hours-dark"}>{item.selectedHours}:{item.selectedMinutes} {item.amPm}</p>
                                    <p className="events-duration">{item.duration} mins</p>
                                    <p className="events-title">{item.name}</p>
                                </div>
                            )
                        }) }
                    </div>
                </div>
                :
                    <h3>No scheduled events</h3>
            }
            
        </div>
    )
}

export default DayEvents