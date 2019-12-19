import I18n from '../../utils/i18n/I18n';
import Utils from '../../utils/utils/Utils.js';
import CountdownTimer from '../../utils/utils/CountdownTimer';
import TrainingDataSource from '../../data/TrainingDataSource';
import UserDataSource from '../../data/UserDataSource';
import AnimationUtils from '../../utils/utils/AnimationUtils';
import AnimationWorker from '../../data/remote/AnimationWorker';

export default class WorkoutPresenter {
    constructor(view, workout) {
        this.view = view;
        this.workout = workout;
        this.trainingDataSource = new TrainingDataSource();
        this.userDataSource = new UserDataSource();
        this.user = null;
        this.exerciseIndex = 0;
        this._onTick = this._onTick.bind(this);
        this._onComplete = this._onComplete.bind(this);
    }

    async loadWorkout() {
        if (!this.user) {
            this.user = await this.userDataSource.getUser();
        }
        const exercise = this.workout.exercises[this.exerciseIndex];
        const nextExercise = this.workout.exercises[this.exerciseIndex + 1];
        this.view.setData({
            loading: true,
            animationSource: this._getAnimationSourceObj(exercise.name, this.user.gender),
            step: this.exerciseIndex + 1,
            totalSteps: this.workout.exercises.length,
            title: exercise.title,
            description: exercise.description,
            countdownText: exercise.durationText,
            countdownPercentage: 100,
            repeatTitle: this.workout.repeatTitle,
            repeatText: this.workout.repeatText,
            nextExerciseText: nextExercise ? `${I18n.t('workout.nextExercise')} ${nextExercise.title}` : ''
        });
        if (nextExercise) {
            const nextAnimationName = AnimationUtils.getAnimationName(nextExercise.name, this.user.gender);
            AnimationWorker.preloadAnimations([nextAnimationName]);
        }
    }

    startWorkout() {
        this.view.setData({
            loading: false
        });
        const exercise = this.workout.exercises[this.exerciseIndex];
        this._startCountdown(exercise.duration, exercise.tickInterval);
    }

    restartWorkout() {
        const exercise = this.workout.exercises[this.exerciseIndex];
        this.view.setData({
            countdownText: exercise.durationText,
            countdownPercentage: 100
        });
        this._startCountdown(exercise.duration, exercise.tickInterval);
    }

    pauseWorkout() {
        this.countdownTimer.pause();
    }

    resumeWorkout() {
        this.countdownTimer.resume();
    }

    goToNextExercise() {
        this.countdownTimer.stop();
        const exercise = this.workout.exercises[this.exerciseIndex];
        this._completeExercise(exercise);
        if (this.exerciseIndex < this.workout.exercises.length - 1) {
            this.exerciseIndex = this.exerciseIndex + 1;
            this.loadWorkout();
        } else {
            this.view.didCompleteWorkout();
        }
    }

    _startCountdown(duration, tickInterval) {
        if (this.countdownTimer) {
            this.countdownTimer.stop();
        }
        this.countdownTimer = new CountdownTimer(duration, this._onTick, this._onComplete, tickInterval);
        this.countdownTimer.start();
    }

    _onTick(count) {
        const exercise = this.workout.exercises[this.exerciseIndex];
        const remainingDuration = exercise.duration - count;
        this.view.setData({
            countdownText: exercise.isTimeBased ? Utils.secondsToPlainMMSS(remainingDuration) : `${remainingDuration}`,
            countdownPercentage: (100 / exercise.duration) * remainingDuration
        });
    }

    _onComplete() {
        const exercise = this.workout.exercises[this.exerciseIndex];
        this._completeExercise(exercise);
        this.view.setData({
            countdownText: exercise.isTimeBased ? Utils.secondsToPlainMMSS(0) : '0',
            countdownPercentage: 0
        });
        const nextExercise = this.workout.exercises[this.exerciseIndex + 1];
        if (nextExercise) {
            this.view.goToRestScreen(exercise, nextExercise);
        } else {
            this.view.didCompleteWorkout();
        }
    }

    async _completeExercise(exercise) {
        try {
            await this.trainingDataSource.setExerciseStatus(exercise.id, true);
        } catch (error) {
            console.log('_completeExercise()', error);
        }
    }

    _getAnimationSourceObj(name, gender) {
        const animationName = AnimationUtils.getAnimationName(name, gender);
        return AnimationWorker.getSourceObj(animationName);
    }

    unmountView() {
        this.countdownTimer.stop();
        this.view = null;
    }
}