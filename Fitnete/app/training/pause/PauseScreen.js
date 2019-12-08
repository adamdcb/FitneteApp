import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, BackHandler } from 'react-native';

import Button from '../../utils/components/Button';
import I18n from '../../utils/i18n/I18n';
import { HEADER_TITLE_STYLE, pop, navigate, Route } from '../../utils/navigation/NavigationService';
import LinearGradient from 'react-native-linear-gradient';
import ButtonInverted from '../../utils/components/ButtonInverted';

class PauseScreen extends React.Component {
    constructor(props) {
        super(props);
        this._restart = this._restart.bind(this);
        this._quit = this._quit.bind(this);
        this._continue = this._continue.bind(this);
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    _restart() {
        const { restartExercise } = this.props.navigation.state.params;
        restartExercise();
        pop();
    }

    _quit() {
        navigate(Route.Reminder);
    }

    _continue() {
        const { resumeExercise } = this.props.navigation.state.params;
        resumeExercise();
        pop();
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
                        <Text style={HEADER_TITLE_STYLE}>{I18n.t('pause.title')}</Text>
                        <Text style={styles.description}>{I18n.t('pause.description')}</Text>
                        <ButtonInverted
                            style={styles.button}
                            title={I18n.t('pause.restartExercise')}
                            onPress={this._restart}
                        />
                        <ButtonInverted
                            style={styles.button}
                            title={I18n.t('pause.quitExercise')}
                            onPress={this._quit}
                        />
                        <View style={styles.bottomContainer}>
                            <Button
                                title={I18n.t('pause.continue')}
                                onPress={this._continue}
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
    description: {
        marginTop: 64,
        fontFamily: 'Poppins',
        fontSize: 15,
        color: '#4F4C57',
        textAlign: 'center'
    },
    bottomContainer: {
        flex: 1,
        marginBottom: 16,
        justifyContent: 'flex-end'
    },
    button: {
        marginTop: 16
    }
});

PauseScreen.navigationOptions = () => ({
    headerTransparent: true,
    header: null,
    gesturesEnabled: false
});

export default PauseScreen;