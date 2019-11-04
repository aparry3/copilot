import AutorenewIcon from '@material-ui/icons/Autorenew'
import {Card, Divider, List, ListItem, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {connect} from 'react-redux'
import FilterNoneIcon from '@material-ui/icons/FilterNone'
import {dragAndDrop} from './drag_and_drop'
import {makeStyles} from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import React, {useRef, useState} from 'react';
import SwapVertIcon from '@material-ui/icons/SwapVert'
import {useDrop} from 'react-dnd'

import {dnd_types} from '../../constants/programs'
import {copyWorkoutElement} from '../../actions';

const TOOLTIP_WIDTH = 100
const TOOLTIP_HEIGHT = 80
const ARROW_SIZE = 15

const styles = theme => ({
    exerciseContent: {
        display: 'flex',
        height:' 100%',
        width: '100%',
        flexDirection: 'row',
        borderRadius: 'inherit',
        cursor: 'move'

    },
    exerciseBlock: {
        borderRadius: '10px',
        background: theme.palette.background.light,
        minHeight: '70px',
        width: '100%',
        position: 'relative',
        margin: '0px 0px 10px 0px',
        boxShadow: `0px 1px 8px -5px ${theme.palette.background.dark}`

    },
    dragAndDrop: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        opacity: 0,
        flexDirection: 'column'
    },
    workoutElement: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    hoverOverlay: {
        height:'100%',
        width: '100%',
        borderRadius: '10px',
        background: '#000000',
        opacity: 0.5,
        position: 'absolute'
    },
    supersetBlock: {
        width: '100%',
        background: theme.palette.secondary.main,
        borderRadius: '10px',
        margin: '0px 0px 10px 0px',
        padding: '0 5%',
        cursor: 'move'
    },
    cardContent: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        flexGrow: 1
    },
    exerciseHeader: {
        height: '40px',
        width: '100%',
        borderRadius: '10px 10px 0px 0px',
        background: theme.accents.primary,
        display: 'flex',
        flexDirection: 'row',
        overflow:'hidden',
        textOverflow:  'ellipsis',
        color: theme.text.dark,
        color: "black",
        padding: '10px'
    },
    exerciseNameContainer: {
        flexGrow: 1,
        width:'85%',
        display: 'flex',
        alignItems: 'center',
        padding: '2px',
        minWidth: '0px'
    },
    exerciseName: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    exerciseDetails: {
        height: '30px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5px',
        justifyContent: 'space-between',
        fontSize: '14px'

    },
    notesContainer: {
        flexGrow: 1,
        color: '#cbced0',
        fontSize: '12px',
        textAlign: 'left',
        padding: '5px 10px 0px 10px'
    },
    exerciseIcons: {
        height: '40%',
        alignSelf: 'flex-end',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        fontSize: '12px'
    },
    deleteContainer: {
        width: '10%',
        display: 'flex',
        alignItems: 'center'
    },
    deleteIcon: {
        heigh: '15px',
        width: '15px',
        cursor: 'pointer'
    },
    detailIcon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    drag: {
        alignSelf: 'center'
    },
    exerciseScheme: {
        justifySelf: 'center'
    },
    superset: {
        width: '100%',
    },
    supersetDeleteContainer:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    supersetDetails: {
        marginTop: '-10px'
    },
    optionMenu: {
        display: 'flex',
        boxShadow: `0 0 15px -5px ${theme.palette.background.dark}`,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: `${TOOLTIP_HEIGHT}px`,
        width: `${TOOLTIP_WIDTH}px`,
        position: 'fixed',
        zIndex: '10',
        background: theme.palette.background.tooltip,
        border: 'none',
        padding: '5px',
        borderRadius: '10px'
    },
    rightClickUnderlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zindex: '7'
    },
    arrow: {
        position: 'absolute',

        left: `-${ARROW_SIZE}px`,
        width: 0,
        height: 0,
        borderRight: `${ARROW_SIZE}px solid ${theme.palette.background.tooltip}`,
        borderBottom: `${ARROW_SIZE}px solid transparent`,
        borderTop: `${ARROW_SIZE}px solid transparent`
    },
    optionButton: {
        width: '100%',
        height: '30px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: '5px',
        border:'none',
        cursor: 'pointer'
    },
    deleteButton: {
        background: theme.accents.error,
        '&:hover': {
            background: theme.accents.errorHover
        }
    },
    copyButton: {
        background: theme.accents.secondary,
        '&:hover': {
            background: theme.accents.secondaryHover
        }
    },
    optionButtonContainer: {
        padding:'5px',
        width: '100%'
    }

})
let useStyles = makeStyles(styles)


const ExerciseView = (props) => {
    let {
        workout_element,
        handleOptionsClick,
        merge
    } = props;
    let classes = useStyles()
    function editWorkoutElement(e) {
        e.stopPropagation()
        props.editWorkoutElement(props.location)
    }
    return (
        <>
            {merge && (<div className={classes.hoverOverlay}/>)}
            <div className={classes.exerciseContent} onFocus={() => {console.log('focus')}}>
                <div onClick={editWorkoutElement} className={classes.cardContent}>
                    <div className={classes.exerciseHeader}>
                        <div className={classes.exerciseNameContainer}>
                            <span className={classes.exerciseName}>
                            {workout_element.exercise_name}
                            </span>
                        </div>
                        <div className={classes.deleteContainer}>
                            <FilterNoneIcon className={classes.deleteIcon} onClick={(e) => handleOptionsClick(e, props.location)} />
                        </div>
                    </div>
                    {!!workout_element.notes && (
                        <div className={classes.notesContainer}>
                            {workout_element.notes}
                        </div>
                    )}
                    {!!workout_element.details && (
                    <div className={classes.exerciseDetails}>
                        <div className={classes.exerciseScheme}>
                            {workout_element.details.scheme}
                        </div>
                        <div className={classes.exerciseIcons}>
                            {!!workout_element.details.sets && (
                                <div className={classes.detailIcon}>
                                    <AutorenewIcon fontSize="small"/><span>{workout_element.details.sets}</span>
                                </div>
                            )}
                            {!!workout_element.details.repetitions && (
                                <div className={classes.detailIcon}>
                                    <SwapVertIcon fontSize="small"/><span >{workout_element.details.repetitions}</span>
                                </div>
                            )}
                        </div>
                    </div>)}
                </div>
            </div>
        </>
    )
}

