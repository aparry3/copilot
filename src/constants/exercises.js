export const EXERCISE = {
    name: '',
    description: '',
    tags: [],
    muscle_groups: [],
    muscles: [],
    id: '',
    images: [],
    videos: [],
    category: null,
    alternatives: '',
    equipment: [],
    movement: null,
    compound: false,
    new: true
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
        color: '#ffbd3f'
    },
    legs: {
        muscles: [
            'quadriceps',
            'hamstrings',
            'calves'
        ],
        color: '#7ae5ff'
    },
    shoulders: {
        muscles:[
            'deltoids'
        ],
        color: '#f7f76a'
    },
    arms: {
        muscles: [
            'biceps',
            'triceps'
        ],
        color: '#ffc0cb'
    }
}
export const allMuscles = () => {
    let muscles = [];
    Object.keys(MUSCLE_GROUPS).forEach(key => {
        muscles = [...muscles, ...MUSCLE_GROUPS[key].muscles.map(m => ({name: m, muscle_group: key}))]
    });
    return muscles
}
