import React, {useState} from 'react'


export const AddDay = (props) => {
    let [name, setName] = useState(`Day ${props.index + 1}`)

    
    return (
        <div>
            <input name='day_name' value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={() => props.onSubmit(name)} >Save </button>
        </div>
    )
}
