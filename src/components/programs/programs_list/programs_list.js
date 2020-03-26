import React, {useState} from 'react';
import clsx from 'clsx'

import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import {PageHeader} from '../../utils'

import {styles} from './programs_list.styles'
import {makeStyles, withStyles} from '@material-ui/core/styles';
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


export const ProgramsList = (props) => {
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
        handleSelect(new_program.program)
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
            <PageHeader
                content={<span>Programs</span>}
                action={<div className={classes.programHeaderAction}><div onClick={() => setAddingNewProgram(true)} className={classes.addIconContainer}><AddIcon /></div></div>} />
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
