import React, {useEffect, useRef, useState} from 'react';
import {useDrag, useDrop} from 'react-dnd'

const DragAndDrop = (props) => {
    let {
        accept,
        insert,
        element,
        remove,
        index,
        parent,
        save,
        draggable = true,
        droppable = true,
    } = props

    let ref = useRef(null)

    function sameLocation(other_item) {
        return (
            index == other_item.index &&
            parent == other_item.parent
        )
    }
    const [{isOver}, drop] = useDrop({
        accept,
        hover(item, monitor) {
            if (!ref.current) {
              return
            }
            if (monitor.isOver({shallow: true})) {
                if (!sameLocation(item)) {
                    item.save = insert(item)
                    item.index = index
                    item.parent = parent
                }
            }
        },
        drop: async (item, monitor) => {
            if (monitor.didDrop()) {
                return
            }
            await save()
            if (parent != item.original_parent){
                await item.save()
            }

        },
        collect: monitor => ({
            isOver: !!monitor.isOver({shallow: true})
        })
    })

    const [{ isDragging }, drag] = useDrag({
        item: {
            type: accept,
            remove,
            parent,
            original_parent: parent,
            element,
            index,
            save
        },
        isDragging: monitor => {
            return sameLocation(monitor.getItem())
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        }),
    })
    if (droppable) {
        drop(ref)
    }
    if (draggable) {
        drag(ref)
    }
    let opacity = isOver ? 0.5 : 1

    return (
        props.renderItem(ref)
    )
}

export const Drop = props => <DragAndDrop {...props} draggable={false} />
export default DragAndDrop
