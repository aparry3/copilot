import React from 'react'

import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import SkipNextIcon from '@material-ui/icons/SkipNext'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SnoozeIcon from '@material-ui/icons/Snooze';
import StraightenIcon from '@material-ui/icons/Straighten'
import SwapVertIcon from '@material-ui/icons/SwapVert'

import {titleCase} from './utils'

import {makeStyles} from '@material-ui/core/styles';
const styles = theme => ({
    detailTitle: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px'
    },
    detailIcon: {
        padding: '0px 5px',
        disaply: 'flex',
        alignItems:'center'
    },
    detailTitleText: {
        padding: '0px 5px',
        display: 'flex',
        alignItems: 'center'
    },
    detailValue: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px'
    }

})
const useStyles = makeStyles(styles)


export const DetailTitle = props => {
    let classes = useStyles()
    return (
        <div className={classes.detailTitle}>
            <div className={classes.detailIcon}>
                {props.icon}
            </div>
            <div className={props.detailTitleText}>
                {titleCase(props.title)}
            </div>
        </div>
    )
}

const DetailValue = props => {
    let classes = useStyles()
    return (
        <div className={classes.detailValue}>
            <div className={classes.detailIcon}>
                {props.icon}
            </div>
            <div className={props.detailValueText}>
                {props.value}
            </div>
        </div>
    )
}


const DistanceTitle = () => <DetailTitle icon={<StraightenIcon />} title='distance'/>

const DurationTitle = () => <DetailTitle icon={<AccessAlarmIcon />} title='duration'/>

const SetsTitle = () => <DetailTitle icon={<AutorenewIcon />} title='sets'/>

const RepetitionsTitle = () => <DetailTitle icon={<SwapVertIcon />} title='repetitions'/>

const RestTitle = () => <DetailTitle icon={<SnoozeIcon />} title='rest'/>

const WeightTitle = () => <DetailTitle icon={<FitnessCenterIcon />} title='weight'/>

const StartTitle = () => <DetailTitle icon={<SkipPreviousIcon />} title='start'/>

const EndTitle = () => <DetailTitle icon={<SkipNextIcon />} title='end'/>

const StepTitle = () => <DetailTitle icon={<SignalCellularAltIcon />} title='step'/>




const DistanceValue = (value) => <DetailValue icon={<StraightenIcon />} value={value}/>

const DurationValue = (value) => <DetailValue icon={<AccessAlarmIcon />} value={value}/>

const SetsValue = (value) => <DetailValue icon={<AutorenewIcon />} value={value}/>

const RepetitionsValue = (value) => <DetailValue icon={<SwapVertIcon />} value={value}/>

const RestValue = (value) => <DetailValue icon={<SnoozeIcon />} value={value}/>

const WeightValue = (value) => <DetailValue icon={<FitnessCenterIcon />} value={value}/>

const StartValue = (value) => <DetailValue icon={<SkipPreviousIcon />} value={value}/>

const EndValue = (value) => <DetailValue icon={<SkipNextIcon />} value={value}/>

const StepValue = (value) => <DetailValue icon={<SignalCellularAltIcon />} value={value}/>





export const details = {
    distance: { icon: <StraightenIcon />, title: DistanceTitle, value: DistanceValue},
    duration: { icon: <AccessAlarmIcon />, title: DurationTitle, value: DurationValue},
    sets: { icon: <AutorenewIcon />, title: SetsTitle, value: SetsValue},
    repetitions: { icon: <SwapVertIcon />, title: RepetitionsTitle, value: RepetitionsValue},
    rest: { icons: <SnoozeIcon />, title: RestTitle, value: RestValue},
    weight: { icon: <FitnessCenterIcon />, title: WeightTitle, value: WeightValue},
    step: { icon: <SignalCellularAltIcon />, title: StepTitle, value: StepValue},
    start: { icon: <SkipPreviousIcon />, title: StartTitle, value: StartValue},
    end: { icon: <SkipNextIcon />, title: EndTitle, value: EndValue},

}
