import React, { Fragment } from 'react';
import {
  StatusBar,
} from 'react-native';

import { createAppNavigator, InitialStoryboard, setTopLevelNavigator } from './app/utils/navigation/NavigationService';

const AppContainer = createAppNavigator(InitialStoryboard.Onboarding);

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <AppContainer
        ref={(nav) => setTopLevelNavigator(nav)}
      />
    </Fragment>
  );
};

export default App;
