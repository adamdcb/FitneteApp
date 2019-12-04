import React from 'react';
import { SafeAreaView, FlatList, Text, View, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Button from '../../utils/components/Button';
import I18n from '../../utils/i18n/I18n';
import { HEADER_STYLE, navigate, Route } from '../../utils/navigation/NavigationService';

class ExerciseListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this._renderItem = this._renderItem.bind(this);
        this._startWorkout = this._startWorkout.bind(this);
    }

    _startWorkout() {
        const { workout } = this.props.navigation.state.params;
        navigate(Route.Countdown, { workout });
    }

    _renderItem({ item }) {
        return (
            <View style={styles.exerciseInnerContainer}>
                <View style={styles.exerciseImageContainer}>
                    <LinearGradient
                        style={styles.exerciseGradient}
                        colors={['#FFFFFF', '#D9FCFF']}
                        locations={[0, 1]}
                        useAngle
                        angle={0}
                    >
                        <Image
                            style={styles.exerciseImage}
                            source={{ uri: 'exercise_1' }}
                        />
                    </LinearGradient>
                </View>
                <View style={styles.exerciseDetailsContainer}>
                    <Text style={styles.exerciseName}>{item.title}</Text>
                    <Text style={styles.exerciseDuration}>{item.durationText}</Text>
                </View>
            </View>
        )
    }

    render() {
        const { workout } = this.props.navigation.state.params;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.infoOuterContainer}>
                    <Text style={styles.programTitle}>{workout.title}</Text>
                    <View style={styles.infoInnerContainer}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoStatusTitle}>{workout.durationTitle}</Text>
                            <Text style={styles.infoStatusDetails}>{workout.durationText}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoStatusTitle}>{workout.repeatTitle}</Text>
                            <Text style={styles.infoStatusDetails}>{workout.repeatText}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoStatusTitle}>{workout.gearTitle}</Text>
                            <Text style={styles.infoStatusDetails}>{workout.gearText}</Text>
                        </View>
                    </View>
                    <Text style={styles.programDescription} numberOfLines={3}>{workout.description}</Text>
                </View>
                <LinearGradient
                    style={styles.container}
                    colors={['#89F8AC3D', '#73F9E01A', '#FFFFFF00']}
                    locations={[0, 0.45, 1]}
                    angle={180}
                    useAngle
                >
                    <FlatList
                        style={{ flex: 1, marginTop: 8 }}
                        contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 16 }}
                        data={workout.exercises}
                        keyExtractor={item => item.id}
                        renderItem={this._renderItem}
                    />
                    <View style={styles.bottomContainer}>
                    <Button
                        title={I18n.t('dayProgram.startWorkout')}
                        onPress={this._startWorkout}
                    />
                </View>
                </LinearGradient>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    infoOuterContainer: {
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    programTitle: {
        marginTop: 16,
        marginHorizontal: 16,
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        color: '#3E3750',
        textAlign: 'left'
    },
    infoInnerContainer: {
        margin: 16,
        flexDirection: 'row'
    },
    infoContainer: {
        justifyContent: 'space-around',
        alignItems: 'center',
        marginRight: 48
    },
    infoStatusTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#0F7788',
        textAlign: 'center'
    },
    infoStatusDetails: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: '#3E3750',
        textAlign: 'center'
    },
    programDescription: {
        marginHorizontal: 16,
        marginBottom: 16,
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#3E3750',
        textAlign: 'left'
    },
    exerciseInnerContainer: {
        flexDirection: 'row',
        marginTop: 16
    },
    exerciseImageContainer: {
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
    exerciseGradient: {
        width: 72,
        height: 72,
        borderRadius: 12,
        overflow: 'hidden'
    },
    exerciseImage: {
        width: 72,
        height: 72,
        resizeMode: 'contain'
    },
    exerciseDetailsContainer: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center'
    },
    exerciseName: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: '#4F4C57'
    },
    exerciseDuration: {
        fontFamily: 'Poppins',
        fontSize: 12,
        color: '#3E3750'
    },
    bottomContainer: {
        margin: 16,
        justifyContent: 'flex-end'
    }
});

ExerciseListScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.programName,
    headerStyle: {
        ...HEADER_STYLE,
        backgroundColor: '#FFFFFF',
        elevation: 3 // FIXE: workaround for shadow issue
    }
});

export default ExerciseListScreen;