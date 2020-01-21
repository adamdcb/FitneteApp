import UserDataSource from '../../data/UserDataSource';
import AnimationUtils from '../../utils/utils/AnimationUtils';

export default class ExercisePreviewPresenter {
    constructor(view, exercise) {
        this.view = view;
        this.exercise = exercise;
        this.userDataSource = new UserDataSource();
    }

    async loadExercise() {
        const user = await this.userDataSource.getUser();
        this.view.setData({
            animationSource: AnimationUtils.getAnimationSource(this.exercise.name, user.gender),
            title: this.exercise.title,
            description: this.exercise.description
        });
    }

    unmountView() {
        this.view = null;
    }
}