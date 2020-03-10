import React, {useState, useEffect, useRef} from 'react'
import update from 'immutability-helper'
import {DragAndDrop} from './drag_and_drop'
import {useDrop} from 'react-dnd'

export const DragAndDropManager = (props) => {
    let [dnd_items, setDndItems] = useState(JSON.parse(JSON.stringify(props.items)))
    let ref = useRef(null)

    useEffect(() => {
        setDndItems(JSON.parse(JSON.stringify(props.items)))
    }, [props.items])

    const [{isOver}, drop] = useDrop({
        accept: props.accept,
        hover(item, monitor) {
            return
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

    function insert(index, item) {
        console.log('insert')
        let updated_dnd_items = props.refresh()
        let splice_array = [[index, 0, JSON.parse(JSON.stringify(item.element))]]
        if (!!item.remove) {
            let new_dnd_items = []
            if (props.location().includes(item.location()) && props.location() != item.location()) {
                new_dnd_items = update(updated_dnd_items, {
                    $splice: splice_array
                })
                console.log(new_dnd_items)
                setDndItems(new_dnd_items)
                props.persist(new_dnd_items)
                item.remove()
            } else {
                if (item.location() != props.location()) {
                    item.remove()
                } else {
                    splice_array = [[item.index, 1], [index, 0, updated_dnd_items[item.index]]]
                }
                new_dnd_items = update(updated_dnd_items, {
                    $splice: splice_array
                })
                setDndItems(new_dnd_items)
                props.persist(new_dnd_items)
            }

        }

        return index
    }

    function remove(index) {
        console.log('remove')
        let updated_dnd_items = props.refresh()
        let new_dnd_items = update(updated_dnd_items, {
            $splice: [[index, 1]]
        })
        console.log(new_dnd_items)
        setDndItems(new_dnd_items)
        props.persist(new_dnd_items)
        return new_dnd_items
    }
    return (
        <div ref={drop}>
        {
            dnd_items.map((e,i) => (
                <div className={props.classes.container}>
                    <DragAndDrop
                        key={`${props.location()}-${i}`}
                        location={props.location}
                        accept={props.accept}
                        insert={(elem) => insert(i, elem)}
                        remove={(set_state) => remove(i, set_state)}
                        reject={props.reject}
                        subtype={props.subtype}
                        index={i}
                        element={e}
                        classes={props.classes}
                        canDrop={props.canDrop}
                        nest={props.nest}
                        nestable={props.nestable}>
                        {props.render(e, i)}
                    </DragAndDrop>
                </div>
            ))
        }
        </div>
    )
}

//
// <WorkoutBlock
//     workout={wb}
//     save={(state) => this.update('workout_blocks', state, wb_index)}
//     pasteExercise={this.handleModalSubmit}
//     addExercise={this.toggleModal}
//     getWorkoutState={this.getWorkoutState}
//     classes={classes}
//     week_id={week_id}
//     program_id={this.props.program_id}
//     workout={wb}
//     day_index={index}
//     history={this.props.history}
//     workout_block_index={wb_index}/>
