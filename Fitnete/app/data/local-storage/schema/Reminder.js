const Reminder = {
    name: 'Reminder',
    primaryKey: 'id',
    properties: {
        id: 'string',
        day: 'string',
        time: 'string',
        repeatInterval: 'string',
        firstFireDate: 'int'
    }
};

export default Reminder;
