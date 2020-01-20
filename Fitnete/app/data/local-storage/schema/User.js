const User = {
    name: 'User',
    primaryKey: 'id',
    properties: {
        id: 'int',
        termsAccepted: {
            type: 'bool',
            default: false
        },
        gender: 'string?',
        height: 'double?',
        weight: 'double?',
        targetWeight: 'double?',
        fitnessLevel: 'int?',
        areasOfFocus: 'string?[]',
        unit: {
            type: 'string',
            default: 'metric'
        },
        subscriptionId: 'string?'
    }
};

export default User;
