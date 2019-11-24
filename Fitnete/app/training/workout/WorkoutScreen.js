import React from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

import Container from '../../utils/components/Container';
import DemoWebP from '../../animations/training/demo.webp';
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
        this.skipRest = this.skipRest.bind(this);
    }

    componentDidMount() {
        this.presenter.startWorkout();
    }

    componentWillUnmount() {
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
        this.presenter.startWorkout();
    }

    goToRestScreen(exercise, nextExercise) {
        push(Route.Rest, { skipRest: this.skipRest, exercise, nextExercise });
    }

    didCompleteWorkout() {
        push(Route.WorkoutComplete);
    }

    skipRest() {
        this.presenter.goToNextExercise();
    }

    render() {
        const { countdownText,
            countdownPercentage,
            step,
            totalSteps,
            title,
            description,
            nextExerciseText } = this.state;
        const { workout: { background } } = this.props.navigation.state.params;
        return (
            <Container
                colors={background.colors}
                locations={background.locations}
                angle={background.angle}
                useAngle
                scrollViewStyle={{ paddingHorizontal: 0 }}
            >
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
                    <View style={{ flex: 1 }}>
                        <FastImage
                            style={{ height: '100%', width: '100%' }}
                            source={DemoWebP}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
                    <Text style={styles.timeText}>{countdownText}</Text>
                </SafeAreaView>
                <View style={styles.bottomContainer}>
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
                                style={styles.skipButton}
                                title={I18n.t('workout.skipToNextExercise')}
                                showArrow={false}
                                onPress={this._didTapSkipButton}
                            />
                            <Button
                                style={styles.pauseButton}
                                title={I18n.t('workout.pause')}
                                onPress={this._didTapPauseButton}
                            />
                        </View>
                    </LinearGradient>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16
    },
    stepTextLeft: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#BBBBBB',
        textAlign: 'left'
    },
    stepTextRight: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#BBBBBB',
        textAlign: 'right'
    },
    title: {
        marginVertical: 16,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: '#3E3750',
        textAlign: 'center'
    },
    timeText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 48,
        color: '#3E3750',
        textAlign: 'center'
    },
    bottomContainer: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
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
        color: '#BBBBBB',
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

});

export default WorkoutScreen;