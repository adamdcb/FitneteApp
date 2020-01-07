import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, BackHandler } from 'react-native';

import Button from '../../utils/components/Button';
import I18n from '../../utils/i18n/I18n';
import { pop, navigate, Route } from '../../utils/navigation/NavigationService';
import ButtonInverted from '../../utils/components/ButtonInverted';
import Container from '../../utils/components/Container';

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
            <Container>
                <SafeAreaView style={styles.container}>
                    <View style={styles.content}>
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
            </Container>
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
    title: I18n.t('pause.title'),
    headerLeft: () => null,
    gestureEnabled: false
});

export default PauseScreen;