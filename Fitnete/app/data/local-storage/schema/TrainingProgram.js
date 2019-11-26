const TrainingProgram = {
    name: 'TrainingProgram',
    primaryKey: 'id',
    properties: {
        id: 'string',
        type: 'string',
        weeks: 'TrainingWeek[]'
    }
};

export default TrainingProgram;
