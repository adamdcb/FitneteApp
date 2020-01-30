import * as legsProgram from '../utils/data/legs.json';
import * as abdominalsProgram from '../utils/data/abdominals.json';
import * as armsAndBackProgram from '../utils/data/armsAndBack.json';
import * as armsAndChestProgram from '../utils/data/armsAndChest.json';
import * as generalProgram from '../utils/data/general.json';
import UserDataSource from './UserDataSource.js';
import TrainingDataSource from './TrainingDataSource.js';

const PROGRAM = {
    legs: legsProgram,
    abdominals: abdominalsProgram,
    arms_and_back: armsAndBackProgram,
    arms_and_chest: armsAndChestProgram,
    general: generalProgram
};

const PROGRAM_SLICE = {
    0: [0, 1, 2, 3, 4, 5, 6],
    1: [1, 2, 3, 4, 6, 7],
    2: [2, 3, 4, 6, 7],
    3: [4, 5, 6, 7]
}; // fitness level to week start/end index mapping -> FIXME: Should be moved to server side!

const WORKOUTS_PER_WEEK = {
    0: 2,
    1: 3,
    2: 5,
    3: 6
}; // fitness level to number of workouts per week mapping -> FIXME: Should be moved to server side!

const subscriptions = new Set();

export default {
    PROGRAM_SLICE,
    WORKOUTS_PER_WEEK,

    async prepareWorkouts() {
        const userDataSource = new UserDataSource();
        const trainingDataSource = new TrainingDataSource();
        try {
            const user = await userDataSource.getUser();
            const programSlice = PROGRAM_SLICE[user.fitnessLevel];
            const programs = user.areasOfFocus.reduce((acc, area) => {
                const program = PROGRAM[area];
                const personalisedProgram = {
                    ...program
                }
                personalisedProgram.weeks = program.weeks.filter((value, index) => programSlice.includes(index));
                return acc.concat(personalisedProgram);
            }, [])
            await trainingDataSource.savePrograms(programs);
            subscriptions.forEach((s) => {
                if (s.onWorkoutDataChange) {
                    s.onWorkoutDataChange();
                }
            });
            return true;
        } catch (error) {
            console.log('prepareWorkouts()', error);
            return false;
        }
    },

    subscribe(subscriber) {
        subscriptions.add(subscriber);
    },

    unsubscribe(subscriber) {
        subscriptions.delete(subscriber);
    },
}