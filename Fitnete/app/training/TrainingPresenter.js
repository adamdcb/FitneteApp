import * as data from '../utils/data/demo_workout.json';
import I18n from '../utils/i18n/I18n';
import Utils from '../utils/utils/Utils.js';

export default class TrainingPresenter {
    constructor(view) {
        this.view = view;
    }

    loadData() {
        const uiData = data.programs.map((program) => ({
            title: I18n.t(`training.${program.name}Title`),
            description: I18n.t(`training.${program.name}Description`),
            image: 'for_free',
            durationTitle: I18n.t('training.duration'),
            durationText: `${program.duration} ${I18n.t('training.days')}`,
            progressTitle: I18n.t('training.progress'),
            progressText: `${program.progress} / ${program.duration}`,
            newText: program.progress === 0 ? I18n.t('training.new').toUpperCase() : '',
            difficultyText: I18n.t(`training.${program.difficulty}`).toUpperCase(),
            workouts: program.workouts.map((workout) => ({
                title: I18n.t(`training.${workout.name}Title`),
                description: I18n.t(`training.${workout.name}Description`),
                image: this._getWorkoutImage(workout.name),
                durationTitle: I18n.t('training.duration'),
                durationText: Utils.secondsToMMSS(workout.duration),
                repeatTitle: I18n.t('training.repeat'),
                repeatText: `${workout.repeat} ${I18n.t('training.times')}`,
                gearTitle: I18n.t('training.gear'),
                gearText: workout.gear,
                exercises: workout.exercises.map((exercise) => ({
                    title: I18n.t(`training.${exercise.name}Title`),
                    description: I18n.t(`training.${exercise.name}Description`),
                    duration: exercise.duration,
                    durationText: Utils.secondsToPlainMMSS(exercise.duration),
                }))
            })),
            demo: program.demo.map((demo) => ({
                title: I18n.t(`training.${demo.name}Title`),
                description: I18n.t(`training.${demo.name}Description`),
                image: this._getWorkoutImage(demo.name),
                durationTitle: I18n.t('training.duration'),
                durationText: Utils.secondsToMMSS(demo.duration),
                repeatTitle: I18n.t('training.repeat'),
                repeatText: `${demo.repeat} ${I18n.t('training.times')}`,
                gearTitle: I18n.t('training.gear'),
                gearText: demo.gear,
                exercises: demo.exercises.map((exercise) => ({
                    title: I18n.t(`training.${exercise.name}Title`),
                    description: I18n.t(`training.${exercise.name}Description`),
                    duration: exercise.duration,
                    durationText: Utils.secondsToPlainMMSS(exercise.duration),
                }))
            }))
        }));
        if (this.view) {
            this.view.setData(uiData);
        }
    }

    unmountView() {
        this.view = null;
    }

    _getWorkoutImage(workoutName) {
        switch(workoutName) {
            default:
                return 'for_free';
        }
    }
}