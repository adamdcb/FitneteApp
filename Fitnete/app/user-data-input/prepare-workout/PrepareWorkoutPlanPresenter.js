import * as legsProgram from '../../utils/data/legs.json';
import * as abdominalsProgram from '../../utils/data/abdominals.json';
import * as armsAndBackProgram from '../../utils/data/armsAndBack.json';
import * as armsAndChestProgram from '../../utils/data/armsAndChest.json';
import * as generalProgram from '../../utils/data/general.json';
import UserDataSource from '../../data/UserDataSource';
import TrainingDataSource from '../../data/TrainingDataSource.js';
import AnimationUtils from '../../utils/utils/AnimationUtils.js';
import AnimationWorker from '../../data/remote/AnimationWorker.js';

const PROGRAM = {
    legs: legsProgram,
    abdominals: abdominalsProgram,
    arms_and_back: armsAndBackProgram,
    arms_and_chest: armsAndChestProgram,
    general: generalProgram
};

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
}; // fitness level to week start/end index mapping -> FIXME: Should be moved to server side!

export default class PrepareWorkoutPlanPresenter {
    constructor(view) {
        this.view = view;
        this.userDataSource = new UserDataSource();
        this.trainingDataSource = new TrainingDataSource();
    }

    async startPreparingWorkoutPlan() {
        let progress = 0;
        // TODO: Add real implemenation!
        this.interval = setInterval(() => {
            progress = Math.min(progress + 6, 100);
            if (progress >= 100) {
                clearInterval(this.interval);
                this.timeout = setTimeout(() => {
                    clearTimeout(this.timeout);
                    this.view.onContinue();
                }, 800);
            }
            this.view.setProgress(progress);
        }, 200);

        try {
            const user = await this.userDataSource.getUser();
            await this.trainingDataSource.deleteAllPrograms();
            const programSlice = PROGRAM_SLICE[user.fitnessLevel];
            const programs = user.areasOfFocus.reduce((acc, area) => {
                const program = PROGRAM[area];
                program.weeks = program.weeks.slice(programSlice.start, programSlice.end)
                return acc.concat(program);
            }, [])
            await this.trainingDataSource.savePrograms(programs);
            // FIXME!
            // const exerciseNames = await this.trainingDataSource.getAllExerciseNames();
            // const animationNames = exerciseNames.map(name => AnimationUtils.getAnimationName(name, user.gender))
            //     .filter(name => !!name);
            // AnimationWorker.preloadAnimations(animationNames);
        } catch (error) {
            console.log('startPreparingWorkoutPlan()', error);
        }
    }

    unmountView() {
        clearInterval(this.interval);
        clearTimeout(this.timeout);
        this.view = null;
    }
}
