import clsx from 'clsx'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import {makeStyles, withStyles} from '@material-ui/core/styles';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import {addProgramAndPersist, setActiveProgram, deleteProgramAndPersist} from '../../actions';
import { Link } from "react-router-dom";
import {history} from '../../util'
import {InputLabel, Input, List, ListItem, ListItemText, FormControl, Card, Select, MenuItem, Typography} from '@material-ui/core'
import {ProgramHeader} from './program_header'

let styles = (theme) => ({
    programListPageContainer: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    programListHeader: {
        height: '50px',
        textAlign: 'left',
        width: '100%',
        fontSize: '14px',
        fontWeight: 100,
        color: theme.text.dark,
        opacity: 0.3,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '0px 0px 5px 0px'
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
        width: '100%',
        height: '100%',
        overflow: 'auto'
    },
    programListContainer: {
        width: '100%',
        flexGrow: 1,
        padding: '20px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    programListBody: {
        width: '100%',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column'
    },
    programListRow: {
        width: '100%',
        display: 'flex',
        minHeight: '60px',
        cursor: 'pointer',
        alignItems: 'center',
        '&:hover': {
            background: theme.palette.background.light
        }
    },
    programInputRow: {
        width: '100%',
        display: 'flex',
        minHeight: '60px',
        alignItems: 'center',
    },
    programRowName: {
        width: '50%',
        fontSize: '16px',
        fontWeight: 600,
        padding: '10px'

    },
    programRowLength: {
        fontWeight: 200,
        fontSize: '14px',
        padding: '10px'

    },
    programRowLastModified: {
        padding: '10px'

    },
    programRowAction: {
        padding: '10px',
        cursor: 'pointer'

    },

    headerText: {
        fontWeight: 200
    },
    lengthColumn: {
        width: '20%'
    },
    lastModifiedColumn: {
        width: '30%'
    },
    actionColumn: {
        width: '10%'
    },
    nameColumn: {
        flexGrow: 2,
        width: '40%'
    },
    programHeaderAction: {
        display: 'flex',
        alignItems: 'center',
        jusitfyContent: 'center',
        height: '100%',
        padding: '20px',
    },
    addIconContainer: {
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.background.light
        },
        borderRadius: '5px',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center'

    },
    programLengthInputGroup: {
        display: 'flex',
        alignItems: 'center'
    },
    programInputActions: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center'
    },
    programInputAction: {
        display: 'flex',
        alignItems: 'center',
        jusitfyContent: 'center',
        padding: '5px'
    },
    programInputField: {
        borderRadius: '5px',
        border: `1px solid ${theme.palette.background.light}`,
        padding: '8px',
    },
    programLengthInputField: {
        width: '30px',
        textAlign: 'center',
    },
    programLengthInputLabel: {
        padding: '5px',
        display: 'flex',
        alignItems:'center'
    }

})

let useStyles = makeStyles(styles)
let styled = withStyles(styles)

const ProgramListItem = styled((props) => {
    let {classes} = props

    return (
        <div className={classes.programListRow} onClick={props.handleSelect}>
            <div className={clsx(classes.programRowName, classes.nameColumn)}>{props.program.name}</div>
            <div className={clsx(classes.lengthColumn, classes.programRowLength)}>{`${props.program.weeks.length} weeks`}</div>
            <div className={clsx(classes.programRowLastModified, classes.lastModifiedColumn)}>{new Date(props.program.modified).toLocaleDateString()}</div>
            <div className={clsx(classes.programRowAction, classes.actionColumn)}>
                { props.action_selected  ? (<div onClick={props.onEditClick} className={classes.rowActionIconContainer}><DeleteIcon /></div>) : (<div onClick={props.onActionClick} className={classes.rowActionIconContainer}><MoreHorizIcon /></div>)}
            </div>
        </div>
    )

})


