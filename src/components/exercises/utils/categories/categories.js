import React from 'react'


export const Categories = (props) => {

    return (
        <div>
            {!!props.categories_map[props.category] ? props.categories_map[props.category].value : ''}
        </div>
    )
}
