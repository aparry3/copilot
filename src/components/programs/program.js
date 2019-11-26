import {
    Divider,
    Grid
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear';
import { connect } from 'react-redux';
import { DndProvider, } from 'react-dnd';
import {fade, withStyles} from '@material-ui/core/styles';
import HTML5Backend from 'react-dnd-html5-backend';
import React, {useEffect, useState} from "react";
import update from 'immutability-helper';
import {addWeekAndPersist, deleteWeekAndPersist, getProgram, setActiveProgram} from '../../actions';
import {dnd_types} from '../../constants/programs';
import {Week} from './week'
import {ProgramHeader} from './program_header'
import {ProgramMenu} from './program_menu'

const styled = withStyles(theme => ({
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
    }

}));

function ProgramView(props) {
    let classes = props.classes;
    console.log("program")

    let [menu_open, setMenuOpen] = useState(false)
    let [page, setPage] = useState('program')
    let [current_week, setCurrentWeek] = useState(null)

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
    console.log("current_week")
    console.log(current_week)
    return (
        <div className={classes.programPageContainer}>
            <ProgramMenu open={menu_open} back={props.history.goBack} selectPage={setPage} addWeek={() => props.addWeek(props.program._id)} setCurrentWeek={setCurrentWeek} program={props.program}/>
            <div className={classes.programPage} >
                <ProgramHeader show_menu onMenuClick={toggleMenuOpen} program={props.program} >
                    <div>{props.program.name}{page == 'week' ? ` - Week: ${current_week.index + 1}` : ''}</div>
                </ProgramHeader>
                <DndProvider backend={HTML5Backend} >
                    {renderPageConent(page, current_week)}
                </DndProvider>
            </div>
        </div>
    );
}

export const Program = connect(
        (state, ownProps) => {
            return {
                week_count: !!state.programs.active_program ? state.programs.active_program.weeks.length : null,
                props_program: state.programs.active_program,
                user: state.auth.user
            }
        },
        (dispatch) => {
            return {
                addWeek: (program_id) => dispatch(addWeekAndPersist(program_id)),
                getProgram: (program_id) => dispatch(getProgram(program_id)),
                deleteWeek: (program_id, week_id) => dispatch(deleteWeekAndPersist(program_id, week_id)),
                setActiveProgram: (program_id) => dispatch(setActiveProgram(program_id))

            }
        }
)(styled((props) => {
    let {props_program, week_count, ...pass_through_props} = props
    let [program, setProgram] = useState(null)

    useEffect(() => {
        console.log("set prog")
        if (!props_program) {
            props.setActiveProgram(props.match.params.program_id)
        } else {
            setProgram(JSON.parse(JSON.stringify(props_program)))
        }
    }, [week_count])

    return (
        <>
            {!!program ? (
                <ProgramView program={program} {...pass_through_props} />
            ) : <div>Loading...</div>}
        </>
    )
}))