export function ProgramsListView(props) {
    let {programs} = props
    let [adding_new_program, setAddingNewProgram] = useState(false)
    let [program_name, setProgramName] = useState('');
    let [program_length, setProgramLength] = useState(0);
    let [action_selected_index, setActionSelectedIndex] = useState(null)
    let [selected_program_index, setSelectedProgramIndex] = useState(null)
    let classes = useStyles()

    async function handleSubmit(e) {
        e.preventDefault();
        let new_program = await props.addProgram(program_name, program_length);
        setAddingNewProgram(false)
        setProgramName(''),
        setProgramLength(0)
        handleSelect(new_program)
    }

    function handleCancel(e) {
        e.preventDefault();
        setProgramName(''),
        setProgramLength(0)
        setAddingNewProgram(false)
    }

    function handleSelect(program) {
        props.setActiveProgram(program._id)
        props.history.push(`${props.location.pathname}/${program._id}`)
    }

    async function handleEditClick(e, program) {
        e.stopPropagation()
        e.preventDefault()
        await props.deleteProgram(program._id)
        setActionSelectedIndex(null)
    }

    function handleActionClick(e, index) {
        e.stopPropagation()
        e.preventDefault()
        setActionSelectedIndex(index)
    }

    function handleChangeProgramLength(e) {
        let length = !!e.target.value ? e.target.value : 0
        length = parseInt(length)
        setProgramLength(length)
    }

    return (
        <div className={classes.programListPageContainer}>
            <ProgramHeader action={<div className={classes.programHeaderAction}><div onClick={() => setAddingNewProgram(true)} className={classes.addIconContainer}><AddIcon /></div></div>}>
                <span>Programs</span>
            </ProgramHeader>
            <div className={classes.programListPageContent}>
                <div className={classes.programListContainer}>
                    <div className={classes.programListHeader} >
                        <div className={classes.nameColumn}><span className={classes.headerText}>Name</span></div>
                        <div className={classes.lengthColumn}><span className={classes.headerText}>Length</span></div>
                        <div className={classes.lastModifiedColumn}><span className={classes.headerText}>Last Modified</span></div>
                        <div className={classes.actionColumn}><span className={classes.headerText}>Action</span></div>
                    </div>
                    <hr className={classes.hr} />
                    <div className={classes.programListBody}>
                        {!!adding_new_program && (
                        <div className={classes.programInputRow}>
                            <div className={clsx(classes.programRowName, classes.nameColumn)}>
                                <input autocomplete="off" className={classes.programInputField} name="program-name" value={program_name} placeholder='Name...' onChange={(e) => setProgramName(e.target.value)} />
                            </div>
                            <div className={clsx(classes.lengthColumn, classes.programRowLength)}>
                                <div className={classes.programLengthInputGroup}>
                                    <input className={clsx(classes.programLengthInputField, classes.programInputField)} name="program-length" value={program_length} onChange={handleChangeProgramLength} />
                                    <div className={classes.programLengthInputLabel}><span>weeks</span></div>
                                </div>
                            </div>
                            <div className={clsx(classes.programRowLastModified, classes.lastModifiedColumn)} />
                            <div className={clsx(classes.programRowAction, classes.actionColumn)}>
                                <div className={classes.programInputActions}>
                                    <div onClick={handleSubmit} className={classes.programInputAction}><CheckIcon /></div>
                                    <div onClick={handleCancel} className={classes.programInputAction}><ClearIcon /></div>
                                </div>
                            </div>
                        </div>
                        )}
                        {programs.map((program, index) => {
                            return (<ProgramListItem
                                onEditClick={(e) => handleEditClick(e, program)}
                                onActionClick={(e) => handleActionClick(e, index)}
                                action_selected={action_selected_index == index}
                                selected={index == selected_program_index}
                                index={index}
                                handleSelect={() => handleSelect(program)}
                                key={program._id}
                                program={program}/>
                            );
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
            addProgram: (name, length) => dispatch(addProgramAndPersist(name, length)),
            deleteProgram: (program_id) => dispatch(deleteProgramAndPersist(program_id)),
            setActiveProgram: (program_id) => dispatch(setActiveProgram(program_id))
        }
    }
)(ProgramsListView)
