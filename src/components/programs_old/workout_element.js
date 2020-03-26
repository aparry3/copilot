import AutorenewIcon from '@material-ui/icons/Autorenew'
import update from 'immutability-helper';
import {Card, Divider, List, ListItem, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {connect} from 'react-redux'
import FilterNoneIcon from '@material-ui/icons/FilterNone'
import {dragAndDrop} from './drag_and_drop'
import {makeStyles, withStyles} from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import React, {useRef, useState, useEffect} from 'react';
import SwapVertIcon from '@material-ui/icons/SwapVert'
import {useDrop} from 'react-dnd'
import {dnd_styles, styles} from './workout_element.styles'
import {dnd_types, dnd_subtypes} from '../../constants/programs'
import {copyWorkoutElement} from '../../actions';
import {DragAndDropManager} from './drag_and_drop_manager'
import {Exercise} from './exercise'
import AddIcon from '@material-ui/icons/Add'



let useStyles = makeStyles(styles)
let DnDManager = withStyles(dnd_styles)(DragAndDropManager)


class ExerciseGroup extends React.Component {

    constructor(props) {
        super(props)
        this.updated_state = JSON.parse(JSON.stringify(props.workout_element))
        this.state = {
            workout_element: JSON.parse(JSON.stringify(props.workout_element))
        }

        this.location = this.location.bind(this)
        this.addExercise = this.addExercise.bind(this)
        this.renderExercise = this.renderExercise.bind(this)
        this.getState = this.getState.bind(this)
        this.updateExercise = this.updateExercise.bind(this)
        this.updateExercises = this.updateExercises.bind(this)
        this.canDrop = this.canDrop.bind(this)

    }

    componentWillReceiveProps(next_props) {
        this.setState({
            workout_element: JSON.parse(JSON.stringify(next_props.workout_element)),
        })
        this.updated_state = JSON.parse(JSON.stringify(next_props.workout_element))
    }


    location() {
        return `${this.props.location()}-${this.props.index}`
    }

    addExercise() {
        let new_workout_element = update(this.updated_state, {
            exercises: {
                $push: [{
                    _id: Math.random().toString(36).substring(7)
                }]
            }
        })
        this.setState({
            workout_element: new_workout_element
        })
        this.updated_state = new_workout_element
        this.props.persist(this.updated_state)
    }


    updateExercises(exercises) {
        console.log("update workout_element")
        console.log(exercises)
        this.updated_state.exercises = exercises.map(we => we.exercises[0])
        this.props.persist(this.updated_state)
    }

    updateExercise(index, exercise) {
        console.log("update workout_element - persist exercise")
        this.updated_state.exercises[index] = exercise
        this.props.persist(this.updated_state)
    }

    getState() {
        return this.updated_state.exercises.map(e => ({exercises: [e]}))
    }

    renderExercise(element, index) {
        return (<Exercise
                exercise={element.exercises[0]}
                persist={(exercise) => this.updateExercise(index, exercise)}
                />)
    }

    canDrop(element) {
        return element.exercises.length == 1
    }

    reject(item) {
        return item.subtype != dnd_subtypes.EXERCISE
    }

    render() {
        let {classes} = this.props
        return (
            <div className={classes.workoutElement}>
            {this.location()}
                <DnDManager
                    location={this.location}
                    accept={dnd_types.WORKOUT_ELEMENT}
                    subtype={dnd_subtypes.EXERCISE}
                    reject={this.reject}
                    items={this.state.workout_element.exercises.map(e => ({exercises: [e]}))}
                    render={this.renderExercise}
                    persist={this.updateExercises}
                    refresh={this.getState}
                    canDrop={this.canDrop}
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

export const WorkoutElement = withStyles(styles)(ExerciseGroup)


//
//
// const ExerciseView = (props) => {
//     let {
//         workout_element,
//         handleOptionsClick,
//         merge
//     } = props;
//     let classes = useStyles()
//     function editWorkoutElement(e) {
//         e.stopPropagation()
//         props.editWorkoutElement(props.location)
//     }
//     return (
//         <>
//             {merge && (<div className={classes.hoverOverlay}/>)}
//             <div className={classes.exerciseContent} onFocus={() => {console.log('focus')}}>
//                 <div onClick={editWorkoutElement} className={classes.cardContent}>
//                     <div className={classes.exerciseHeader}>
//                         <div className={classes.exerciseNameContainer}>
//                             <span className={classes.exerciseName}>
//                             {workout_element.exercise_name}
//                             </span>
//                         </div>
//                         <div className={classes.deleteContainer}>
//                             <FilterNoneIcon className={classes.deleteIcon} onClick={(e) => handleOptionsClick(e, props.location)} />
//                         </div>
//                     </div>
//                     {!!workout_element.notes && (
//                         <div className={classes.notesContainer}>
//                             {workout_element.notes}
//                         </div>
//                     )}
//                     {!!workout_element.details && (
//                     <div className={classes.exerciseDetails}>
//                         <div className={classes.exerciseScheme}>
//                             {workout_element.details.scheme}
//                         </div>
//                         <div className={classes.exerciseIcons}>
//                             {!!workout_element.details.sets && (
//                                 <div className={classes.detailIcon}>
//                                     <AutorenewIcon fontSize="small"/><span>{workout_element.details.sets.value}</span>
//                                 </div>
//                             )}
//                             {!!workout_element.details.repetitions && (
//                                 <div className={classes.detailIcon}>
//                                     <SwapVertIcon fontSize="small"/><span >{workout_element.details.repetitions.value}</span>
//                                 </div>
//                             )}
//                         </div>
//                     </div>)}
//                 </div>
//             </div>
//         </>
//     )
// }
//
// const SupersetView = (props) => {
//     let {
//         workout_element,
//         location,
//         handleOptionsClick,
//         removeItem,
//         ...pass_through_props
//     } = props
//     const [, drop] = useDrop({
//         accept: dnd_types.EXERCISE,
//     })
//     let classes = useStyles()
//     return (
//         <div className={classes.supersetContent} onClick={() => props.editWorkoutElement(props.location)}>
//             <div className={classes.supersetDeleteContainer}>
//                 <FilterNoneIcon className={classes.deleteIcon} onClick={(e) => handleOptionsClick(e, props.location)} />
//             </div>
//             <div className={classes.superset} ref={drop}>
//                 {workout_element.exercises.map((ex, ex_index)=> {
//                     let superset_location = {...location}
//                     superset_location.superset_index = ex_index
//                     return (
//                         <div key={`${ex.exercise_id}-${ex_index}`} className={classes.exerciseBlock} >
//                             <NonMergeableExercise
//                                 variant='mergeable'
//                                 item_type={dnd_types.EXERCISE}
//                                 accept={dnd_types.EXERCISE}
//                                 workout_element={ex}
//                                 handleOptionsClick={handleOptionsClick}
//                                 removeItem={removeItem}
//                                 location={superset_location}
//                                 classes={classes}
//                                 {...pass_through_props}/>
//                         </div>
//                     )
//                 })}
//             </div>
//             <div className={clsx(classes.supersetDetails, classes.exerciseDetails)}>
//                 <div className={classes.exerciseScheme}>
//                     {workout_element.details.scheme}
//                 </div>
//                 <div className={classes.exerciseIcons}>
//                     {!!workout_element.details.sets && (
//                         <div className={classes.detailIcon}>
//                             <AutorenewIcon fontSize="small"/><span>{workout_element.details.sets.value}</span>
//                         </div>
//                     )}
//                     {!!workout_element.details.repetitions && (
//                         <div className={classes.detailIcon}>
//                             <SwapVertIcon fontSize="small"/><span >{workout_element.details.repetitions.value}</span>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
//
// }
//
// export const WorkoutElement = connect(
//     null,
//     dispatch => ({
//         copyWorkoutElement: workout_element => dispatch(copyWorkoutElement(workout_element))
//     })
// )((props) => {
//     let {removeItem, ...pass_through_props} = props
//     let classes = useStyles()
//     let [confirm_delete_open, setConfirmDeleteOpen] = useState(false)
//     let [menu_open, setMenuOpen] = useState(false)
//     let [menu_location, setMenuLocation] = useState([0,0])
//     let [options_location, setOptionsLocation] = useState(null)
//     function deleteWorkoutElement() {
//         let workout = removeItem(options_location, true)
//         props.save([props.location.day, workout])
//         setMenuOpen(false)
//     }
//     function handleOptionsClick(e, location) {
//         e.stopPropagation()
//         e.preventDefault()
//         setMenuOpen(true)
//         setMenuLocation([e.clientX, e.clientY - 5])
//         setOptionsLocation(location)
//     }
//
//     function handleCopy() {
//         let workout_element = props.workout_element
//         if (options_location.superset_index != undefined) {
//             workout_element = workout_element.exercises[options_location.superset_index]
//         }
//         props.copyWorkoutElement(workout_element)
//         setMenuOpen(false)
//     }
//
//     function renderOptionsMenu() {
//         if (!menu_open) {
//             return null
//         }
//         return (
//             <>
//                 <div className={classes.rightClickUnderlay} onClick={() => setMenuOpen(false)} onContextMenu={(e) => {e.stopPropagation(); setMenuOpen(false);}}/>
//                 <div style={{top: menu_location[1] - TOOLTIP_HEIGHT/2, left: menu_location[0] + ARROW_SIZE }} className={classes.optionMenu}>
//                     <div className={classes.arrow} />
//                     <div className={classes.optionButtonContainer}><div className={clsx(classes.optionButton, classes.copyButton)} onClick={handleCopy}><span>Copy</span></div></div>
//                     <div className={classes.optionButtonContainer}><div className={clsx(classes.optionButton, classes.deleteButton)} onClick={deleteWorkoutElement}><span>Delete</span></div></div>
//                 </div>
//             </>
//         )
//     }
//
//     return (
//         <div className={classes.workoutElement} >
//             {renderOptionsMenu()}
//             {!props.workout_element.exercise_id ? (
//                 <div className={classes.supersetBlock}>
//
//                     <Superset
//                         item_type={dnd_types.SUPERSET}
//                         accept={[dnd_types.SUPERSET, dnd_types.EXERCISE]}
//                         removeItem={removeItem}
//                         classes={classes}
//                         handleOptionsClick={handleOptionsClick}
//                         {...pass_through_props} />
//                 </div>
//                  ) : (
//                  <div className={classes.exerciseBlock} >
//                      <MergeableExercise
//                          variant='mergeable'
//                          item_type={dnd_types.EXERCISE}
//                          accept={[dnd_types.SUPERSET, dnd_types.EXERCISE]}
//                          removeItem={removeItem}
//                          classes={classes}
//                          handleOptionsClick={handleOptionsClick}
//                          {...pass_through_props}/>
//                  </div>
//
//             )}
//         </div>
//     )
// })
//
// export const Superset = dragAndDrop(true, true, false)(SupersetView);
// export const MergeableExercise = dragAndDrop(true, true, true)(ExerciseView)
// export const NonMergeableExercise = dragAndDrop(true, true, false)(ExerciseView)
