import React, { Fragment } from 'react';
import {
  StatusBar,
} from 'react-native';

import { createAppNavigator, InitialStoryboard } from './app/global/navigation/NavigationService';

const AppContainer = createAppNavigator(InitialStoryboard.Onboarding);

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <AppContainer />
    </Fragment>
  );
};

export default App;
