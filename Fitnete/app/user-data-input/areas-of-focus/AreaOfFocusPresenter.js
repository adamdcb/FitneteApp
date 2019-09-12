
export default class AreaOfFocusPresenter {
    constructor(view) {
        this.view = view;
    }

    unmountView() {
        this.view = null;
    }
}
