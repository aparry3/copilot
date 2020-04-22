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
export const schemes = {
    AMRAP: {
        type: 'AMRAP',
        title: 'As Many Rounds as Possible',
        options: [
            {title: 'Time', detail: 'duration'}
        ],
        set: ['LADDER']
    },
    RFT: {
        type: 'RFT',
        title: 'Rounds for Time',
        options: [
            {title: 'Rounds', detail: 'sets'}
        ],
        set: ['LADDER']
    },
    LADDER: {
        type: 'LADDER',
        title: 'Ladder',
        options: [
            {title: 'Step', detail: 'step'},
            {title: 'Start', detail: 'start'},
            {title: 'End', detail: 'end'}
        ],
        set: ['RFT', 'EMOM', 'AMRAP']
    },
    EMOM: {
        type: 'EMOM',
        title: 'Every Minute on the Minute',
        options: [
            {title: 'Time', detail: 'duration'}
        ],
        set: ['LADDER']
    }
}

export const types = {
    EXERCISE: 'EXERCISE',
    SUPERSET: 'SUPERSET',
    ALTERNATE: 'ALTERNATE'
}