const SupersetView = (props) => {
    let {
        workout_element,
        location,
        handleOptionsClick,
        removeItem,
        ...pass_through_props
    } = props
    const [, drop] = useDrop({
        accept: dnd_types.EXERCISE,
    })
    let classes = useStyles()
    return (
        <div onClick={() => props.editWorkoutElement(props.location)}>
            <div className={classes.supersetDeleteContainer}>
                <FilterNoneIcon className={classes.deleteIcon} onClick={(e) => handleOptionsClick(e, props.location)} />
            </div>
            <div className={classes.superset} ref={drop}>
                {workout_element.exercises.map((ex, ex_index)=> {
                    let superset_location = {...location}
                    superset_location.superset_index = ex_index
                    return (
                        <div key={`${ex.exercise_id}-${ex_index}`} className={classes.exerciseBlock} >
                            <NonMergeableExercise
                                variant='mergeable'
                                item_type={dnd_types.EXERCISE}
                                accept={dnd_types.EXERCISE}
                                workout_element={ex}
                                handleOptionsClick={handleOptionsClick}
                                removeItem={removeItem}
                                location={superset_location}
                                classes={classes}
                                {...pass_through_props}/>
                        </div>
                    )
                })}
            </div>
            <div className={clsx(classes.supersetDetails, classes.exerciseDetails)}>
                <div className={classes.exerciseScheme}>
                    {workout_element.details.scheme}
                </div>
                <div className={classes.exerciseIcons}>
                    {!!workout_element.details.sets && (
                        <div className={classes.detailIcon}>
                            <AutorenewIcon fontSize="small"/><span>{workout_element.details.sets}</span>
                        </div>
                    )}
                    {!!workout_element.details.repetitions && (
                        <div className={classes.detailIcon}>
                            <SwapVertIcon fontSize="small"/><span >{workout_element.details.repetitions}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

}

export const WorkoutElement = connect(
    null,
    dispatch => ({
        copyWorkoutElement: workout_element => dispatch(copyWorkoutElement(workout_element))
    })
)((props) => {
    let {removeItem, ...pass_through_props} = props
    let classes = useStyles()
    let [confirm_delete_open, setConfirmDeleteOpen] = useState(false)
    let [menu_open, setMenuOpen] = useState(false)
    let [menu_location, setMenuLocation] = useState([0,0])
    let [options_location, setOptionsLocation] = useState(null)
    function deleteWorkoutElement() {
        let workout = removeItem(options_location, true)
        props.save(workout)
        setMenuOpen(false)
    }
    function handleOptionsClick(e, location) {
        e.stopPropagation()
        e.preventDefault()
        setMenuOpen(true)
        setMenuLocation([e.clientX, e.clientY - 5])
        setOptionsLocation(location)
    }

    function handleCopy() {
        let workout_element = props.workout_element
        if (options_location.superset_index != undefined) {
            workout_element = workout_element.exercises[options_location.superset_index]
        }
        props.copyWorkoutElement(workout_element)
        setMenuOpen(false)
    }

    function renderOptionsMenu() {
        if (!menu_open) {
            return null
        }
        console.log('location')
        console.log(menu_location)
        return (
            <>
                <div className={classes.rightClickUnderlay} onClick={() => setMenuOpen(false)} onContextMenu={(e) => {e.stopPropagation(); setMenuOpen(false);}}/>
                <div style={{top: menu_location[1] - TOOLTIP_HEIGHT/2, left: menu_location[0] + ARROW_SIZE }} className={classes.optionMenu}>
                    <div className={classes.arrow} />
                    <div className={classes.optionButtonContainer}><div className={clsx(classes.optionButton, classes.copyButton)} onClick={handleCopy}><span>Copy</span></div></div>
                    <div className={classes.optionButtonContainer}><div className={clsx(classes.optionButton, classes.deleteButton)} onClick={deleteWorkoutElement}><span>Delete</span></div></div>
                </div>
            </>
        )
    }

    return (
        <div className={classes.workoutElement} >
            {renderOptionsMenu()}
            {!props.workout_element.exercise_id ? (
                <div className={classes.supersetBlock}>

                    <Superset
                        item_type={dnd_types.SUPERSET}
                        accept={[dnd_types.SUPERSET, dnd_types.EXERCISE]}
                        removeItem={removeItem}
                        classes={classes}
                        handleOptionsClick={handleOptionsClick}
                        {...pass_through_props} />
                </div>
                 ) : (
                 <div className={classes.exerciseBlock} >
                     <MergeableExercise
                         variant='mergeable'
                         item_type={dnd_types.EXERCISE}
                         accept={[dnd_types.SUPERSET, dnd_types.EXERCISE]}
                         removeItem={removeItem}
                         classes={classes}
                         handleOptionsClick={handleOptionsClick}
                         {...pass_through_props}/>
                 </div>

            )}
        </div>
    )
})

export const Superset = dragAndDrop(true, true, false)(SupersetView);
export const MergeableExercise = dragAndDrop(true, true, true)(ExerciseView)
export const NonMergeableExercise = dragAndDrop(true, true, false)(ExerciseView)
