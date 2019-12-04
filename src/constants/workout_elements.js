import React from 'react'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import SwapVertIcon from '@material-ui/icons/SwapVert'
import TimerIcon from '@material-ui/icons/Timer';
import SpaceBarIcon from '@material-ui/icons/SpaceBar';
import AssessmentIcon from '@material-ui/icons/Assessment';

export const DETAILS = {
    'sets': {
        units: null,
        icon: <AutorenewIcon />
    },
    'repetitions': {
        units: null,
        icon: <SwapVertIcon />
    },
    'duration': {
        units: ['m', 'h', 's'],
        icon: <TimerIcon />
    },
    'distance': {
        units: ['ft', 'mi', 'm', 'km'],
        icon: <SpaceBarIcon />
    },
    'weight': {
        units: ['lb', 'kg'],
        icon: <AssessmentIcon />
    }
}
export const WORKOUT_SCHEMES = ['AMRAP', 'For Time', 'Pyramid'];
