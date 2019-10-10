import {
    createAppContainer,
    createSwitchNavigator,
    StackActions,
    NavigationActions,
} from 'react-navigation'
import {
    createStackNavigator
} from 'react-navigation-stack';
import React from 'react';

import { Route, InitialStoryboard } from './NavConstants';
import HeaderBackButton from '../components/HeaderBackButton';

import LoadingScreen from '../../loading/LoadingScreen';
import AppIntroScreen from '../../app-intro/AppIntroScreen';
import PrivacyPolicyScreen from '../../terms-and-conditions/privacy-policy/PrivacyPolicyScreen';
import TermsAndConditionsScreen from '../../terms-and-conditions/terms/TermsAndConditionsScreen';
import WaterTrackerScreen from '../../water-tracker/WaterTrackerScreen';
import AreasOfFocusScreen from '../../user-data-input/areas-of-focus/AreasOfFocusScreen';
import SelectFitLevelScreen from '../../user-data-input/select-fit-level/SelectFitLevelScreen';
import BodyParametersScreen from '../../user-data-input/body-parameters/BodyParametersScreen';

const HEADER_STYLE = {
    backgroundColor: '#F3F4FA',
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0
}

const HEADER_TITLE_STYLE = {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#3E3750'
};

const UserDataInputScreens = {
    AreasOfFocus: {
        screen: AreasOfFocusScreen,
        params: { step: 1, stepsTotal: 4 }
    },
    SelectFitLevel: {
        screen: SelectFitLevelScreen,
        params: { step: 2, stepsTotal: 4 }
    },
    BodyParameters: {
        screen: BodyParametersScreen,
        params: { step: 3, stepsTotal: 4 }
    }
}

const WaterTrackerScreens = {
    WaterTracker: WaterTrackerScreen
};

const AppIntroStack = createStackNavigator(
    {
        AppIntro: {
            screen: AppIntroScreen,
            navigationOptions: () => ({
                headerBackTitle: null,
                headerStyle: {
                    ...HEADER_STYLE,
                    height: 0
                }
            })
        },
        PrivacyPolicy: PrivacyPolicyScreen,
        TermsAndConditions: TermsAndConditionsScreen
    },
    {
        defaultNavigationOptions: () => ({
            headerBackImage: <HeaderBackButton />,
            headerStyle: HEADER_STYLE,
            headerBackTitle: null,
            headerTitleStyle: HEADER_TITLE_STYLE
        })
    }
);

const UserDataInputStack = createStackNavigator(
    {
        ...UserDataInputScreens,
        ...WaterTrackerScreens
    },
    {
        defaultNavigationOptions: () => ({
            headerBackImage: <HeaderBackButton />,
            headerStyle: HEADER_STYLE,
            headerBackTitle: null,
            headerTitleStyle: HEADER_TITLE_STYLE
        })
    }
);

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function createAppNavigator(initialRoute = InitialStoryboard.Loading) {
    const AppNavigator = createSwitchNavigator(
        {
            Loading: LoadingScreen,
            AppIntro: AppIntroStack,
            UserDataInput: UserDataInputStack
        },
        {
            initialRouteName: initialRoute
        }
    );
    return createAppContainer(AppNavigator)
}

function push(route, params) {
    const action = StackActions.push({
        routeName: route,
        params: params
    });
    _navigator.dispatch(action);
}

function navigate(route, params) {
    const action = NavigationActions.navigate({
        routeName: route,
        params: params
    });
    _navigator.dispatch(action);
}

export {
    Route,
    InitialStoryboard,
    createAppNavigator,
    setTopLevelNavigator,
    push,
    navigate,
    HEADER_STYLE
}