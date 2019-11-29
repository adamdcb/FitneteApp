import {
    createAppContainer,
    createSwitchNavigator,
    StackActions,
    NavigationActions,
} from 'react-navigation'
import {
    createStackNavigator
} from 'react-navigation-stack';
import {
    createBottomTabNavigator,
    BottomTabBar
} from 'react-navigation-tabs';
import React from 'react';
import { Platform } from 'react-native';

import { Route, InitialStoryboard } from './NavConstants';
import HeaderBackButton from '../components/HeaderBackButton';
import TabBarIcon from '../components/TabBarIcon';

import LoadingScreen from '../../loading/LoadingScreen';
import AppIntroScreen from '../../app-intro/AppIntroScreen';
import PrivacyPolicyScreen from '../../terms-and-conditions/privacy-policy/PrivacyPolicyScreen';
import TermsAndConditionsScreen from '../../terms-and-conditions/terms/TermsAndConditionsScreen';
import WaterTrackerScreen from '../../water-tracker/WaterTrackerScreen';
import AreasOfFocusScreen from '../../user-data-input/areas-of-focus/AreasOfFocusScreen';
import SelectFitLevelScreen from '../../user-data-input/select-fit-level/SelectFitLevelScreen';
import BodyParametersScreen from '../../user-data-input/body-parameters/BodyParametersScreen';
import PrepareWorkoutPlanScreen from '../../user-data-input/prepare-workout/PrepareWorkoutPlanScreen';
import WorkoutPlanReadyScreen from '../../user-data-input/workout-plan-ready/WorkoutPlanReadyScreen';
import NoPlanPurchasedScreen from '../../user-data-input/no-plan-purchased/NoPlanPurchasedScreen';
import ContinueForFreeScreen from '../../user-data-input/no-plan-purchased/ContinueForFreeScreen';
import WaterIntakeIntroScreen from '../../user-data-input/no-plan-purchased/water-tracker/WaterIntakeIntroScreen';
import TrainingScreen from '../../training/TrainingScreen';
import FoodScreen from '../../food/FoodScreen';
import UserProfileScreen from '../../user-profile/UserProfileScreen';
import DemoWorkoutIntroScreen from '../../training/demo/DemoWorkoutIntroScreen';
import DemoWorkoutScreen from '../../training/demo/DemoWorkoutScreen';
import DemoWorkoutDoneScreen from '../../training/demo/DemoWorkoutDoneScreen';
import TrainingProgramScreen from '../../training/program/TrainingProgramScreen';
import ExerciseListScreen from '../../training/exercise-list/ExerciseListScreen';
import CountdownScreen from '../../training/countdown/CountdownScreen';
import WorkoutScreen from '../../training/workout/WorkoutScreen';
import PauseScreen from '../../training/pause/PauseScreen';
import RestScreen from '../../training/rest/RestScreen';
import WorkoutCompleteScreen from '../../training/workout-complete/WorkoutCompleteScreen';
import StartupScreen from '../../app-intro/StartupScreen';
import SettingsScreen from '../../user-profile/settings/SettingsScreen';

const HEADER_STYLE = {
    backgroundColor: '#F3F4FA',
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0
};

const HEADER_TITLE_STYLE = {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#3E3750',
    textAlign: Platform.select({
        ios: 'center',
        android: 'left'
    })
};

const TAB_BAR_STYLE = {
    height: 64,
    backgroundColor: '#FFFFFF',
    borderTopColor: 'transparent'
};

const NO_TAB_BAR_ROUTES = [
    'WorkoutPlanStack'
];

const _shouldDisplayTabBar = (routeName) => {
    return !NO_TAB_BAR_ROUTES.includes(routeName);
}

const TabBarComponent = props => <BottomTabBar {...props} />;

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
    },
    PrepareWorkoutPlan: {
        screen: PrepareWorkoutPlanScreen,
        params: { step: 4, stepsTotal: 4 }
    },
    WorkoutPlanReady: WorkoutPlanReadyScreen,
    NoPlanPurchased: NoPlanPurchasedScreen,
    ContinueForFree: ContinueForFreeScreen,
    WaterIntakeIntro: WaterIntakeIntroScreen
}

