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
export const workout_schemes = {
    AMRAP: {type: 'AMRAP', title: 'As Many Rounds as Possible'},
    RFT: {type: 'RFT', title: 'Rounds for Time'},
    LADDER: {type: 'LADDER', title: 'Ladder'},
    EMOM: {type: 'EMOM', title: 'Every Minute on the Minute'}
}

export const types = {
    EXERCISE: 'EXERCISE',
    SUPERSET: 'SUPERSET',
    ALTERNATE: 'ALTERNATE'
}
