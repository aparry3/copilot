import React from 'react'


export const Categories = (props) => {
    return (
        <div>
            {props.categories.join(', ')}
        </div>
    )
}
