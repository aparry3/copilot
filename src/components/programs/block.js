import clsx from 'clsx'
import update from 'immutability-helper';
import React, {useRef, useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {makeStyles, withStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add'
import {WorkoutElement} from './workout_element';
import {WorkoutElementModal} from './exercise_modal';
import {dnd_styles, styles} from './block.styles'
import {DragAndDropManager} from './drag_and_drop_manager'
import {dnd_types} from '../../constants/programs';

let styled = withStyles(styles)
let useStyles = makeStyles(styles)
let DnDManager = withStyles(dnd_styles)(DragAndDropManager)

class Block extends React.Component {
    constructor(props) {
        super(props)
        this.updated_state = props.workout_block

        this.state = {
            workout_block: props.workout_block
        }
        this.location = this.location.bind(this)
        this.addExercise = this.addExercise.bind(this)
        this.renderWorkoutElement = this.renderWorkoutElement.bind(this)
        this.getState = this.getState.bind(this)
        this.updateWorkoutElement = this.updateWorkoutElement.bind(this)
        this.updateWorkoutElements = this.updateWorkoutElements.bind(this)
    }

    location() {
        return `${this.props.location()}-${this.props.index}`
    }

    renderWorkoutElement(element, index) {
        return (<WorkoutElement
            persist={(workout_element) => this.updateWorkoutElement(index, workout_element)}
            workout_element={element}
            location={location}
            index={index} />)
    }

    componentWillReceiveProps(next_props) {
        this.setState({
            workout_block: JSON.parse(JSON.stringify(next_props.workout_block)),
        })
        this.updated_state = JSON.parse(JSON.stringify(next_props.workout_block))
    }


    addExercise() {
        let new_workout_block = update(this.updated_state, {
            workout_elements: {
                $push: [{
                    _id: Math.random().toString(36).substring(7)
                }]
            }
        })
        this.setState({
            workout_block: new_workout_block
        })
        this.updated_state = new_workout_block
        this.props.persist(this.updated_state)
    }

    updateWorkoutElements(workout_elements) {
        this.updated_state.workout_elements = workout_elements
        this.props.persist(this.updated_state)
    }

    updateWorkoutElement(index, workout_element) {
        this.updated_state.workout_elements[index] = workout_element
        this.props.persist(this.updated_state)
    }

    getState() {
        return this.updated_state.workout_elements
    }

    render() {
        let {classes} = this.props
        return (
            <div className={classes.block}>
                <span>{this.state.workout_block.name}</span>
                <DnDManager
                    location={this.location}
                    accept={dnd_types.WORKOUT_ELEMENT}
                    items={this.state.workout_block.workout_elements}
                    render={this.renderWorkoutElement}
                    persist={this.updateWorkoutElements}
                    refresh={this.getState}
                    />
                <div className={classes.addExerciseContainer}>
                    <div className={classes.addExerciseButton} onClick={this.addExercise}>
                        <span><AddIcon /> Add Exercise</span>
                    </div>
                </div>
            </div>
        )

    }
}

export const WorkoutBlock = styled(Block)

// <AddExercise pasteExercise={props.pasteExercise} addExercise={props.addExercise} />

// const AddExercise = styled(connect(state => ({clipboard: state.programs.clipboard}))((props) => {
//     let [mouse_over, setMouseOver] = useState(false)
//     let {classes} = props
//     return (
//         <div className={classes.addExerciseContainer} onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
//             {(mouse_over && !!props.clipboard) ? (
//                 <>
//                     <div className={clsx(classes.addButton, classes.addNewExercise)} onClick={() => props.addExercise()}>
//                         <AddIcon />
//                     </div>
//                     <div className={clsx(classes.addButton, classes.paste)} onClick={(e) => {e.preventDefault(); e.stopPropagation(); props.pasteExercise(props.clipboard);}}>
//                         <FilterIcon />
//                     </div>
//                 </>
//             ) : (
//                 <div className={classes.addExercise} onClick={() => props.addExercise()}>
//                     <Typography variant="body2"><AddIcon /> Add Exercise</Typography>
//                 </div>
//             )}
//         </div>
//     )
// }))


// export const WorkoutBlock = connect(
//     state => ({
//         clipboard: state.programs.clipboard
//     })
// )((props) => {
//     let {
//         classes,
//         week_id,
//         day_index,
//         workout_block_index
//     } = props
//
//     let [workout_bllock, setWorkout] = useState(JSON.parse(JSON.stringinfy(props.workout_block)))
//     let [modal_is_open, setModalIsOpen] = useState(false)
//     let [workout_element, setWorkoutElement] = useState(null)
//     let [edit_location, setEditLocation] = useState(null)
//
//     function getWorkoutState() {
//         return workout
//     }
//     function update(proptery, state, index=null) {
//
//     }
//
//     function location() {
//         return `${week_id}-${day_index}`
//     }
//
//     function save(primary=false, otherLocation=null) {
//         let updates = !!workout_elements ? [[props.workou, this.state.workout_blocks], workout] : [[this.props.index, this.state.workout]]
//         if (!!workout && workout[0] == this.props.day) {
//             updates = [workout]
//         }
//         this.props.save(updates)
//     }
//
//
//     function moveItem(new_location, old_location, removeOldItem, merge = false) {
//         let {
//             workout_element_index,
//             superset_index
//         } = new_location
//         let return_location = new_location
//
//         let item = removeOldItem(old_location)
//
//         if (new_location.superset_index != undefined && !old_location.superset_index &&
//             old_location.workout_element_index < new_location.workout_element_index) {
//             workout_element_index = workout_element_index - 1
//             return_location.workout_element_index = workout_element_index
//         }
//         let old_item = workout[workout_element_index]
//         if (superset_index != undefined) {
//             old_item = update(old_item, {
//                 exercises: {$splice: [[superset_index, 0, item]]}
//             })
//             if (old_item.exercises.length == 1) {
//                 old_item = old_item[0]
//             }
//         }
//         let insert_elements = superset_index != undefined ? [old_item] : merge ? [{exercises:[old_item, item], details: {}}] : !!old_item ? [item, old_item] : [item]
//         let new_workout = update(workout, {
//             $splice: [[workout_element_index, 1].concat(insert_elements)]
//         })
//         setWorkout(new_workout)
//
//         return return_location
//     }
//
//
//     function removeItem(from_location, return_workout=false) {
//         const {superset_index, workout_element_index} = from_location
//         let item = workout[workout_element_index]
//         let return_item = item
//         let superset = []
//         if (superset_index != undefined) {
//             return_item = item.exercises[superset_index]
//             superset = update(item, {
//                 exercises: {$splice: [[superset_index, 1]]}
//             })
//             superset = !!superset.length ? [superset] : superset
//         }
//         let new_workout = update(workout, {
//             $splice: [[workout_element_index, 1].concat(superset)]
//         })
//         setWorkout(new_workout)
//
//         return return_workout ? new_workout : return_item
//     }
//
//     function toggleModal(edit_location=null) {
//         let new_workout_element = null
//
//         if (!!edit_location) {
//             new_workout_element = workout[edit_location.workout_element_index]
//             if (edit_location.superset_index != undefined) {
//                 new_workout_element = new_workout_element.exercises[edit_location.superset_index]
//             }
//         }
//         setModalIsOpen(!modal_is_open)
//         setWorkoutElement(new_workout_element)
//         setEditLocation(new_edit_location)
//     }
//
//
//     function handleModalSubmit(submitted_workout_element) {
//         if (!!submitted_workout_element.exercise_id || !!submitted_workout_element.exercises) {
//             let updated_workout_elements = [workout.length, 0, submitted_workout_element]
//             if (!!edit_location) {
//                 updated_workout_elements[0] = edit_location.workout_element_index
//                 updated_workout_elements[1] = 1
//                 if (edit_location.superset_index != undefined) {
//                     let new_workout_element = update(workout[edit_location.workout_element_index], {
//                         exercises: {
//                             $splice: [[edit_location.superset_index, 1, submitted_workout_element]]
//                         }
//                     })
//                     updated_workout_elements[2] = new_workout_element
//                 }
//             }
//             let new_workout = update(workout, {
//                 $splice: [updated_workout_elements]
//             })
//             setWorkout(new_workout)
//             setWorkoutElement(null)
//             setEditLocation(null)
//             this.save([props.day, new_workout])
//         }
//     }
//
//     function handleNewExercise() {
//         props.showExerciseForm(props.program_id)
//         props.setActivePage()
//         props.history.push('/trainer/exercises')
//     }
//
//
//
//
//     let [{isOver}, drop] = useDrop({
//         accept: [dnd_types.SUPERSET, dnd_types.EXERCISE],
//         hover(item, monitor) {
//             function sameBlock(location, old_location) {
//                 return (
//                     location.workout_block_index == old_location.workout_block_index &&
//                     location.day_index == old_location.day_index &&
//                     location.week_id == old_location.week_id
//                 )
//             }
//             if (monitor.isOver({shallow: true})) {
//                 const drag_location = item.location
//                 if (!sameBlock({week_id, day}, drag_location)) {
//                     let new_location = props.moveItem(
//                         {
//                             week_id,
//                             day_index,
//                             workout_element_index:props.workout.length
//                         },
//                         drag_location,
//                         item.moveCallback
//                     )
//                     item.location = new_location
//                     item.moveCallback = props.removeItem
//                 }
//             }
//         },
//         drop: (item, monitor) => {
//             if (item.original_location.week_id == week_id) {
//                 props.save([item.original_location.day_index, item.originNewState()])
//             } else {
//                 props.save()
//                 item.saveCallback()
//             }
//         },
//         collect: monitor => ({
//             isOver: !!monitor.isOver({shallow:true})
//         })
//     })
//
//
//     return (
//         <>
//         <WorkoutElementModal
//             workout_element={workout_element}
//             open={modal_is_open}
//             onSubmit={handleModalSubmit}
//             onClose={toggleModal}
//             onNewExercise={handleNewExercise}
//              />
//
//         <div className={classes.block} >
//             <div className={classes.blockContainer}>
//                 <div className={classes.blockList}>
//                     {workout.map((workout_element, workout_element_index) => {
//                         let location = {
//                             week_id,
//                             day_index,
//                             workout_block_index,
//                             workout_element_index
//                         }
//                         return (
//                             <WorkoutElement
//                             key={`${week_id}-${day_index}-${workout_block_index}-${workout_element.exercise_id}-${workout_element_index}`}
//                             editWorkoutElement={toggleModal}
//                             save={props.save}
//                             getWorkoutState={getWorkoutState}
//                             removeItem={removeItem}
//                             moveItem={moveItem}
//                             location={location}
//                             workout_element={workout_element} />
//                         )
//                     })}
//                 </div>
//
//                 <div ref={drop} className={classes.blockDropArea}>
//                     <AddExercise pasteExercise={props.pasteExercise} addExercise={props.addExercise} />
//                 </div>
//             </div>
//         </div>
//         </>
//     )
//
// })
