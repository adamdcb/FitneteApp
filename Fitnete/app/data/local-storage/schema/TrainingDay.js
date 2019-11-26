const TrainingDay = {
    name: 'TrainingDay',
    primaryKey: 'id',
    properties: {
        id: 'string',
        difficulty: 'int',
        exercises: 'TrainingExercise[]',
        weeks: {
            type: 'linkingObjects',
            objectType: 'TrainingWeek',
            property: 'days'
        }
    }
};

export default TrainingDay;
