import React, { Fragment } from 'react';
import {
  StatusBar,
} from 'react-native';

import { createAppNavigator, setTopLevelNavigator, navigate } from './app/utils/navigation/NavigationService';
import AppPresenter from './AppPresenter';

const AppContainer = createAppNavigator();

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.presenter = new AppPresenter(this);
  }

  componentDidMount() {
    this.presenter.loadInitialStoryboard();
  }

  componentWillUnmount() {
    this.presenter.unmountView();
  }

  setInitialStoryboard(storyboardName) {
    navigate(storyboardName);
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <AppContainer
          ref={(nav) => setTopLevelNavigator(nav)}
        />
      </Fragment>
    );
  }
}

export default App;
