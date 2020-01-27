import React from 'react';
import { SafeAreaView, FlatList, Text, View, Image, TouchableHighlight, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ElevatedView from 'fiber-react-native-elevated-view';

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
        this._previewExercise = this._previewExercise.bind(this);
    }

    _startWorkout() {
        const { workout } = this.props.navigation.state.params;
        navigate(Route.Countdown, { workout });
    }

    _previewExercise(exercise) {
        const { workout } = this.props.navigation.state.params;
        navigate(Route.ExercisePreview, { workout, exercise });
    }

    _renderItem({ item }) {
        return (
            <TouchableHighlight
                underlayColor='#DBDBDE32'
                activeOpacity={1}
                style={styles.exerciseInnerContainer}
                onPress={() => this._previewExercise(item)}
            >
                <View
                    style={styles.listItemContainer}
                    pointerEvents="none"
                >
                    <ElevatedView
                        style={styles.exerciseImageContainer}
                        elevation={2}
                    >
                        <LinearGradient
                            style={styles.exerciseGradient}
                            colors={['#FFFFFF', '#D9FCFF']}
                            locations={[0, 1]}
                            useAngle
                            angle={0}
                        >
                            <Image
                                style={styles.exerciseImage}
                                defaultSource={{ uri: 'exercise_1' }}
                                source={{ uri: 'exercise_1' }}
                            />
                        </LinearGradient>
                    </ElevatedView>
                    <View style={styles.exerciseDetailsContainer}>
                        <Text style={styles.exerciseName}>{item.title}</Text>
                        <Text style={styles.exerciseDuration}>{item.durationText}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        const { workout } = this.props.navigation.state.params;
        return (
            <SafeAreaView style={styles.container}>
                <ElevatedView
                    style={styles.infoOuterContainer}
                    elevation={3}
                >
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
                </ElevatedView>
                <LinearGradient
                    style={styles.container}
                    colors={['#89F8AC3D', '#73F9E01A', '#FFFFFF00']}
                    locations={[0, 0.45, 1]}
                    angle={180}
                    useAngle
                >
                    <FlatList
                        style={styles.list}
                        contentContainerStyle={styles.listContent}
                        data={workout.exercises}
                        keyExtractor={item => item.id}
                        renderItem={this._renderItem}
                    />
                    <View style={styles.bottomContainer}>
                        <Button
                            disabled={workout.locked}
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
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    infoOuterContainer: {
        backgroundColor: '#FFFFFF'
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
    listItemContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 4,
        alignItems: 'center'
    },
    exerciseInnerContainer: {
        flexDirection: 'row',
        marginTop: 16,
        paddingHorizontal: 16
    },
    exerciseImageContainer: {
        width: 64,
        height: 64,
        borderRadius: 12
    },
    exerciseGradient: {
        width: 64,
        height: 64,
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
    list: {
        flex: 1,
        marginTop: 8
    },
    listContent: {
        paddingVertical: 8
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
        backgroundColor: '#FFFFFF'
    }
});

export default ExerciseListScreen;