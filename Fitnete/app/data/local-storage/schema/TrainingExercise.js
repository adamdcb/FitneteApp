const TrainingExercise = {
    name: 'TrainingExercise',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
        reps: 'int',
        time: 'int',
        needsGear: 'bool?',
        completed: {
            type: 'bool',
            default: false
        },
        days: {
            type: 'linkingObjects',
            objectType: 'TrainingDay',
            property: 'exercises'
        }
    }
};

export default TrainingExercise;
