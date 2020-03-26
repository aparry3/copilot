import React, {useEffect, useRef, useState} from 'react';
import {useDrag, useDrop} from 'react-dnd'

import {dnd_types} from '../../constants/programs'
import {setDragElement} from '../../actions'

const _canDrop = (element) => true

export const DragAndDrop = (props) => {
    let {
        accept,
        insert,
        element,
        remove,
        index,
        location,
        merge,
        nestable = false,
        nest = (item) => item.subtype,
        unnest = (item) => null,
        subtype = null,
        reject = (item) => false,
        canDrop = _canDrop,
        draggable = true,
        droppable = true,
        shouldMerge = () => false

    } = props
    let ref = useRef(null)

    function sameLocation(other_item) {
        return (
            index == other_item.index &&
            location() == other_item.location()
        )
    }
    const [{isOver}, drop] = useDrop({
        accept,
        hover(item, monitor) {
            function shouldNest() {
                let {x, y} = monitor.getClientOffset()
                let client_bounding_rect = ref.current.getBoundingClientRect()
                let middle_y = (client_bounding_rect.bottom - client_bounding_rect.top) / 3
                let client_y = y - client_bounding_rect.top
                return client_y > middle_y
            }

            if (!ref.current) {
              return
            }
            if (monitor.isOver({shallow: true})) {
                console.log(nestable)
                if (nestable) {
                    if (shouldNest()) {
                        item.subtype = nest(item)
                    } else {
                        console.log("unnest")
                        item.subtype = unnest(item)
                    }
                }
                if (
                    !sameLocation(item)
                    // canDrop(item.element) &&
                ) {
                    if (!reject(item)) {
                        item.index = insert(item)
                        item.location = location
                        item.remove = remove
                    } else if (shouldMerge(item.element, element)) {
                        merge(item)
                    }
                }
            }
        },
        drop: async (item, monitor) => {
            if (monitor.didDrop()) {
                return
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
            location,
            index,
            element,
            subtype
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
        <div className={props.classes.dragAndDrop} ref={ref} style={{opacity}}>
            {props.children}
        </div>
    )
}

export const  dragAndDrop = (draggable = true, droppable = true, mergeable = true, options = null) => {
    return (WrappedComponent) => {
        return (props) => {
            let {
                variant,
                item_type,
                accept,
                classes,
                ...pass_through_props
            } = props

            let [merge, setMerge] = useState(false)
            let can_merge = !!variant && variant == 'mergeable'
            let ref = useRef(null)
            const [{isOver}, drop] = useDrop({
                accept,
                hover(item, monitor) {
                    if (!ref.current) {
                      return
                    }
                    if (monitor.isOver({shallow: true})) {
                        const drag_location = item.location
                        const hover_location = props.location
                        // Don't replace items with themselves
                        function shouldMerge() {
                            if (!item.can_merge || !mergeable) {
                                return false
                            }
                            let {x, y} = monitor.getClientOffset()
                            let client_bounding_rect = ref.current.getBoundingClientRect()
                            let middle_y = (client_bounding_rect.bottom - client_bounding_rect.top) / 2
                            let client_y = y - client_bounding_rect.top
                            return client_y > middle_y
                        }
                        if (!sameLocation(drag_location, hover_location)) {
                            if (shouldMerge()) {
                                setMerge(true)
                            } else {
                                setMerge(false)
                                let new_location = props.moveItem(
                                    hover_location,
                                    drag_location,
                                    item.moveCallback
                                )
                                item.location = new_location
                                item.moveCallback = props.removeItem

                            }
                        }
                    }
                },
                drop: async (item, monitor) => {
                    if (monitor.didDrop()) {
                        return
                    }
                    if (merge) {
                        props.moveItem(props.location, item.location, item.moveCallback, true)
                        setMerge(false)
                    }
                    if (item.original_location.week_id == props.location.week_id) {
                        props.save([item.original_location.day_index, item.originNewState()])
                    } else {
                        await item.saveCallback()
                        await props.save()
                    }
                },
                collect: monitor => ({
                    isOver: !!monitor.isOver({shallow: true})
                })
            })
            useEffect(() => {
                setMerge(false)
            }, [isOver])
            const [{ isDragging }, drag] = useDrag({
                item: {
                    type: item_type,
                    can_merge,
                    id:`${Math.floor(Math.random()*100000)}`,
                    location: props.location,
                    moveCallback:props.removeItem,
                    saveCallback:props.save,
                    original_location: props.location,
                    originNewState: props.getWorkoutState
                },
                isDragging: monitor => {
                    return sameLocation(monitor.getItem().location, props.location)
                },
                collect: monitor => ({
                    isDragging: monitor.isDragging()
                }),
            })
            drag(drop(ref))
            let opacity = isOver ? 0.5 : 1
            return (
                <div className={classes.dragAndDrop} ref={ref} style={{opacity}}>
                    <WrappedComponent merge={merge} {...pass_through_props} />
                </div>
            )
        }
    }
}
