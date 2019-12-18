import clsx from 'clsx'
import AddIcon from '@material-ui/icons/Add'
import CreateIcon from '@material-ui/icons/Create'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import {makeStyles, withStyles} from '@material-ui/core/styles';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import {addProgramAndPersist, setActiveProgram} from '../../actions';
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
        padding: '20px',
        width: '100%',
        height: '100%'
    },
    programListContainer: {
        width: '100%',
        flexGrow: 1,
        padding: '20px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    // programItem: {
    //     height: '80px',
    //     padding: '10px',
    //     margin: '1px',
    //     width: '100%',
    //     background: theme.palette.background.light,
    //     boxShadow: `0px 0px 8px -5px ${theme.palette.background.dark}`,
    //     cursor: 'pointer',
    //     '&:hover': {
    //         background: theme.palette.background.mediumDark
    //     }
    // },
    programListBody: {
        width: '100%',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column'
    },
    // programListItem: {
    //     display: 'flex',
    //     justifyContent: 'space-between'
    // },
    // programDetailContainer: {
    //     display: 'flex',
    //     flexDirection: 'column'
    // },
    // left: {
    //     alignItems: 'flex-start',
    //     flexGrow: 1
    // },
    // right: {
    //     alignItems: 'flex-end'
    // },
    // programDetail: {
    //     fontSize: '20px',
    //     fontWeight: 100,
    //     color: theme.text.primary,
    //     width: '100%'
    // },
    // programDetailHeader: {
    //     fontSize: '12px',
    //     fontWeight: 200,
    //     color: theme.text.secondary
    // },
    // programListForm: {
    //     height: '100%',
    //     weight: '100%'
    // },
    // newProgram: {
    //     width: '100%',
    //     height: '100%',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     fontSize: '25px',
    //     fontWeight: 300,
    //     color: theme.text.secondary,
    //     textAlign: 'center'
    // },
    // newProgramIcon: {
    //     height: '30px',
    //     width: '30px'
    // },
    // programNameInput: {
    //     background: 'transparent',
    //     outline: 'none',
    //     border: 'none',
    //     width: '100%'
    // },
    // detailButton: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     height: '30px',
    //     width: '30px',
    //     borderRadius: '10px',
    //     margin: '5px'
    // },
    // detailButtons: {
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // save: {
    //     background: theme.accents.primary,
    //     '&:hover': {
    //         background: theme.accents.primaryHover
    //     }
    // },
    // cancel: {
    //     background: theme.accents.secondary,
    //     '&:hover': {
    //         background: theme.accents.secondaryHover
    //     }
    // },
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

})

let useStyles = makeStyles(styles)
let styled = withStyles(styles)

const ProgramListItem = styled((props) => {
    let {classes} = props

    return (
        <div className={classes.programListRow} onClick={props.handleSelect}>
            <div className={clsx(classes.programRowName, classes.nameColumn)}>{props.program.name}</div>
            <div className={clsx(classes.lengthColumn, classes.programRowLength)}>{props.program.weeks.length}</div>
            <div className={clsx(classes.programRowLastModified, classes.lastModifiedColumn)}>{new Date(props.program.modified).toLocaleDateString()}</div>
            <div className={clsx(classes.programRowAction, classes.actionColumn)}>
                { props.action_selected  ? (<div onClick={props.onEditClick} className={classes.rowActionIconContainer}><CreateIcon /></div>) : (<div onClick={props.onActionClick} className={classes.rowActionIconContainer}><MoreHorizIcon /></div>)}
            </div>
        </div>
    )

})


export function ProgramsListView(props) {
    let {programs} = props
    let [adding_new_exercise, setAddingNewExercise] = useState(false)
    let [name, setName] = useState('');
    let [action_selected_index, setActionSelectedIndex] = useState(null)
    let [selected_program_index, setSelectedProgramIndex] = useState(null)
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
        props.setActiveProgram(program._id)
        props.history.push(`${props.location.pathname}/${program._id}`)
    }

    function handleEditClick(e, index) {

    }

    function handleActionClick(e, index) {

    }

    return (
        <div className={classes.programListPageContainer}>
            <ProgramHeader>
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
                        {programs.map((program, index) => {
                            return (<ProgramListItem
                                onEditClick={(e) => handleEditClick(e, index)}
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

// <div className={clsx(classes.programItem)}>
//     {adding_new_exercise ? (
//         <form className={classes.programListItem} onSubmit={handleSubmit}>
//             <div className={clsx(classes.left, classes.programDetailContainer)}>
//                 <div className={classes.programDetailHeader}>
//                     <span>Name</span>
//                 </div>
//                 <div className={classes.programDetail}>
//                     <input
//                         autocomplete="off"
//                         className={clsx(classes.programDetail, classes.programNameInput)}
//                         id="program_name"
//                         name='program_name' onChange={(e) => setName(e.target.value)}
//                         placeholder="Program name..." value={name}
//                     />
//                 </div>
//             </div>
//             <div className={clsx(classes.programDetailContainer, classes.right)}>
//                 <div className={classes.programDetailHeader}>
//                     <span>save</span>
//                 </div>
//                 <div className={clsx(classes.programDetail, classes.detailButtons)}>
//                     <div className={clsx(classes.detailButton, classes.save)} onClick={handleSubmit}></div>
//                     <div className={clsx(classes.detailButton, classes.cancel)} onClick={handleCancel}></div>
//                 </div>
//             </div>
//         </form>
//     ) : (
//         <div className={classes.newProgram} onClick={() => setAddingNewExercise(true)}>
//             <AddIcon className={classes.newProgramIcon}/><span>Add Program...</span>
//         </div>
//     )}
// </div>
//
// <div className={classes.programList}>
// {programs.length > 0 && programs.map(program => {
//     return (
//         <div key={program._id} className={clsx(classes.programItem, classes.programListItem)} onClick={() => handleSelect(program)}>
//             <div className={classes.programDetailContainer}>
//                 <div className={classes.programDetailHeader}>
//                     <span>Name</span>
//                 </div>
//                 <div className={classes.programDetail}>
//                     <span>{program.name}</span>
//                 </div>
//             </div>
//             <div className={clsx(classes.programDetailContainer, classes.right)}>
//                 <div className={classes.programDetailHeader}>
//                     <span>Last Modified</span>
//                 </div>
//                 <div className={classes.programDetail}>
//                     <span>{new Date(program.modified).toLocaleDateString()}</span>
//                 </div>
//             </div>
//         </div>
//     )
// })}
// </div>

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
            setActiveProgram: (program_id) => dispatch(setActiveProgram(program_id))
        }
    }
)(ProgramsListView)
