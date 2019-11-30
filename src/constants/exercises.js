export const EXERCISE = {
    name: '',
    description: '',
    tags: [],
    muscle_groups: [],
    primary_muscles: [],
    secondary_muscles: [],
    id: '',
    images: [],
    videos: [],
    categories: []

}
export const CATEGORIES = [
    'Strength', 'Aerobic', 'Flexibility', 'Balance', 'Rest'
]
export const MUSCLE_GROUPS = {
    chest: {
        muscles: [
            'pectoris major',
            'pectoris minor'
        ],
        color: '#95f795',
    },
    back: {
        muscles: [
            'trapezius',
            'latissimus dorsi',
            'rhomboid',
            'erectus spinae'
        ],
        color: '#ffc9ff'
    },
    abdominals: {
        muscles: [
            'internal obliques',
            'external obliques',
            'rectus abdominus',
            'transversus abdominus'
        ],
        color: 'orange'
    },
    legs: {
        muscles: [
            'quadriceps',
            'hamstrings',
            'calves'
        ],
        color: 'blue'
    },
    shoulders: {
        muscles:[
            'deltoids'
        ],
        color: 'yellow'
    },
    arms: {
        muscles: [
            'biceps',
            'triceps'
        ],
        color: 'pink'
    }
}
export const allMuscles = () => {
    let muscles = [];
    Object.keys(MUSCLE_GROUPS).forEach(key => {
        muscles = [...muscles, ...MUSCLE_GROUPS[key].muscles.map(m => ({name: m, muscle_group: key}))]
    });
    return muscles
}
