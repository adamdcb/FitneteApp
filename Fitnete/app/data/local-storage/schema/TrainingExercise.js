const TrainingExercise = {
    name: 'TrainingExercise',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
        reps: 'int',
        time: 'int',
        completed: 'bool',
        days: {
            type: 'linkingObjects',
            objectType: 'TrainingDay',
            property: 'exercises'
        }
    }
};

export default TrainingExercise;
