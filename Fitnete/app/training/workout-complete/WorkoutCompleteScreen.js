import React from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet, BackHandler } from 'react-native';

import Button from '../../utils/components/Button';
import I18n from '../../utils/i18n/I18n';
import { navigate, Route } from '../../utils/navigation/NavigationService';
import LinearGradient from 'react-native-linear-gradient';

class WorkoutCompleteScreen extends React.Component {
    constructor(props) {
        super(props);
        this._goToMainScreen = this._goToMainScreen.bind(this);
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    _goToMainScreen() {
        navigate(Route.Training, { shouldRefreshProgress: true });
    }

    render() {
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
                        <Text style={styles.description1}>{I18n.t('workoutComplete.description1')}</Text>
                        <Text style={styles.description2}>{I18n.t('workoutComplete.description2')}</Text>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                defaultSource={{ uri: 'workout_complete' }}
                                source={{ uri: 'workout_complete' }}
                            />
                        </View>
                        <View style={styles.bottomContainer}>
                            <Button
                                title={I18n.t('workoutComplete.goToMainScreen')}
                                onPress={this._goToMainScreen}
                            />
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
    description1: {
        marginTop: 48,
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#3E3750',
        textAlign: 'center'
    },
    description2: {
        marginTop: 4,
        fontFamily: 'Poppins',
        fontSize: 15,
        color: '#4F4C57',
        textAlign: 'center'
    },
    imageContainer: {
        flex: 1,
        marginBottom: 48,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 375,
        height: 228,
        resizeMode: 'contain'
    },
    bottomContainer: {
        marginBottom: 16,
        justifyContent: 'flex-end'
    }
});

WorkoutCompleteScreen.navigationOptions = () => ({
    headerTransparent: true,
    headerShown: false,
    headerTitle: () => null,
    gestureEnabled: false
});

export default WorkoutCompleteScreen;