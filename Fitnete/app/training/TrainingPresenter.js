import * as legsProgram from '../utils/data/legs.json';
import * as abdominalsProgram from '../utils/data/abdominals.json';
import * as armsAndBackProgram from '../utils/data/armsAndBack.json';
import * as armsAndChestProgram from '../utils/data/armsAndChest.json';
import I18n from '../utils/i18n/I18n';
import Utils from '../utils/utils/Utils.js';
import UserDataSource from '../data/UserDataSource';

const PROGRAM_DURATION = {
    0: 49,
    1: 42,
    2: 35,
    3: 28
}; // fitness level to no. of days mapping

const PROGRAM_SLICE = {
    0: {
        start: 0,
        end: 7
    },
    1: {
        start: 1,
        end: 6
    },
    2: {
        start: 3,
        end: 8
    },
    3: {
        start: 4,
        end: 8
    }
}; // fitness level to week start/end index mapping

const PROGRAM = {
    legs: legsProgram,
    abdominals: abdominalsProgram,
    arms_and_back: armsAndBackProgram,
    arms_and_chest: armsAndChestProgram
};

const DIFFICULTY = {
    0: 'easy',
    1: 'medium',
    2: 'hard'
};

const DEFAULT_REST_TIME = 45; // sec.
const REP_TIME_COEFF = 1.5;

const PROGRAM_BACKGROUND = {
    legs: {
        colors: ['#000000', '#64162D', '#F0005B', '#F0005B'],
        locations: [0, 0.34, 0.78, 1],
        angle: 180
    },
    abdominals: {
        colors: ['#000000', '#421A6A', '#6C38DC', '#6C38DC'],
        locations: [0, 0.34, 0.78, 1],
        angle: 180
    },
    arms_and_back: {
        colors: ['#000000', '#763F33', '#EDC200', '#CEA953'],
        locations: [0, 0.34, 0.78, 1],
        angle: 180
    },
    arms_and_chest: {
        colors: ['#000000', '#620000', '#FF7526', '#FF7526'],
        locations: [0, 0.34, 0.78, 1],
        angle: 180
    },
    general: {
        colors: ['#000000', '#093A70', '#1CD9D9', '#1CC5D9'],
        locations: [0, 0.34, 0.78, 1],
        angle: 180
    }
};

export default class TrainingPresenter {
    constructor(view) {
        this.view = view;
        this.dataSource = new UserDataSource();
    }

    async loadData() {
        const user = await this.dataSource.getUser();
        const duration = PROGRAM_DURATION[user.fitnessLevel];
        const progress = 0; // TODO
        const uiData = user.areasOfFocus.map((area) => {
            const program = PROGRAM[area];
            const programSlice = PROGRAM_SLICE[user.fitnessLevel];
            const programBackground = PROGRAM_BACKGROUND[area];
            return {
                title: I18n.t(`trainingPrograms.${program.type}Name`),
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', // TODO
                image: 'for_free',
                durationTitle: I18n.t('training.duration'),
                durationText: `${duration} ${I18n.t('training.days')}`,
                progressTitle: I18n.t('training.progress'),
                progressText: `${progress} / ${duration}`, // TODO
                newText: progress === 0 ? I18n.t('training.new').toUpperCase() : '',
                difficultyText: I18n.t(`workoutDifficulty.easy`).toUpperCase(), // TODO
                workouts: program.weeks
                    .slice(programSlice.start, programSlice.end)
                    .reduce((acc, week, wIndex) => {
                        return acc.concat(week.days.map((workout, dIndex) => ({
                            title: `${I18n.t('training.Day')} ${wIndex * 7 + dIndex + 1}`,
                            description: workout.id, // TODO
                            image: this._getWorkoutImage(), // TODO
                            durationTitle: I18n.t('training.exercises'),
                            durationText: `${workout.exercises.length}`,
                            repeatTitle: I18n.t('training.rests'),
                            repeatText: `${workout.exercises.length - 1}`,
                            gearTitle: I18n.t('training.gear'),
                            gearText: I18n.t('workoutGear.none'), // TODO
                            difficultyText: `${I18n.t(`workoutDifficulty.${DIFFICULTY[workout.difficulty]}`)}`.toUpperCase(),
                            background: programBackground,
                            exercises: workout.exercises.map((exercise) => {
                                const exerciseDuration = this._getExerciseDuration(exercise);
                                return {
                                    title: I18n.t(`exercises.${exercise.name}Name`),
                                    description: 'Pellentesque ornare sem lacinia quam venenatis vestibulum', // TODO
                                    duration: exerciseDuration,
                                    durationText: Utils.secondsToPlainMMSS(exerciseDuration),
                                    restTime: DEFAULT_REST_TIME
                                }
                            })
                        })))
                    }, []),
                demo: []
            }
        });
        if (this.view) {
            this.view.setData(uiData);
        }
    }

    unmountView() {
        this.view = null;
    }

    _getWorkoutImage(workoutName) {
        switch (workoutName) {
            default:
                return 'for_free';
        }
    }

    _getExerciseDuration(exercise) {
        if (exercise.time > -1) {
            return exercise.time;
        }
        return Math.round(exercise.reps * REP_TIME_COEFF);
    }
}