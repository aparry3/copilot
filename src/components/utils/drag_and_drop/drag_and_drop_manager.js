import React, {useState, useEffect, useRef} from 'react'
import update from 'immutability-helper'

import DragAndDrop, {Drop} from './drag_and_drop_item'
import {useDrop} from 'react-dnd'

export const DragAndDropManager = (props) => {
    let [dnd_items, setDndItems] = useState(props.items)
    let ref = useRef(null)

    useEffect(() => {
        setDndItems(props.items)
    }, [props.items])

    function insert(index, item) {

        let splice_array = [[index, 0, JSON.parse(JSON.stringify(item.element))]]
        if (!!item.remove) {
            let new_dnd_items = []
            if (item.parent != props.parent) {
                item.remove()
            } else {
                splice_array = [[item.index, 1], [index, 0, dnd_items[item.index]]]
            }
            new_dnd_items = update(dnd_items, {
                $splice: splice_array
            })
            setDndItems(new_dnd_items)
            props.persist(new_dnd_items)
        }

        return index
    }

    function remove(index) {
        let new_dnd_items = update(dnd_items, {
            $splice: [[index, 1]]
        })
        setDndItems(new_dnd_items)
        props.persist(new_dnd_items)
        return new_dnd_items
    }
    return (
        <>
        {
            dnd_items.map((e,i) => (
                <DragAndDrop
                    key={`${props.parent}-${i}`}
                    parent={props.parent}
                    accept={props.accept}
                    element={props.element}
                    insert={(elem) => insert(i, elem)}
                    remove={() => remove(i)}
                    index={i}
                    renderItem={(r) => props.renderItem(e, i, r)}/>

            ))
        }
        {!!props.renderAddItem && (
                <Drop
                    key={`${props.parent}-${dnd_items.length}`}
                    parent={props.parent}
                    accept={props.accept}
                    insert={(elem) => insert(dnd_items.length, elem)}
                    index={dnd_items.length}
                    renderItem={(r) => props.renderAddItem(dnd_items.length, r)}
                    />
            )
        }
        </>
    )
}

export default DragAndDropManager
