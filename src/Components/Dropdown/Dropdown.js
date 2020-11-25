import React, { useEffect, useState } from 'react'

function Dropdown() {
    let [range, setRange] = useState([])

    useEffect(() => {
        let limit = 12
        for(let i=1; i<limit;i++){
            setRange([...range, i])
        }
    },[range])

    return (
        <div>
            <select>
                { range.map((item, index) => <option key={index}>{item}</option>) }
            </select>
        </div>
    )
}

export default Dropdown
