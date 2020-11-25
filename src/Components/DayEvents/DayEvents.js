import React, { useState, useEffect } from 'react'


import "./DayEvents.css"

function DayEvents({ clickedDate, eventsData, dayNight }) {

    const [eventsOfTheDay, setEventsOfTheDay] = useState([])
    const [noEventForTheDay, setNoEventForTheDay] = useState(true)
    

    useEffect(() => {
        if(eventsData[clickedDate]){
            setNoEventForTheDay(false)
            console.log("Events are present for the day",eventsData[clickedDate])
            setEventsOfTheDay(eventsData[clickedDate])
        } else {
            setNoEventForTheDay(true)
            console.log("no events scheduled for the day")
        }
        
    },[clickedDate, eventsData])

    
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
                                    <p className={dayNight ? "events-hours-light" : "events-hours-dark"}>{item.hours}:{item.minutes}</p>
                                    <p className="events-duration">{item.duration} mins</p>
                                    <p className="events-title">{item.title}</p>
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
