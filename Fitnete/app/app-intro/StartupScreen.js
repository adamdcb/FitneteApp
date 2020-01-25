import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { replace, Route } from '../utils/navigation/NavigationService';
import I18n from '../utils/i18n/I18n';
import Button from '../utils/components/Button';

class StartupScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this._start = this._start.bind(this);
    }

    _start() {
        replace(Route.AppIntro);
    }

    render() {
        return (
            <View style={styles.container}>
                 <Image
                    style={styles.backgroundImage}
                    defaultSource={{ uri: 'startup_background'}}
                    source={{ uri: 'startup_background'}}
                />
                 <Image
                    style={styles.circleImage}
                    defaultSource={{ uri: 'startup_circle'}}
                    source={{ uri: 'startup_circle' }}
                />
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeText}>{I18n.t('startup.welcome')}</Text>
                    <Image
                        style={styles.logo}
                        defaultSource={{ uri: 'logo' }}
                        source={{ uri: 'logo' }}
                    />
                </View>
                <View style={styles.bottomContainer}>
                    <Button
                        title={I18n.t('startup.start')}
                        onPress={this._start}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    circleImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    welcomeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    welcomeText: {
        marginTop: -34,
        height: 18,
        lineHeight: 18,
        fontFamily: 'Poppins',
        fontSize: 15,
        color: '#4F4C57',
        textAlign: 'center'
    },
    logo: {
        marginTop: 16,
        width: 120,
        height: 120,
        resizeMode: 'contain'
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 40,
        left: 40,
        right: 40
    }
});


StartupScreen.navigationOptions = ({ navigation }) => ({
    headerMode: 'none'
});

export default StartupScreen;