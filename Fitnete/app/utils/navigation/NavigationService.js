import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation'
import {
    createStackNavigator
} from 'react-navigation-stack';

import OnboardingScreen from '../../onboarding/OnboardingScreen';

const Routes = {
    Onboarding: 'Onboarding',
    PrivacyPolicy: 'PrivacyPolicy',
    TermsAndConditions: 'TermsAndConditions'
}

const InitialStoryboard = {
    Onboarding: 'Onboarding'
}

const OnboardingStack = createStackNavigator(
    {
        Onboarding:  OnboardingScreen
    }
);

// const AppStack = createStackNavigator(

// );

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

export {
    Routes,
    InitialStoryboard,
    createAppNavigator
}