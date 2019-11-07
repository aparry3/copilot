import clsx from 'clsx'
import {makeStyles, withStyles} from '@material-ui/core/styles';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import {addProgramAndPersist, getProgram} from '../../actions';
import { Link } from "react-router-dom";
import {history} from '../../util'
import {InputLabel, Input, List, ListItem, ListItemText, FormControl, Card, Select, MenuItem, Typography} from '@material-ui/core'

let styles = (theme) => ({
    programListPageContainer: {
        height: '100%',
        width: '100%'
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
        width: '100%'
    },
    programListContainer: {
        display: 'flex',
        width: '50%',
        flexDirection:' column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        background: theme.palette.background.light,
        boxShadow: `0px 0px 8px -5px ${theme.palette.background.dark}`
    }
})
let useStyles = makeStyles(styles)

export function ProgramsListView(props) {
    let {programs} = props
    let [client_index, setClientIndex] = useState(-1);
    let [name, setName] = useState('');
    let classes = useStyles()
    function handleSubmit(e) {
        e.preventDefault();
        props.addProgram(name, props.clients[client_index]);
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
                    <div className={classes.programListForm}>
                        <form onSubmit={handleSubmit}>
                                <input id="program_name"name='program_name' onChange={(e) => setName(e.target.value)} placeholder="Program name..." value={name} />
                        </form>
                    </div>
                    <div className={classes.programList}>
                    {programs.length > 0 && programs.map(program => {
                        return (
                            <div onClick={() => handleSelect(program)}>
                                <div>{program.name}</div>
                                <div>{Date(program.modified)}</div>
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
            addProgram: (name, client) => dispatch(addProgramAndPersist(name, client)),
        }
    }
)(ProgramsListView)
