import React, {useEffect, useState, useRef} from "react";

import { DndProvider, } from 'react-dnd';
import {fade, withStyles, makeStyles} from '@material-ui/core/styles';
import HTML5Backend from 'react-dnd-html5-backend';

import {pages} from '../../../constants/programs';
import Overview from './overview'
import ViewEditWorkoutElement from './view_edit_workout_element'
import Week from './week'
import {InputTitle} from '../../utils'
import {PageHeader} from '../../utils'

import {styles} from './program.styles'
let styled = withStyles(styles)
let useStyles = makeStyles(styles)


export const Program = (props) => {
    let classes = useStyles()


    function setWeek(index) {
        props.setPage(pages.WEEK)
        props.setCurrentWeek(index)
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
            {action: () => props.setPage(pages.OVERVIEW), display: 'Overview'}
        ].concat(props.program.weeks.map((w, i) => ({action: () => setWeek(i), display: `Week ${i+1}`})))
    }
    // <ProgramMenu
    //     open={menu_open}
    //     back={props.history.goBack}
    //     selectPage={props.setPage}
    //     addWeek={() => props.addWeek(props.program._id)}
    //     program={props.program}/>

    return (
        <div className={classes.programPageContainer}>
            <div className={classes.programPage} >
                <PageHeader
                    program={props.program}
                    content={renderContent()}
                    tabs={getOptions()} />
                <DndProvider backend={HTML5Backend} >
                    <div className={classes.programContent}>
                        {renderPageConent(props.page, props.current_week)}
                    </div>
                </DndProvider>
            </div>
        </div>
    );
}
