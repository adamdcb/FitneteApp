import React from 'react';
import {
  StatusBar,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { createAppNavigator, setTopLevelNavigator, navigate } from './app/utils/navigation/NavigationService';
import AppPresenter from './AppPresenter';

// Disable yellow boxes - use with caution!
console.disableYellowBox = true;

const AppContainer = createAppNavigator();

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.presenter = new AppPresenter(this);
  }

  async componentDidMount() {
    await this.presenter.init();
    this.presenter.loadInitialStoryboard();
    SplashScreen.hide();
  }

  componentWillUnmount() {
    this.presenter.unmountView();
  }

  setInitialStoryboard(storyboardName) {
    navigate(storyboardName);
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <AppContainer
          ref={(nav) => setTopLevelNavigator(nav)}
        />
      </>
    );
  }
}

export default App;
