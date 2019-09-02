import {
    createAppContainer,
    createSwitchNavigator,
    StackActions,
    NavigationActions
} from 'react-navigation'
import {
    createStackNavigator
} from 'react-navigation-stack';

import { Route, InitialStoryboard } from './NavConstants';

import LoadingScreen from '../../loading/LoadingScreen';
import OnboardingScreen from '../../onboarding/OnboardingScreen';
import PrivacyPolicyScreen from '../../terms-and-conditions/privacy-policy/PrivacyPolicyScreen';
import TermsAndConditionsScreen from '../../terms-and-conditions/terms/TermsAndConditionsScreen';

const OnboardingStack = createStackNavigator(
    {
        Onboarding:  {
            screen: OnboardingScreen,
            navigationOptions: () => ({
                header: null,
                headerBackTitle: null
              })
        },
        PrivacyPolicy: PrivacyPolicyScreen,
        TermsAndConditions: TermsAndConditionsScreen
    },
    {
        defaultNavigationOptions: () => ({
            headerStyle: {
                borderBottomWidth: 0
            }
        })
    }
);

// const AppStack = createStackNavigator(

// );

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function createAppNavigator(initialRoute = InitialStoryboard.Loading) {
    const AppNavigator = createSwitchNavigator(
        {
            Loading: LoadingScreen,
            Onboarding:  OnboardingStack
        },
        {
            initialRouteName: initialRoute,
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
    navigate
}