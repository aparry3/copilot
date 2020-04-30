import React, {useEffect, useState, useRef} from "react";
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

import { DndProvider, } from 'react-dnd';
import {fade, withStyles, makeStyles} from '@material-ui/core/styles';
import HTML5Backend from 'react-dnd-html5-backend';

import {pages} from '../../../constants/programs';
import Overview from './overview'
import ViewEditWorkoutElement from './view_edit_workout_element'
import Week from './week'
import GetAppIcon from '@material-ui/icons/GetApp';
import {InputTitle} from '../../utils'
import {PageHeader} from '../../utils'
import PrintProgram from './print_program'

import {styles} from './program.styles'
let styled = withStyles(styles)
let useStyles = makeStyles(styles)


export const Program = (props) => {
    let classes = useStyles()

    function setWeek(index) {
        props.setPage(pages.WEEK)
        props.setCurrentWeek(index)
    }

    function goToPrintView() {
        props.history.push(`${props.location.pathname}/print`)
    }

    async function handleDeleteWeek(index) {
        props.deleteWeek(props.program._id, props.program.weeks[index]._id)
    }

    function renderPageConent(page, current_week) {
        switch (page) {
            case pages.WEEK:
                return (
                    <Week week={current_week} index={current_week.index} />
                )
            default:
                return (
                    <Overview program={props.program}/>
                )
        }
    }

    function saveName(name) {
        props.saveProgram({...props.program, name})
    }

    function renderContent() {
        return (
            <>
                {props.page != 'week' && (<InputTitle value={props.program.name} onSave={saveName}/>)}
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
            {action: () => props.setPage(pages.OVERVIEW), display: 'Overview'}
        ].concat(props.program.weeks.map((w, i) => ({action: () => setWeek(i), display: `Week ${i+1}`})))
    }

    return (
        <div className={classes.programPageContainer}>
            <div className={classes.programPage} >
                <PageHeader
                    program={props.program}
                    content={renderContent()}
                    tabs={getOptions()}
                    action={(
                        <div className={classes.exportButton} onClick={goToPrintView}>
                            <GetAppIcon />
                        </div>
                    )}/>
                <DndProvider backend={HTML5Backend} >
                    <div className={classes.programContent}>
                        {renderPageConent(props.page, props.current_week)}
                    </div>
                </DndProvider>
            </div>
        </div>
    );
}
