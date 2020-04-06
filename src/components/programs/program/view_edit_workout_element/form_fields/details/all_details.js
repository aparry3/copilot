import React from 'react'

import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import StraightenIcon from '@material-ui/icons/Straighten'
import SwapVertIcon from '@material-ui/icons/SwapVert'

import {titleCase} from '../../../../../utils'

import {makeStyles} from '@material-ui/core/styles';
const styles = theme => ({
    detailTitle: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px'
    },
    detailTitleIcon: {
        padding: '0px 5px',
        disaply: 'flex',
        alignItems:'center'
    },
    detailTitleText: {
        padding: '0px 5px',
        display: 'flex',
        alignItems: 'center'
    }

})
const useStyles = makeStyles(styles)


const DetailTitle = props => {
    let classes = useStyles()
    return (
        <div className={classes.detailTitle}>
            <div className={classes.detailTitleIcon}>
                {props.icon}
            </div>
            <div className={props.detailTitleText}>
                {titleCase(props.title)}
            </div>
        </div>
    )
}



const Distance = () => <DetailTitle icon={<StraightenIcon />} title='distance'/>

const Duration = () => <DetailTitle icon={<AccessAlarmIcon />} title='duration'/>

const Sets = () => <DetailTitle icon={<AutorenewIcon />} title='sets'/>

const Repetitions = () => <DetailTitle icon={<SwapVertIcon />} title='repetitions'/>

const Weight = () => <DetailTitle icon={<FitnessCenterIcon />} title='weight'/>


export const all_details = {
    distance: { icon: <StraightenIcon />, title: Distance},
    duration: { icon: <AccessAlarmIcon />, title: Duration},
    sets: { icon: <AutorenewIcon />, title: Sets},
    repetitions: { icon: <SwapVertIcon />, title: Repetitions},
    weight: { icon: <FitnessCenterIcon />, title: Weight}

}
