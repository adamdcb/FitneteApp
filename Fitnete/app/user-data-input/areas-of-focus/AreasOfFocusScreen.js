import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import SwitchToggle from 'react-native-switch-toggle';

import I18n from '../../utils/i18n/I18n';
import Container from '../../utils/components/Container';
import ProgressIndicator from '../../utils/components/ProgressIndicator';
import Button from '../../utils/components/Button';
import AreaOfFocusPresenter from './AreaOfFocusPresenter';

class AreasOfFocusScreen extends React.Component {
    constructor(props) {
        super(props);
        this.presenter = new AreaOfFocusPresenter(this);
        this.state = {
            tabView: {
                index: 0,
                routes: [
                    { key: 'female', title: I18n.t('areasOfFocus.female') },
                    { key: 'male', title: I18n.t('areasOfFocus.male') },
                ]
            }
        };
        this.onIndexChange = this.onIndexChange.bind(this);
        this.firstRoute = this.firstRoute.bind(this);
        this.secondRoute = this.secondRoute.bind(this);
    }

    onIndexChange(index) {
        const tabView = {};
        Object.assign(tabView, { ...this.state.tabView, index });
        this.setState({ tabView });
    }

    firstRoute() {
        return (
            <View style={[styles.tabViewScene]}>
                <View style={styles.tabViewImage}>

                </View>

                <SwitchToggle
                    containerStyle={styles.switchContainer}
                    circleStyle={styles.switchCircle}
                    buttonStyle={styles.switchButton}
                    backgroundColorOn="#08C757"
                    backgroundColorOff="#3E3750"
                // switchOn={this.state.switchOn2}
                // onPress={this.onPress2}
                />
            </View>

        )
    }
    secondRoute() {
        return (
            <View style={[styles.tabViewScene]} />
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Container>
                    <View style={styles.progressContainer}>
                        <Text style={styles.stepTextLeft}>
                            {I18n.t('areasOfFocus.stepCurrent', { step_number: 2 })}
                        </Text>
                        <ProgressIndicator
                            style={styles.progressIndicator}
                            count={4}
                            activeIndex={1}
                        />
                        <Text style={styles.stepTextRight}>
                            {I18n.t('areasOfFocus.stepTotal', { total: 4 })}
                        </Text>
                    </View>
                    <Text style={styles.description}>
                        {I18n.t('areasOfFocus.description')}
                    </Text>
                    <TabView
                        style={styles.tabView}
                        navigationState={this.state.tabView}
                        renderScene={SceneMap({
                            female: this.firstRoute,
                            male: this.secondRoute,
                        })}
                        onIndexChange={this.onIndexChange}
                        // initialLayout={{ width: Dimensions.get('window').width }}
                        renderTabBar={props =>
                            <TabBar
                                {...props}
                                style={styles.tabBar}
                                indicatorStyle={styles.tabBarIndicator}
                                labelStyle={styles.tabBarLabel}
                            />
                        }
                    />
                    <View style={styles.bottomContainer}>
                        <Button
                            title={I18n.t('areasOfFocus.continue')}
                        // onPress={}
                        />
                    </View>
                </Container>
            </SafeAreaView >
        )
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
    description: {
        marginTop: 48,
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#4F4C57',
        textAlign: 'center'
    },
    tabView: {
        flex: 1,
        marginVertical: 24
    },
    tabBar: {
        backgroundColor: 'transparent'
    },
    tabBarLabel: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: '#3E3750',
        textTransform: 'capitalize'
    },
    tabBarIndicator: {
        backgroundColor: '#08C757'
    },
    tabViewScene: {
        flex: 1,
        marginTop: 16,
        flexDirection: 'row'
    },
    tabViewImage: {
        width: 120
    },
    switchContainer: {
        width: 48,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#3E3750',
        padding: 4
    },
    switchCircle: {
        width: 16,
        height: 16,
        borderRadius: 5,
        backgroundColor: '#FFFFFF'
    },
    switchButton: {
        transform: [
            { rotate: '-45deg' }
        ]
    },
    bottomContainer: {
        marginBottom: 16,
        justifyContent: 'flex-end'
    }
});

AreasOfFocusScreen.navigationOptions = () => ({
    title: I18n.t('areasOfFocus.title')
});

export default AreasOfFocusScreen;
