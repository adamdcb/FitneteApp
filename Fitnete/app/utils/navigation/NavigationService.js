import {
    createAppContainer,
    createSwitchNavigator,
    StackActions
} from 'react-navigation'
import {
    createStackNavigator
} from 'react-navigation-stack';

import OnboardingScreen from '../../onboarding/OnboardingScreen';
import PrivacyPolicyScreen from '../../onboarding/PrivacyPolicyScreen';

const Route = {
    Onboarding: 'Onboarding',
    PrivacyPolicy: 'PrivacyPolicy',
    TermsAndConditions: 'TermsAndConditions'
}

const InitialStoryboard = {
    Onboarding: 'Onboarding'
}

const OnboardingStack = createStackNavigator(
    {
        Onboarding:  {
            screen: OnboardingScreen,
            navigationOptions: () => ({
                header: null,
                headerBackTitle: null
              })
        },
        PrivacyPolicy: PrivacyPolicyScreen
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

function createAppNavigator(initialRoute = InitialStoryboard.Onboarding) {
    const AppNavigator = createSwitchNavigator(
        {
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

export {
    Route,
    InitialStoryboard,
    createAppNavigator,
    setTopLevelNavigator,
    push
}