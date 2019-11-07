import clsx from 'clsx'
import AddIcon from '@material-ui/icons/Add'
import {makeStyles, withStyles} from '@material-ui/core/styles';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import {addProgramAndPersist, getProgram} from '../../actions';
import { Link } from "react-router-dom";
import {history} from '../../util'
import {InputLabel, Input, List, ListItem, ListItemText, FormControl, Card, Select, MenuItem, Typography} from '@material-ui/core'

let styles = (theme) => ({
    programListPageContainer: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    programListHeader: {
        width: '100%',
        height: '15%',
        background: theme.palette.background.light,
        boxShadow: `0px 0px 8px -5px ${theme.palette.background.dark}`,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        fontSize: '40px',
        fontWeight: 100,
        textAlign: 'center'
    },
    hr: {
        width: '100%',
        background: theme.palette.background.dark,
        opacity: 0.1,
        margin: '0',
        border: 0,
        borderTop: '2px solid rgba(0,0,0,.1)'
    },
    programListPageContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '20px',
        width: '100%',
        height: '100%'
    },
    programListContainer: {
        display: 'flex',
        width: '80%',
        flexDirection:' column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%'
    },
    programItem: {
        height: '80px',
        padding: '10px',
        margin: '1px',
        width: '100%',
        background: theme.palette.background.light,
        boxShadow: `0px 0px 8px -5px ${theme.palette.background.dark}`,
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.background.mediumDark
        }
    },
    programList: {
        width: '100%',
        height: '100%',
        overflow: 'auto'
    },
    programListItem: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    programDetailContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    left: {
        alignItems: 'flex-start',
        flexGrow: 1
    },
    right: {
        alignItems: 'flex-end'
    },
    programDetail: {
        fontSize: '20px',
        fontWeight: 100,
        color: theme.text.primary,
        width: '100%'
    },
    programDetailHeader: {
        fontSize: '12px',
        fontWeight: 200,
        color: theme.text.secondary
    },
    programListForm: {
        height: '100%',
        weight: '100%'
    },
    newProgram: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '25px',
        fontWeight: 300,
        color: theme.text.secondary,
        textAlign: 'center'
    },
    newProgramIcon: {
        height: '30px',
        width: '30px'
    },
    programNameInput: {
        background: 'transparent',
        outline: 'none',
        border: 'none',
        width: '100%'
    },
    detailButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30px',
        width: '30px',
        borderRadius: '10px',
        margin: '5px'
    },
    detailButtons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    save: {
        background: theme.accents.primary,
        '&:hover': {
            background: theme.accents.primaryHover
        }
    },
    cancel: {
        background: theme.accents.secondary,
        '&:hover': {
            background: theme.accents.secondaryHover
        }
    }
})
let useStyles = makeStyles(styles)

export function ProgramsListView(props) {
    let {programs} = props
    let [adding_new_exercise, setAddingNewExercise] = useState(false)
    let [name, setName] = useState('');
    let classes = useStyles()
    function handleSubmit(e) {
        e.preventDefault();
        props.addProgram(name);
        setAddingNewExercise(false)
        setName('')
    }
    function handleCancel(e) {
        e.preventDefault();
        setName(''),
        setAddingNewExercise(false)
    }
    function handleSelect(program) {
        props.history.push(`${props.location.pathname}/${program._id}`)
    }
    return (
        <div className={classes.programListPageContainer}>
            <div className={classes.programListHeader}>
                <span>Programs</span>
                <hr className={classes.hr}/>
            </div>
            <div className={classes.programListPageContent}>
                <div className={classes.programListContainer}>
                    <div className={clsx(classes.programItem)}>
                        {adding_new_exercise ? (
                            <form className={classes.programListItem} onSubmit={handleSubmit}>
                                <div className={clsx(classes.left, classes.programDetailContainer)}>
                                    <div className={classes.programDetailHeader}>
                                        <span>Name</span>
                                    </div>
                                    <div className={classes.programDetail}>
                                        <input
                                            autocomplete="off"
                                            className={clsx(classes.programDetail, classes.programNameInput)}
                                            id="program_name"
                                            name='program_name' onChange={(e) => setName(e.target.value)}
                                            placeholder="Program name..." value={name}
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.programDetailContainer, classes.right)}>
                                    <div className={classes.programDetailHeader}>
                                        <span>save</span>
                                    </div>
                                    <div className={clsx(classes.programDetail, classes.detailButtons)}>
                                        <div className={clsx(classes.detailButton, classes.save)} onClick={handleSubmit}></div>
                                        <div className={clsx(classes.detailButton, classes.cancel)} onClick={handleCancel}></div>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className={classes.newProgram} onClick={() => setAddingNewExercise(true)}>
                                <AddIcon className={classes.newProgramIcon}/><span>Add Program...</span>
                            </div>
                        )}
                    </div>
                    <div className={classes.programList}>
                    {programs.length > 0 && programs.map(program => {
                        return (
                            <div className={clsx(classes.programItem, classes.programListItem)} onClick={() => handleSelect(program)}>
                                <div className={classes.programDetailContainer}>
                                    <div className={classes.programDetailHeader}>
                                        <span>Name</span>
                                    </div>
                                    <div className={classes.programDetail}>
                                        <span>{program.name}</span>
                                    </div>
                                </div>
                                <div className={clsx(classes.programDetailContainer, classes.right)}>
                                    <div className={classes.programDetailHeader}>
                                        <span>Last Modified</span>
                                    </div>
                                    <div className={classes.programDetail}>
                                        <span>{new Date(program.modified).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
        </div>
    )
}
export const ProgramsList = connect(
    (state, ownProps) => {
        return {
            programs: state.programs.all_programs,
            clients: state.auth.user.clients,
            user: state.auth.user
        }
    },
    dispatch => {
        return {
            addProgram: (name) => dispatch(addProgramAndPersist(name)),
        }
    }
)(ProgramsListView)
