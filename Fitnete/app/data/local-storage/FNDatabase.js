import User from './schema/User';
import WaterIntake from './schema/WaterIntake';
import WaterIntakeGoal from './schema/WaterIntakeGoal';

const DB_SCHEMA_VERSION = 2;
const DB_SCHEMA = [
    User,
    WaterIntake,
    WaterIntakeGoal
];
let database = null;

export default {
    async open() {
        if (!database) {
            database = await this._openDB();
        }
        console.log('Realm path: ', database ? database.path : 'NULL');
        return database;
    },

    async _openDB() {
        let db = null;
        const Realm = require('realm');
        try {
            db = await Realm.open({
                schema: DB_SCHEMA,
                schemaVersion: DB_SCHEMA_VERSION
            });
        } catch (error) {
            console.log('_openDB()', error);
        } finally {
            return db;
        }
    }
}