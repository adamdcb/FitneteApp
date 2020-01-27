import I18n from '../utils/i18n/I18n';
import Utils from '../utils/utils/Utils.js';
import TrainingDataSource from '../data/TrainingDataSource';
import UserDataSource from '../data/UserDataSource';
import WorkoutDataManager from '../data/WorkoutDataManager';

const DIFFICULTY = {
    0: 'easy',
    1: 'medium',
    2: 'hard'
};

const DEFAULT_REST_TIME = 3; // sec.
const REP_TIME_COEFF = 1.75;

const PROGRAM_BACKGROUND = {
    legs: 'bgr_legs',
    abdominals: 'bgr_abdominals',
    armsAndBack: 'bgr_arms_and_back',
    armsAndChest: 'bgr_arms_and_chest',
    general: 'bgr_general_fitness',
};

const PROGRAM_IMAGE = {
    legs: 'legs',
    abdominals: 'abdominals',
    armsAndBack: 'arms_and_back',
    armsAndChest: 'arms_and_chest',
    general: 'general'
};

const DIFFICULTY_COLOR = {
    0: '#08C757',
    1: '#F56609',
    2: '#E40026'
};

export default class TrainingPresenter {
    constructor(view) {
        this.view = view;
        this.dataSource = new TrainingDataSource();
        this.userDataSource = new UserDataSource();
        this.uiData = [];
        WorkoutDataManager.subscribe(this);
    }

    async loadData() {
        const programs = await this.dataSource.getPrograms();
        const user = await this.userDataSource.getUser();
        this.uiData = programs.map((program) => {
            const duration = program.weeks.length * 7;
            const programBackground = PROGRAM_BACKGROUND[program.type];
            return {
                id: program.id,
                title: I18n.t(`trainingPrograms.${program.type}Name`),
                description: I18n.t(`trainingPrograms.${program.type}Description`),
                image: 'for_free',
                duration,
                durationTitle: I18n.t('training.duration'),
                durationText: `${duration} ${I18n.t('training.days')}`,
                progress: program.progress,
                progressTitle: I18n.t('training.progress'),
                progressText: `${program.progress} / ${duration}`,
                newText: program.progress === 0 ? I18n.t('training.new').toUpperCase() : '',
                workouts: program.weeks
                    .reduce((acc, week, wIndex) => {
                        return acc.concat(week.days.map((workout, dIndex) => ({
                            title: `${I18n.t('training.Day')} ${wIndex * 7 + dIndex + 1}`,
                            description: '',
                            image: `${PROGRAM_IMAGE[program.type]}_${user.gender}`,
                            durationTitle: I18n.t('training.exercises'),
                            durationText: `${workout.exercises.length}`,
                            repeatTitle: I18n.t('training.rests'),
                            repeatText: `${workout.exercises.length - 1}`,
                            gearTitle: I18n.t('training.gear'),
                            gearText: workout.exercises.some(ex => ex.needsGear === true) ? I18n.t('workoutGear.yes') : I18n.t('workoutGear.none'),
                            difficulty: {
                                text: `${I18n.t(`workoutDifficulty.${DIFFICULTY[workout.difficulty]}`)}`.toUpperCase(),
                                color: `${DIFFICULTY_COLOR[workout.difficulty]}`
                            },
                            background: programBackground,
                            locked: dIndex > program.progress,
                            exercises: workout.exercises.map((exercise) => {
                                const exerciseDuration = this._getExerciseDuration(exercise);
                                return {
                                    id: exercise.id,
                                    name: exercise.name,
                                    title: I18n.t(`exercises.${exercise.name}Name`),
                                    description: I18n.t(`exercises.${exercise.name}Description`),
                                    duration: exerciseDuration.duration,
                                    durationText: exerciseDuration.durationText,
                                    isTimeBased: exerciseDuration.isTimeBased,
                                    tickInterval: exerciseDuration.tickInterval,
                                    restTime: DEFAULT_REST_TIME
                                }
                            })
                        })))
                    }, []),
                demo: []
            }
        });
        if (this.view) {
            this.view.setData(this.uiData);
        }
    }

    async loadProgress(programId) {
        const progress = await this.dataSource.getProgress(programId);
        this.uiData = this.uiData.map((program) => {
            if (program.id !== programId) {
                return program;
            } else {
                return {
                    ...program,
                    progress,
                    progressText: `${progress} / ${program.duration}`,
                    workouts: program.workouts.map((workout, index) => ({
                        ...workout,
                        locked: index > progress
                    }))
                };
            }
        });
        if (this.view) {
            this.view.setData(this.uiData);
        }
    }

    unmountView() {
        this.view = null;
        WorkoutDataManager.unsubscribe(this);
    }

    // WorkoutDataManager observer function
    onWorkoutDataChange() {
        this.loadData();
    }

    _getExerciseDuration(exercise) {
        let duration = 0;
        let durationText = '';
        let isTimeBased = true;
        let tickInterval = 1000;
        if (exercise.time > -1) {
            duration = exercise.time;
            durationText = Utils.secondsToPlainMMSS(duration);
        } else {
            duration = exercise.reps;
            durationText = `${exercise.reps}`;
            isTimeBased = false;
            tickInterval = 1000 * REP_TIME_COEFF;
        }
        return {
            duration,
            durationText,
            isTimeBased,
            tickInterval
        }
    }
}