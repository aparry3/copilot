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
    chest: [
        'pectoris major',
        'pectoris minor'
    ],
    back: [
        'trapezius',
        'latissimus dorsi',
        'rhomboid',
        'erectus spinae'
    ],
    abdominals: [
        'internal obliques',
        'external obliques',
        'rectus abdominus',
        'transversus abdominus'
    ],
    legs: [
        'quadriceps',
        'hamstrings',
        'calves'
    ],
    shoulders: [
        'deltoids'
    ],
    arms: [
        'biceps',
        'triceps'
    ]
}
export const allMuscles = () => {
    let muscles = [];
    Object.keys(MUSCLE_GROUPS).forEach(key => {
        muscles = [...muscles, ...MUSCLE_GROUPS[key]]
    });
    return muscles
}
