const TrainingWeek = {
    name: 'TrainingWeek',
    primaryKey: 'id',
    properties: {
        id: 'string',
        days: 'TrainingDay[]',
        programs: {
            type: 'linkingObjects',
            objectType: 'TrainingProgram',
            property: 'weeks'
        }
    }
};

export default TrainingWeek;
