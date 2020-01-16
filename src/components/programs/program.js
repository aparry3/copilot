import {
    Divider,
    Grid
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear';
import { connect } from 'react-redux';
import { DndProvider, } from 'react-dnd';
import {fade, withStyles, makeStyles} from '@material-ui/core/styles';
import HTML5Backend from 'react-dnd-html5-backend';
import React, {useEffect, useState, useRef} from "react";
import update from 'immutability-helper';
import {addWeekAndPersist, deleteWeekAndPersist, getProgram, setActiveProgram, saveProgram} from '../../actions';
import {dnd_types} from '../../constants/programs';
import {Week} from './week'
import {ProgramHeader} from './program_header'
import {ProgramMenu} from './program_menu'

const styles = theme => ({
    programPageContainer: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    programPage: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        overflow: 'hidden'
    },
    back: {
        color: theme.text.secondary,
        fontSize: '18px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    program: {
        flexGrow: 1,
        overflow: 'auto'
    },
    weekContainer: {
        width: '100%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column'
    },
    weekHeader: {
        width: '100%',
        height: '50px',
        padding: '0 25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    deleteWeek: {
        width: '30px',
        height: '30px',
        borderRadius: '8px',
        color: theme.text.secondary,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            color: theme.text.accents.error,
            background: theme.accents.error
        }
    },
    deleteIcon: {
        height: '25px'
    },
    addWeekSection: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px'
    },
    addWeek: {
        borderRadius: '25px',
        height: '50px',
        width: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        cursor: 'pointer',
        background: theme.palette.background.mediumDark,
        opacity: 0.1,
        '&:hover': {
            opacity: .5
        }
    },
    week: {
        height: '100%'
    }

});
let styled = withStyles(styles)
let useStyles = makeStyles(styles)

function ProgramView(props) {
    let classes = props.classes;

    let [menu_open, setMenuOpen] = useState(false)

    async function handleDeleteWeek(index) {
        props.deleteWeek(props.program._id, props.program.weeks[index]._id)
    }
    function toggleMenuOpen() {
        setMenuOpen(!menu_open)
    }
    function renderPageConent(page, current_week) {
        let content = {
            'week': () => {
                console.log(current_week)
                return (
                <div className={classes.week}>
                    <Week week={current_week} index={current_week.index} />
                </div>
            )},
            'program': () => (
                <div className={classes.program}>
                    {props.program.weeks.map((week, index) => {
                        return (
                            <div className={classes.weekContainer} key={`${week._id}`}>
                                <div className={classes.weekHeader}>
                                    <span className={classes.weekNumber}>week {index + 1}</span>
                                    <div className={classes.deleteWeek} onClick={() => handleDeleteWeek(index)}>
                                        <ClearIcon className={classes.deleteIcon} />
                                    </div>
                                </div>
                                <Week week={week} index={index} />
                                <Divider variant="middle"/>
                            </div>
                        )
                    })}
                    <div className={classes.addWeekSection}>
                        <div className={classes.addWeek} onClick={() => props.addWeek(props.program._id)}><span className={classes.addWeekText}><AddIcon /> Add Week</span></div>
                    </div>
                </div>
            )
        }
        return content[page]()
    }

    return (
        <div className={classes.programPageContainer}>
            <ProgramMenu open={menu_open} back={props.history.goBack} selectPage={props.setPage} addWeek={() => props.addWeek(props.program._id)} program={props.program}/>
            <div className={classes.programPage} >
                <ProgramHeader show_menu onMenuClick={toggleMenuOpen} program={props.program} >
                    {props.page != 'week' && (<ProgramName onSave={(name) => props.saveProgram(props.program._id, {name: name})} program={props.program} />)}
                    {props.page == 'week' && (
                        <div>
                            {props.program.name}{props.page == 'week' ? ` - Week: ${props.current_week.index + 1}` : ''}
                        </div>
                    )}
                </ProgramHeader>
                <DndProvider backend={HTML5Backend} >
                    {renderPageConent(props.page, props.current_week)}
                </DndProvider>
            </div>
        </div>
    );
}

function ProgramName(props) {
    let classes = useStyles()
    let [name, setName] = useState(props.program.name)
    let [is_focused, setIsFocused] = useState(false)

    let ref = useRef(null)

    useEffect(() => {
        if (is_focused) {
            ref.current.focus()
        }
    }, [is_focused])

    function handleChange(e) {
        setName(e.target.value)
    }

    function handleFocus() {
        setIsFocused(true)
    }

    function handleBlur() {
        setIsFocused(false)
        props.onSave(name)
    }

    return (
        <div>
        {!!is_focused ? (
            <input ref={ref} value={name} onBlur={handleBlur} onChange={handleChange} name='name' />
            ) : (
            <div onClick={handleFocus}>
                <span>
                    {name}
                </span>
            </div>
        )}
        </div>
    )
}

export const Program = connect(
        (state, ownProps) => {
            return {
                week_count: !!state.programs.active_program ? state.programs.active_program.weeks.length : null,
                props_program: state.programs.active_program,
                user: state.auth.user,
                current_week: state.programs.current_week
            }
        },
        (dispatch) => {
            return {
                addWeek: (program_id) => dispatch(addWeekAndPersist(program_id)),
                getProgram: (program_id) => dispatch(getProgram(program_id)),
                deleteWeek: (program_id, week_id) => dispatch(deleteWeekAndPersist(program_id, week_id)),
                setActiveProgram: (program_id) => dispatch(setActiveProgram(program_id)),
                saveProgram: (program_id, options) => dispatch(saveProgram(program_id, options))
            }
        }
)(styled((props) => {
    let {props_program, week_count, ...pass_through_props} = props
    let [program, setProgram] = useState(null)
    let [page, setPage] = useState('program')

    useEffect(() => {
        if (!props_program) {
            props.setActiveProgram(props.match.params.program_id)
        } else {
            setProgram(JSON.parse(JSON.stringify(props_program)))
        }
    }, [week_count, page, props.current_week])
    return (
        <>
            {!!program ? (
                <ProgramView page={page} current_week={props.current_week} setPage={setPage} program={program} {...pass_through_props} />
            ) : <div>Loading...</div>}
        </>
    )
}))
