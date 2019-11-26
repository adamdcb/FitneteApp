
import I18n from '../../utils/i18n/I18n';
import Utils from '../../utils/utils/Utils.js';
import CountdownTimer from '../../utils/utils/CountdownTimer';
import TrainingDataSource from '../../data/TrainingDataSource';

export default class WorkoutPresenter {
    constructor(view, workout) {
        this.view = view;
        this.workout = workout;
        this.dataSource = new TrainingDataSource();
        this.exerciseIndex = 0;
        this._onTick = this._onTick.bind(this);
        this._onComplete = this._onComplete.bind(this);
    }

    startWorkout() {
        const exercise = this.workout.exercises[this.exerciseIndex];
        const nextExercise = this.workout.exercises[this.exerciseIndex + 1];
        this.view.setData({
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
        this.countdownTimer = new CountdownTimer(exercise.duration, this._onTick, this._onComplete);
        this.countdownTimer.start();
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
            this.startWorkout();
        } else {
            this.view.didCompleteWorkout();
        }
    }

    _onTick(count) {
        const exercise = this.workout.exercises[this.exerciseIndex];
        this.view.setData({
            countdownText: Utils.secondsToPlainMMSS(exercise.duration - count),
            countdownPercentage: (100 / exercise.duration) * (exercise.duration - count)
        });
    }

    _onComplete() {
        const exercise = this.workout.exercises[this.exerciseIndex];
        this._completeExercise(exercise);
        this.view.setData({
            countdownText: Utils.secondsToPlainMMSS(0),
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
            await this.dataSource.setExerciseStatus(exercise.id, true);
        } catch (error) {
            console.log('_completeExercise()', error);
        }
    }

    unmountView() {
        this.countdownTimer.stop();
        this.view = null;
    }
}