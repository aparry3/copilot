import clsx from 'clsx'
import update from 'immutability-helper';
import {WorkoutBlock} from './block'
import { withRouter } from "react-router";
import React, {useRef, useState, useEffect} from 'react';
import {useDrop, useDrag} from 'react-dnd';
import {connect} from 'react-redux'
import {makeStyles, withStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add'
import {showExerciseForm, setActivePage} from '../../actions';
import {dnd_types} from '../../constants/programs';
import {InputTitle} from '../util'
import {dnd_styles, styles} from './day.styles'
import {DragAndDropManager} from './drag_and_drop_manager'

let styled = withStyles(styles)
let useStyles = makeStyles(styles)

let dndStyled = withStyles(dnd_styles)

const DnDManager = dndStyled(DragAndDropManager)

class DayView extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            day: JSON.parse(JSON.stringify(props.day)),
            modal_is_open: false,
            workout_element: null,
            hover: false
        }

        this.updated_state = props.day

        this.addBlock = this.addBlock.bind(this);
        this.update = this.update.bind(this);
        this.setHover = this.setHover.bind(this);
        this.location = this.location.bind(this);
        this.renderBlock = this.renderBlock.bind(this)
        this.updateBlocks = this.updateBlocks.bind(this)
        this.updateBlock = this.updateBlock.bind(this)
        this.getState = this.getState.bind(this)
    }

    componentWillReceiveProps(next_props) {
        this.setState({
            day: JSON.parse(JSON.stringify(next_props.day)),
        })
    }

    update(propety, state, index=null) {

        let updates = !!workout ? [[this.props.index, this.state.workout_blocks], workout] : [[this.props.index, this.state.workout]]
        if (!!workout && workout[0] == this.props.day) {
            updates = [workout]
        }
        this.props.save(updates)
    }

    updateBlocks(workout_blocks) {
        console.log("update day")
        this.updated_state.workout_blocks = JSON.parse(JSON.stringify(workout_blocks))
    }

    updateBlock(index, workout_block) {
        console.log("update day - persist block")
        this.updated_state.workout_blocks[index] = workout_block
    }

    getState() {
        return this.updated_state.workout_blocks
    }

    addBlock() {
        let new_day = update(this.updated_state, {
            workout_blocks: {
                $push: [{
                    workout_elements: [],
                    name: Math.random().toString(36).substring(7)
                }]
            }
        })
        this.setState({
            day: new_day
        })
        this.updated_state = new_day

    }

    setHover(value) {
        this.setState({
            day: JSON.parse(JSON.stringify(this.updated_state)),
            hover: value
        })
    }

    location() {
        return `${this.props.week_id}-${!!this.props.day.name ? this.props.day.name : this.props.index}`
    }
    renderBlock(element, index) {
        return <WorkoutBlock persist={(block) => this.updateBlock(index, block)} workout_block={element} location={this.location} index={index}/>
    }

    render() {
        let {classes, week_id, day, index} = this.props
        return (
            <div onMouseEnter={() => this.setHover(true)} onMouseLeave={() => this.setHover(false)} className={classes.day}>
                <InputTitle onSave={(name) => console.log(name)} value={this.props.day.name} default={`Day ${index + 1}`} />
                <div className={classes.dayContent}>
                    <DnDManager
                        location={this.location}
                        accept={dnd_types.BLOCK}
                        items={this.state.day.workout_blocks}
                        render={this.renderBlock}
                        persist={this.updateBlocks}
                        refresh={this.getState}
                        />
                    { !!this.state.hover && (
                        <div onClick={() => this.addBlock()} className={classes.addBlock}>
                            <span><AddIcon /> Add Block</span>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export const AddDay = (props) => {
    let classes = useStyles()
    let [is_adding_day, setIsAddingDay] = useState(false)
    return (
        <div className={classes.day}>
            <div className={classes.addDayContent}>
                <div className={classes.addDayButton} onClick={props.onAddDay}><span className={classes.addDayText}><AddIcon /> Add Day</span></div>
            </div>
        </div>
    )
}


export const Day = connect(
    state => ({
        program_id: state.programs.active_program._id
    }),
    dispatch => ({
        showExerciseForm: () => dispatch(showExerciseForm(true, null, 'programs')),
        setActivePage: () => dispatch(setActivePage('exercises'))
    })
)(withRouter(styled(DayView)))
