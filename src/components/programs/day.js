import update from 'immutability-helper';
import React, {useRef, useState, useEffect} from 'react';
import {useDrop, useDrag} from 'react-dnd';
import {connect} from 'react-redux'
import {Grid, MenuItem, Button, List, ListItem, Typography, Divider, Card, CardActions, CardActionArea, CardContent} from '@material-ui/core'
import {makeStyles, withStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add'
import {combineExercises, moveWorkoutElement, setDragElement} from '../../actions';
import {dnd_types} from '../../constants/programs';
import {DragAndDropWorkoutElement} from './workout_element';


const styles = {
    day: {
        flexShrink: 0,
        width:'20%',
        flexDirection: 'column',
        paddingLeft: '5px',
        paddingRight: '5px'
    },
    dayList: {
        overflow: 'auto'
    },
    dayDropArea: {
        height:'100%'
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        height: '80px',
        marginBottom: '10px',
        background: 'white',
        boxShadow: '1px 1px 5px #dadada',
        padding: '5px 0 5px 10px',
        borderLeft: '5px lightblue',
        cursor: 'move'

    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    cardText: {
        height: '60%',
        alignSelf: 'flex-start',
        overflow:'hidden',
        textOverflow:  'ellipsis'
    },
    cardIcons: {
        height: '40%',
        alignSelf: 'flex-end',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end'

    },
    detailIcon: {
        display: 'flex',
        flexDirection: 'row'
    },
    drag: {
        alignSelf: 'center'
    }
};

let styled = withStyles(theme => styles)
let useStyles = makeStyles(theme => styles)

class DayView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            workout: props.workout
        }
        this.moveItem = this.moveItem.bind(this)
        this.removeItem = this.removeItem.bind(this)
    }

    componentWillReceiveProps(next_props) {
        this.setState({
            workout: next_props.workout
        })
    }

    moveItem(location, removeOldItem, merge = false) {
        let item = removeOldItem()
        let old_item = this.state.workout[index]
        let insert_elements = merge ? [[old_item, item]] : [old_item, item]
        let new_workout = update(this.state.workout, {
            $splice: [[index, 1].concat(insert_elements)]
        })
        this.setState({
            workout: new_workout
        })
    }

    removeItem(location) {
        let item = this.state.workout[index]
        let new_workout = update(this.state.workout, {
            $splice: [[index, 1]]
        })
        this.setState({
            workout: new_workout
        })
        return item
    }

    render() {
        let { classes, day_index, week_index } = this.props
        return (
            <ListItem className={classes.day} >
               <div className={classes.dayDropArea}>
                   <Typography variant="h6">{day_index}</Typography>
                   <List className={classes.dayList}>
                       {this.state.workout.map((workout_element, workout_element_index) => {
                           let location = {
                               week_index,
                               day_index,
                               workout_element_index
                           }
                           return (
                               <DragAndDropWorkoutElement
                                    id={workout_element_index}
                                    removeItem={() => this.removeItem(workout_element_index)}
                                    moveItem={this.moveItem}
                                    elem={workout_element}
                                    location={location}
                                    workout_element={workout_element}
                                    classes={classes} />
                           )
                       })}
                       <MenuItem onClick={() => props.onAddExercise(week_index, day_index)}>
                           <Typography variant="body2"><AddIcon /> Add Exercise</Typography></MenuItem>
                   </List>
               </div>
           </ListItem>
        )
    }
}

export const Day = styled(DayView)
