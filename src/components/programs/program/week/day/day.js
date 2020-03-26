import React, {useEffect, useState} from 'react'

import Block from './block'


export const Day = (props) => {
    return (
        <div>
            <span>{!!props.day.name ? props.day.name : `Day ${props.index}`}</span>
            {
                props.day.workout_blocks.map(b => (
                    <Block block={b}/>
                ))
            }
        </div>
    )
}
