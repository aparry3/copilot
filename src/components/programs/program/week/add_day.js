import React, {useState} from 'react'

import Day from './day'

export const AddDay = (props) => {
    let [day, setDay] = useState({name: null})


    return (
        <Day new index={props.index} day={day} addDay={props.onSubmit}/>
    )
}
