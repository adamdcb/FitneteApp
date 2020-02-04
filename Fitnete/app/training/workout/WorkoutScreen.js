import React from 'react';
import { SafeAreaView, Text, View, ActivityIndicator, StyleSheet, BackHandler, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import ElevatedView from 'fiber-react-native-elevated-view';

import ButtonText from '../../utils/components/ButtonText';
import Button from '../../utils/components/Button';
import I18n from '../../utils/i18n/I18n';
import CountdownProgressBar from '../../utils/components/CountdownProgressBar';
import WorkoutPresenter from './WorkoutPresenter';
import { push, Route } from '../../utils/navigation/NavigationService';

class WorkoutScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            animationSource: null,
            countdownText: '',
            countdownPercentage: 100,
            runningText: '',
        };
        const { workout } = this.props.navigation.state.params;
        this.presenter = new WorkoutPresenter(this, workout);
        this._didTapPauseButton = this._didTapPauseButton.bind(this);
        this._didTapSkipButton = this._didTapSkipButton.bind(this);
        this.resumeExercise = this.resumeExercise.bind(this);
        this.restartExercise = this.restartExercise.bind(this);
        this.startExercise = this.startExercise.bind(this);
        this.skipRest = this.skipRest.bind(this);
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
        this.presenter.loadWorkout();
    }

    componentWillUnmount() {
        this.backHandler.remove();
        this.presenter.unmountView();
    }

    setData(data) {
        this.setState({ ...data });
    }

    _didTapPauseButton() {
        this.presenter.pauseWorkout();
        push(Route.Pause, {
            resumeExercise: this.resumeExercise,
            restartExercise: this.restartExercise
        });
    }

    _didTapSkipButton() {
        this.presenter.goToNextExercise();
    }

    resumeExercise() {
        this.presenter.resumeWorkout();
    }

    restartExercise() {
        this.presenter.restartWorkout();
    }

    startExercise() {
        this.presenter.startWorkout();
    }

    goToRestScreen(exercise, nextExercise) {
        push(Route.Rest, { skipRest: this.skipRest, exercise, nextExercise });
    }

    didCompleteWorkout() {
        const { workout: { caloriesBurned } } = this.props.navigation.state.params;
        push(Route.WorkoutComplete, { caloriesBurned });
    }

    skipRest() {
        this.presenter.goToNextExercise();
    }

    renderAnimation(animationSource) {
        return (
            <FastImage
                style={styles.animation}
                source={animationSource}
                resizeMode={FastImage.resizeMode.contain}
                onLoadEnd={this.startExercise}
            />
        );
    }

    renderLoading() {
        return (
            <ActivityIndicator
                size='large'
                color='#FFFFFF'
                style={styles.loading}
            />
        );
    }

    render() {
        const { loading,
            animationSource,
            countdownText,
            countdownPercentage,
            step = 0,
            totalSteps = 0,
            title,
            description,
            nextExerciseText } = this.state;
        const { workout: { background } } = this.props.navigation.state.params;
        return (
            <View style={styles.outerContainer} >
                <Image
                    style={styles.background}
                    defaultSource={{ uri: background }}
                    source={{ uri: background }}
                />
                <SafeAreaView style={styles.container}>
                    <View style={styles.progressContainer}>
                        <Text style={styles.stepTextLeft}>
                            {I18n.t('workout.stepCurrent', { step_number: step })}
                        </Text>
                        <CountdownProgressBar percentage={countdownPercentage} />
                        <Text style={styles.stepTextRight}>
                            {I18n.t('workout.stepTotal', { total: totalSteps })}
                        </Text>
                    </View>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.animationContainer}>
                        {
                            animationSource ? this.renderAnimation(animationSource) : null
                        }
                        {
                            loading ? this.renderLoading() : null
                        }
                    </View>
                    <Text style={styles.timeText}>{countdownText}</Text>
                </SafeAreaView>
                <ElevatedView
                    style={styles.bottomContainer}
                    elevation={16}
                >
                    <LinearGradient
                        style={styles.linearGradient}
                        colors={['#FFFFFF', '#FAFAFA']}
                        angle={0}
                    >
                        <Text style={styles.infoDescription}>{description}</Text>
                        {
                            nextExerciseText ? <Text style={styles.infoNextExercise}>{nextExerciseText}</Text> : null
                        }
                        <View style={styles.buttonContainer}>
                            <ButtonText
                                disabled={loading}
                                style={styles.skipButton}
                                title={I18n.t('workout.skipToNextExercise')}
                                showArrow={false}
                                onPress={this._didTapSkipButton}
                            />
                            <Button
                                disabled={loading}
                                style={styles.pauseButton}
                                title={I18n.t('workout.pause')}
                                onPress={this._didTapPauseButton}
                            />
                        </View>
                    </LinearGradient>
                </ElevatedView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    container: {
        flex: 1,
        marginHorizontal: 20
    },
    background: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16
    },
    stepTextLeft: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#4F4C57',
        textAlign: 'left'
    },
    stepTextRight: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#4F4C57',
        textAlign: 'right'
    },
    title: {
        marginVertical: 16,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: '#4F4C57',
        textAlign: 'center'
    },
    timeText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 48,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    loading: {
        alignSelf: 'center',
        paddingBottom: 32
    },
    animationContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    animation: {
        height: '100%',
        width: '100%'
    },
    bottomContainer: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    linearGradient: {
        paddingHorizontal: 32,
        paddingVertical: 24,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    infoDescription: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#4F4C57',
        textAlign: 'center'
    },
    infoNextExercise: {
        marginTop: 24,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#B4B3B6',
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 24,
        justifyContent: 'space-between'
    },
    skipButton: {
        marginRight: 24
    },
    pauseButton: {
        flex: 1
    }
});

WorkoutScreen.navigationOptions = () => ({
    headerShown: false,
    animationEnabled: false,
    gestureEnabled: false
});

export default WorkoutScreen;