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
import WaterTrackerScreen from '../../water-tracker/WaterTrackerScreen';
import AreasOfFocusScreen from '../../user-data-input/areas-of-focus/AreasOfFocusScreen';
import SelectFitLevelScreen from '../../user-data-input/select-fit-level/SelectFitLevelScreen';
import BodyParametersScreen from '../../user-data-input/body-parameters/BodyParametersScreen';
import PrepareWorkoutPlanScreen from '../../user-data-input/prepare-workout/PrepareWorkoutPlanScreen';
import WorkoutPlanReadyScreen from '../../user-data-input/workout-plan-ready/WorkoutPlanReadyScreen';
import PurchaseScreen from '../../user-data-input/purchase/PurchaseScreen';
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
import ExercisePreviewScreen from '../../training/exercise-preview/ExercisePreviewScreen';
import CountdownScreen from '../../training/countdown/CountdownScreen';
import WorkoutScreen from '../../training/workout/WorkoutScreen';
import PauseScreen from '../../training/pause/PauseScreen';
import RestScreen from '../../training/rest/RestScreen';
import WorkoutCompleteScreen from '../../training/workout-complete/WorkoutCompleteScreen';
import ReminderScreen from '../../training/reminder/ReminderScreen';
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
    textAlign: 'center'
};

const TAB_BAR_STYLE = {
    height: 64,
    backgroundColor: '#FFFFFF',
    borderTopColor: 'transparent'
};

const NO_TAB_BAR_ROUTES = [
    Route.Countdown,
    Route.Workout,
    Route.Pause,
    Route.Rest,
    Route.WorkoutComplete,
    Route.Reminder
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
    Purchase: PurchaseScreen,
    NoPlanPurchased: NoPlanPurchasedScreen
}

const AppIntroStack = createStackNavigator(
    {
        Startup: StartupScreen,
        AppIntro: {
            screen: AppIntroScreen,
            navigationOptions: () => ({
                animationEnabled: false
            })
        }
    },
    {
        headerMode: 'none'
    }
);

const UserDataInputStack = createStackNavigator(
    {
        ...UserDataInputScreens
    },
    {
        defaultNavigationOptions: () => ({
            headerBackImage: () => <HeaderBackButton />,
            headerStyle: HEADER_STYLE,
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: HEADER_TITLE_STYLE
        })
    }
);

const TrainingStack = createStackNavigator(
    {
        Training: TrainingScreen,
        TrainingProgram: TrainingProgramScreen,
        ExerciseList: ExerciseListScreen,
        ExercisePreview: ExercisePreviewScreen,
        Countdown: CountdownScreen,
        Workout: WorkoutScreen,
        Pause: PauseScreen,
        Rest: RestScreen,
        WorkoutComplete: WorkoutCompleteScreen,
        Reminder: ReminderScreen
    },
    {
        navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state.routes[navigation.state.index];
            return {
                tabBarVisible: _shouldDisplayTabBar(routeName)
            }
        },
        defaultNavigationOptions: () => ({
            headerBackImage: () => <HeaderBackButton />,
            headerStyle: HEADER_STYLE,
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: HEADER_TITLE_STYLE
        })
    }
);

const FoodStack = createStackNavigator(
    {
        Food: FoodScreen
    },
    {
        defaultNavigationOptions: () => ({
            headerBackImage: () => <HeaderBackButton />,
            headerStyle: HEADER_STYLE,
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
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
            headerBackImage: () => <HeaderBackButton />,
            headerTransparent: true,
            headerBackTitleVisible: false,
            headerTitle: () => null,
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
            headerBackImage: () => <HeaderBackButton />,
            headerTransparent: true,
            headerBackTitleVisible: false,
            headerTitleAlign: 'center'
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

function popToTop() {
    _navigator.dispatch(StackActions.popToTop());
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
    popToTop,
    replace,
    HEADER_STYLE,
    HEADER_TITLE_STYLE
}