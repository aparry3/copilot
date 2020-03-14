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
import {
    addWeekAndPersist,
    didRefreshProgram,
    deleteWeekAndPersist,
    getProgram,
    setActiveProgram,
    setCurrentWeek,
    saveProgram
} from '../../actions';
import {dnd_types} from '../../constants/programs';
import {Week} from './week'
import {InputTitle} from '../util'
import {ProgramHeader} from './program_header'
import {ProgramMenu} from './program_menu'
import {styles} from './program.styles'
let styled = withStyles(styles)
let useStyles = makeStyles(styles)


function ProgramView(props) {
    let classes = props.classes;

    let [menu_open, setMenuOpen] = useState(false)

    function setWeek(week) {
        props.setPage('week')
        props.setCurrentWeek(week)
    }

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
                                    <span className={classes.weekNumber}>Week {index + 1}</span>
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
    // {props.page != 'week' && (<InputTitle onSave={(name) => props.saveProgram(props.program._id, {name: name})} value={props.program.name} />)}

    function renderContent() {
        return (
            <>
                {props.page != 'week' && (<div>{props.program.name}</div>)}
                {props.page == 'week' && (
                    <div>
                        {props.program.name}{props.page == 'week' ? ` - Week: ${props.current_week.index + 1}` : ''}
                    </div>
                )}
            </>
        )
    }

    function getOptions() {
        return [
            {action: () => props.setPage('program'), display: 'Program'}
        ].concat(props.program.weeks.map((w, i) => ({action: () => setWeek(i), display: `Week ${i+1}`})))
    }

    return (
        <div className={classes.programPageContainer}>
            <ProgramMenu
                open={menu_open}
                back={props.history.goBack}
                selectPage={props.setPage}
                addWeek={() => props.addWeek(props.program._id)}
                program={props.program}/>
            <div className={classes.programPage} >
                <ProgramHeader
                    show_menu
                    onMenuClick={toggleMenuOpen}
                    program={props.program}
                    content={renderContent()}
                    tabs={getOptions()}>
                </ProgramHeader>
                <DndProvider backend={HTML5Backend} >
                    {renderPageConent(props.page, props.current_week)}
                </DndProvider>
            </div>
        </div>
    );
}


export const Program = connect(
        (state, ownProps) => {
            return {
                requires_refresh: !!state.programs.requires_refresh,
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
                saveProgram: (program_id, options) => dispatch(saveProgram(program_id, options)),
                didRefreshProgram: () => dispatch(didRefreshProgram()),
                setCurrentWeek: i => dispatch(setCurrentWeek(i))
            }
        }
)(styled((props) => {
    let {props_program, requires_refresh, ...pass_through_props} = props
    let [program, setProgram] = useState(null)
    let [page, setPage] = useState('program')
    useEffect(() => {
        if (!props_program) {
            props.setActiveProgram(props.match.params.program_id)
        } else {
            if (requires_refresh) {
                setProgram(JSON.parse(JSON.stringify(props_program)))
                props.didRefreshProgram()
            }
        }
    }, [page, requires_refresh])


    return (
        <>
            {!!program ? (
                <ProgramView page={page} current_week={props.current_week} setPage={setPage} program={program} {...pass_through_props} />
            ) : <div>Loading...</div>}
        </>
    )
}))
