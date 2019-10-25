import React from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Container from '../../utils/components/Container';
import Button from '../../utils/components/Button';
import I18n from '../../utils/i18n/I18n';
import ProgressIndicator from '../../utils/components/ProgressIndicator';
import { push, Route } from '../../utils/navigation/NavigationService';
import Utils from '../../utils/utils/Utils';

class DemoWorkoutScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: this.props.navigation.state.params.step || 1
        };
        this._continue = this._continue.bind(this);
    }

    _continue() {
        const { workouts } = this.props.navigation.state.params;
        const { step } = this.state;
        if (step < workouts.length) {
            push(Route.DemoWorkout, { step: step + 1, workouts });
        } else {
           push(Route.DemoWorkoutDone);
        }
    }

    render() {
        const { workouts } = this.props.navigation.state.params;
        const { step } = this.state;
        const stepsTotal = workouts.length;
        const workout = workouts[step - 1] || {};
        const buttonTextKey = step === stepsTotal ? 'demoWorkout.finish' : 'demoWorkout.nextExercise';
        return (
            <SafeAreaView style={styles.container}>
                <Container>
                    <View style={styles.progressContainer}>
                        <Text style={styles.stepTextLeft}>
                            {I18n.t('demoWorkout.stepCurrent', { step_number: step })}
                        </Text>
                        <ProgressIndicator
                            style={styles.progressIndicator}
                            count={stepsTotal}
                            activeIndex={step - 1}
                        />
                        <Text style={styles.stepTextRight}>
                            {I18n.t('demoWorkout.stepTotal', { total: stepsTotal })}
                        </Text>
                    </View>
                    <View style={styles.workoutContainer}>
                        <LinearGradient
                            style={styles.workoutGradient}
                            colors={['#FFFFFF', '#D9FCFF']}
                            locations={[0, 1]}
                            useAngle
                            angle={0}
                        >
                            <Image
                                style={styles.workoutImage}
                                source={{ uri: 'for_free' }}
                            />
                        </LinearGradient>
                        <Text style={styles.workoutTitle}>{I18n.t(workout.nameKey)}</Text>
                        <Text style={styles.workoutDescription} numberOfLines={3}>{I18n.t(workout.descriptionKey)}</Text>
                    </View>
                    <View style={styles.workoutDetailsOuterContainer}>
                        <View style={styles.detailsContainer}>
                            <Image
                                style={styles.statusImage}
                                source={{ uri: workout.durationImageName }}
                            />
                            <Text style={styles.statusTitle}>{I18n.t(workout.durationTitleKey)}</Text>
                            <Text style={styles.statusDetails}>{Utils.secondsToMMSS(workout.duration)}</Text>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Image
                                style={styles.statusImage}
                                source={{ uri: workout.repeatImageName }}
                            />
                            <Text style={styles.statusTitle}>{I18n.t(workout.repeatTitleKey)}</Text>
                            <Text style={styles.statusDetails}>{`${workout.repeat} ${I18n.t('demoWorkout.demo.times')}`}</Text>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Image
                                style={styles.statusImage}
                                source={{ uri: workout.gearImageName }}
                            />
                            <Text style={styles.statusTitle}>{I18n.t(workout.gearTitleKey)}</Text>
                            <Text style={styles.statusDetails}>{workout.gear}</Text>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <Button
                            title={I18n.t(buttonTextKey)}
                            onPress={this._continue}
                        />
                    </View>
                </Container>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16
    },
    stepTextLeft: {
        flex: 1,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#BBBBBB',
        textAlign: 'left'
    },
    stepTextRight: {
        flex: 1,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#BBBBBB',
        textAlign: 'right'
    },
    progressIndicator: {
        flex: 1
    },
    workoutContainer: {
        justifyContent: 'center',
        margin: 4,
        marginTop: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2
    },
    workoutGradient: {
        flex: 1,
        height: 159,
        borderRadius: 12,
        overflow: 'hidden'
    },
    workoutImage: {
        flex: 1,
        width: null,
        height: 159,
        resizeMode: 'contain'
    },
    workoutTitle: {
        marginHorizontal: 8,
        marginTop: 16,
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        color: '#3E3750',
        textAlign: 'center'
    },
    workoutDescription: {
        marginTop: 8,
        marginHorizontal: 8,
        marginBottom: 24,
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#3E3750',
        textAlign: 'center'
    },
    workoutDetailsOuterContainer: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    detailsContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusImage: {
        marginBottom: 4,
        width: 16,
        height: 16,
        resizeMode: 'contain'
    },
    statusTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#3E3750',
        textAlign: 'center'
    },
    statusDetails: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: '#3E3750',
        textAlign: 'center'
    },
    bottomContainer: {
        flex: 1,
        marginBottom: 16,
        justifyContent: 'flex-end'
    }
});

DemoWorkoutScreen.navigationOptions = () => ({
    title: I18n.t('demoWorkout.title')
});

export default DemoWorkoutScreen;