import React from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet, BackHandler } from 'react-native';

import Button from '../../utils/components/Button';
import I18n from '../../utils/i18n/I18n';
import { pop } from '../../utils/navigation/NavigationService';
import LinearGradient from 'react-native-linear-gradient';
import RestPresenter from './RestPresenter';

class RestScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        const { exercise, nextExercise } = this.props.navigation.state.params;
        this.presenter = new RestPresenter(this, exercise, nextExercise);
        this._skip = this._skip.bind(this);
    }

    componentDidMount() {
        this.presenter.startTimer();
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
    }

    componentWillUnmount() {
        this.presenter.unmountView();
        this.backHandler.remove();
    }

    setData(data) {
        this.setState({ ...data });
    }

    _skip() {
        const { skipRest } = this.props.navigation.state.params;
        skipRest();
        pop();
    }

    onRestCompleted() {
        this._skip();
    }

    render() {
        const { countdownText } = this.state;
        const { nextExercise } = this.props.navigation.state.params;
        return (
            <LinearGradient
                style={styles.container}
                colors={['#89F8AC3D', '#73F9E01A', '#FFFFFF00']}
                locations={[0, 0.45, 1]}
                angle={180}
                useAngle
            >
                <SafeAreaView style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.topContainer}>
                            <Text style={styles.title}>{I18n.t('rest.title')}</Text>
                            <Text style={styles.timeText}>{countdownText}</Text>
                            <Button
                                title={I18n.t('rest.skip')}
                                onPress={this._skip}
                            />
                        </View>
                        <View style={styles.bottomContainer}>
                            <Text style={styles.nextExercise}>{I18n.t('rest.nextExercise')}</Text>
                            <View style={styles.nextExerciseInnerContainer}>
                                <View style={styles.nextExerciseImageContainer}>
                                    <LinearGradient
                                        style={styles.nextExerciseGradient}
                                        colors={['#FFFFFF', '#D9FCFF']}
                                        locations={[0, 1]}
                                        useAngle
                                        angle={0}
                                    >
                                        <Image
                                            style={styles.nextExerciseImage}
                                            source={{ uri: 'exercise_1' }}
                                        />
                                    </LinearGradient>
                                </View>
                                <View style={styles.nextExerciseDetailsContainer}>
                                    <Text style={styles.nextExerciseName}>{nextExercise.title}</Text>
                                    <Text style={styles.nextExerciseDuration}>{nextExercise.durationText}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        marginHorizontal: 20
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#3E3750',
        textAlign: 'center'
    },
    timeText: {
        marginVertical: 48,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 48,
        color: '#3E3750',
        textAlign: 'center'
    },
    topContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    bottomContainer: {
        marginVertical: 16,
        justifyContent: 'flex-end'
    },
    button: {
        marginTop: 16
    },
    nextExercise: {
        fontFamily: 'Poppins',
        fontSize: 14,
        color: '#BBBBBB'
    },
    nextExerciseDetailsContainer: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center'
    },
    nextExerciseName: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: '#4F4C57'
    },
    nextExerciseDuration: {
        fontFamily: 'Poppins',
        fontSize: 12,
        color: '#3E3750'
    },
    nextExerciseInnerContainer: {
        flexDirection: 'row',
        marginTop: 16
    },
    nextExerciseImageContainer: {
        width: 72,
        height: 72,
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
    nextExerciseGradient: {
        width: 72,
        height: 72,
        borderRadius: 12,
        overflow: 'hidden'
    },
    nextExerciseImage: {
        width: 72,
        height: 72,
        resizeMode: 'contain'
    },
});

RestScreen.navigationOptions = () => ({
    headerTransparent: true,
    header: null,
    gesturesEnabled: false
});

export default RestScreen;