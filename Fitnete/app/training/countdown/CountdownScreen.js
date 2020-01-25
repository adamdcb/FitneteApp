import React from 'react';
import { Image, Text, View, StyleSheet, Dimensions, BackHandler, Platform } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { replace, Route } from '../../utils/navigation/NavigationService';
import I18n from '../../utils/i18n/I18n';
import CountdownPresenter from './CountdownPresenter';

const offset = Platform.select({
    ios: 116,
    android: 100
});
const progressViewSize = Dimensions.get('window').width - offset;

class CountdownScreen extends React.Component {
    constructor(props) {
        super(props);
        const { workout } = this.props.navigation.state.params;
        this.state = {
            progress: 0,
            count: 0
        };
        this.presenter = new CountdownPresenter(this, workout);
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
        this.presenter.start();
    }

    componentWillUnmount() {
        this.backHandler.remove();
        this.presenter.unmountView();
    }

    setProgress(progress, count) {
        this.setState({
            progress, count
        });
    }

    onCountdownDidEnd() {
        const { workout } = this.props.navigation.state.params;
        replace(Route.Workout, { workout });
    }

    render() {
        const { count, progress } = this.state;
        return (
            <View
                style={styles.container}
            >
                <Image
                    style={styles.backgroundImage}
                    source={{ uri: 'startup_background' }}
                />
                <Image
                    style={styles.circleImage}
                    source={{ uri: 'startup_circle' }}
                />
                <View style={styles.progressViewContainer}>
                    <AnimatedCircularProgress
                        size={progressViewSize}
                        width={6}
                        rotation={0}
                        fill={progress}
                        tintColor="#08C757"
                        lineCap="round"
                        backgroundColor="#EEEFF1"
                        style={styles.progressView}
                    >
                        {
                            (fill) => (
                                <View style={styles.progressViewChildrenInnerContainer}>
                                    <Text style={styles.countText}>{count || ''}</Text>
                                    <Text style={styles.startText}>{I18n.t('countdown.start')}</Text>
                                </View>
                            )
                        }
                    </AnimatedCircularProgress>
                </View>
            </View >
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
    progressViewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    progressView: {
        borderRadius: progressViewSize
    },
    progressViewChildrenInnerContainer: {
        flex: 1,
        marginTop: -43,
        justifyContent: 'center',
        alignItems: 'center'
    },
    startText: {
        marginTop: -23,
        fontFamily: 'Poppins-Bold',
        fontSize: 48,
        color: '#363636',
        textAlign: 'center'
    },
    countText: {
        height: 66,
        fontFamily: 'Poppins-Bold',
        fontSize: 40,
        color: '#08C757',
        textAlign: 'center'
    }
});

CountdownScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false,
    animationEnabled: false,
    gestureEnabled: false
});

export default CountdownScreen;