const WaterTrackerScreens = {
    WaterTracker: {
        screen: WaterTrackerScreen,
        params: { showWorkoutsLink: true }
    }
};

const AppIntroStack = createStackNavigator(
    {
        Startup: StartupScreen,
        AppIntro: AppIntroScreen,
        PrivacyPolicy: PrivacyPolicyScreen,
        TermsAndConditions: TermsAndConditionsScreen
    },
    {
        headerMode: 'none'
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

const TrainingPlanStack = createStackNavigator(
    {
        Training: TrainingScreen
    },
    {
        headerMode: 'none'
    }
);

const WorkoutDemoStack = createStackNavigator(
    {
        DemoWorkoutIntro: DemoWorkoutIntroScreen,
        DemoWorkout: DemoWorkoutScreen,
        DemoWorkoutDone: DemoWorkoutDoneScreen
    },
    {
        defaultNavigationOptions: () => ({
            headerBackImage: <HeaderBackButton />,
            headerStyle: HEADER_STYLE,
            headerBackTitle: null,
            headerTitleStyle: HEADER_TITLE_STYLE
        }),
        navigationOptions: () => ({
            tabBarVisible: false
        })
    }
);

const TrainingProgramStack = createStackNavigator(
    {
        TrainingProgram: TrainingProgramScreen,
        ExerciseList: ExerciseListScreen
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

const WorkoutStack = createStackNavigator(
    {
        Countdown: CountdownScreen,
        Workout: WorkoutScreen,
        Pause: PauseScreen,
        Rest: RestScreen,
        WorkoutComplete: WorkoutCompleteScreen
    },
    {
        headerMode: 'none'
    }
);

const TrainingStack = createSwitchNavigator(
    {
        TrainingPlanStack: TrainingPlanStack,
        TrainingProgramStack: TrainingProgramStack,
        WorkoutDemoStack: WorkoutDemoStack,
        WorkoutPlanStack: WorkoutStack
    },
    {
        navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state.routes[navigation.state.index];
            return {
                tabBarVisible: _shouldDisplayTabBar(routeName)
            }
        }
    }
);

const FoodStack = createStackNavigator(
    {
        Food: FoodScreen
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

const WaterStack = createStackNavigator(
    {
        WaterTracker: {
            screen: WaterTrackerScreen,
            params: { showWorkoutsLink: false }
        }
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

const UserProfileStack = createStackNavigator(
    {
        UserProfile: UserProfileScreen,
        Settings: SettingsScreen
    },
    {
        defaultNavigationOptions: () => ({
            headerBackImage: <HeaderBackButton />,
            headerTransparent: true,
            headerBackTitle: null,
            headerTitleStyle: HEADER_TITLE_STYLE
        })
    }
);

const MainAppStack = createBottomTabNavigator(
    {
        Training: TrainingStack,
        Water: WaterStack,
        UserProfile: UserProfileStack
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                const { routeName } = navigation.state;
                const iconName = `tab_${routeName.toLowerCase()}${focused ? '_active' : ''}`;
                return <TabBarIcon iconName={iconName} />;
            }
        }),
        tabBarComponent: props => (
            <TabBarComponent
                {...props}
                style={TAB_BAR_STYLE}
            />
        ),
        backBehavior: 'none',
        tabBarOptions: {
            showLabel: false,
            keyboardHidesTabBar: false
        }
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
            UserDataInput: UserDataInputStack,
            MainApp: MainAppStack
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

function pop() {
    _navigator.dispatch(StackActions.pop());
}

function navigate(route, params) {
    const action = NavigationActions.navigate({
        routeName: route,
        params: params
    });
    _navigator.dispatch(action);
}

function replace(route, params) {
    const action = StackActions.replace({
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
    pop,
    replace,
    HEADER_STYLE,
    HEADER_TITLE_STYLE
}