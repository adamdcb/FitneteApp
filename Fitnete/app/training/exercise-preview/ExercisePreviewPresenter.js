import UserDataSource from '../../data/UserDataSource';
import AnimationUtils from '../../utils/utils/AnimationUtils';
import AnimationWorker from '../../data/remote/AnimationWorker';

export default class ExercisePreviewPresenter {
    constructor(view, exercise) {
        this.view = view;
        this.exercise = exercise;
        this.userDataSource = new UserDataSource();
    }

    async loadExercise() {
        const user = await this.userDataSource.getUser();
        this.view.setData({
            animationSource: this._getAnimationSourceObj(this.exercise.name, user.gender),
            title: this.exercise.title,
            description: this.exercise.description
        });
    }

    _getAnimationSourceObj(name, gender) {
        const animationName = AnimationUtils.getAnimationName(name, gender);
        return AnimationWorker.getSourceObj(animationName);
    }

    unmountView() {
        this.view = null;
    }
}