import React, {useState} from 'react'

import Day from './day'

export const NewDay = (props) => {
    let [day, setDay] = useState({name: null, workout_blocks: []})


    return (
        <Day new index={props.index} day={day} addDay={props.onSubmit}/>
    )
}
