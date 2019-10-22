import React, {useEffect, useRef, useState} from 'react';
import {useDrag, useDrop} from 'react-dnd'

import {dnd_types} from '../../constants/programs'
import {setDragElement} from '../../actions'




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
            function sameLocation(old_l, new_l) {
                return (
                    old_l.superset_index == new_l.superset_index &&
                    old_l.workout_element_index == new_l.workout_element_index &&
                    old_l.day == new_l.day &&
                    old_l.week_id == new_l.week_id
                )
            }
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
                    await item.saveCallback()
                    await props.save()
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
                    saveCallback:props.save
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
