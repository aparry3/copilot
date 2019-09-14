import React from 'react';
import {Grid, Button, List, ListItem, Typography, Divider, Card, CardActions, CardActionArea, CardContent} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import AutorenewIcon from '@material-ui/icons/Autorenew'
import SwapVertIcon from '@material-ui/icons/SwapVert'
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
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
    card: {
        display: 'flex',
        flexDirection: 'row',
        height: '80px',
        marginBottom: '10px',
        background: 'white',
        boxShadow: '1px 1px 5px #dadada',
        padding: '5px 0 5px 5px',
        borderLeft: '5px lightblue'
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
        flexDirection: 'row'

    },
    detailIcon: {
        display: 'flex',
        flexDirection: 'row'
    },
    drag: {
        alignSelf: 'center'
    }
}));

export const Day = (props) => {
    let {day, week_id, workout} = props;
    let classes = useStyles();
    function renderExercise(workout_element, index=null) {
        return (
            <div>
            {workout_element.exercise_id ? (
            <Card className={classes.card}>
                <div className={classes.cardContent}>
                    <div className={classes.cardText}>
                        <Typography gutterBottom variant="body2">
                            {workout_element.exercise_name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {workout_element.notes}
                        </Typography>
                    </div>
                    <Divider variant="middle" />
                    <div className={classes.cardIcons}>
                        <div className={classes.detailIcon}>
                            <AutorenewIcon fontSize="small"/><Typography >5</Typography>
                        </div>
                        <div className={classes.detailIcon}>
                            <SwapVertIcon fontSize="small"/><Typography >5</Typography>
                        </div>
                    </div>
                </div>
                <div className={classes.drag}>
                    <MoreVertIcon fontSize="small"/>
                </div>
            </Card> ) : (
                <List>
                    {workout_element.exercises.map((ex, index)=> {
                        return (<ListItem>{renderExercise(ex, index)}</ListItem>)
                    })}
                </List>
            )}
            </div>
        )
    }
    return (
        <ListItem className={classes.day} >
            <Typography variant="h6">{day}</Typography>
            <List className={classes.dayList}>
                {workout.workout_elements && workout.workout_elements.map((workout_element, index) => {
                    return (
                        renderExercise(workout_element, index)
                    )
                })}
                <ListItem><button className='btn btn-success' onClick={() => props.onAddExercise(week_id, day)}>Add Exercise</button></ListItem>
            </List>
        </ListItem>
    )
}
