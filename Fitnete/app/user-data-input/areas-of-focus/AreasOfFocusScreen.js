import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import SwitchToggle from 'react-native-switch-toggle';

import I18n from '../../utils/i18n/I18n';
import Container from '../../utils/components/Container';
import ProgressIndicator from '../../utils/components/ProgressIndicator';
import Button from '../../utils/components/Button';
import AreaOfFocusPresenter from './AreaOfFocusPresenter';
import { push, Route } from '../../utils/navigation/NavigationService';
import AreasOfFocusTabViewScene from './AreasOfFocusTabViewScene';
import UserDataSource from '../../data/UserDataSource';

class AreasOfFocusScreen extends React.Component {
    constructor(props) {
        super(props);
        this.presenter = new AreaOfFocusPresenter(this);
        this.state = {
            tabView: null
        };
        this.onIndexChange = this.onIndexChange.bind(this);
        this.getScene = this.getScene.bind(this);
        this.onContinue = this.onContinue.bind(this);
    }

    async componentDidMount() {
        this.presenter.loadData();
        const userDS = new UserDataSource();
        const user = await userDS.getUser();
        console.log(user);
    }

    componentWillUnmount() {
        this.presenter.unmountView();
    }

    onContinue() {
        push(Route.SelectFitLevel);
    }

    onIndexChange(index) {
        this.presenter.didSelectGroup(index);
    }

    setTabViewData(data) {
        this.setState({
            tabView: this.getTabViewData(data)
        });
    }

    getScene({ route }) {
        return (
            <AreasOfFocusTabViewScene
                type={route.key}
            />
        )
    }

    getTabViewData(data) {
        return {
            index: data.selectedGroupIndex,
            routes: data.groups.map(group => ({
                key: group.type,
                title: group.name
            }))
        };
    }

    getLoadingView() {
        return (
            <SafeAreaView style={styles.container}>
                <Container />
            </SafeAreaView>
        );
    }

    render() {
        const { tabView } = this.state;
        if (!tabView) {
            return this.getLoadingView();
        }
        const { routes } = tabView;
        const scenes = routes.reduce((prev, current) => {
            prev[current.key] = this.getScene;
            return prev;
        }, {});
        return (
            <SafeAreaView style={styles.container}>
                <Container>
                    <View style={styles.progressContainer}>
                        <Text style={styles.stepTextLeft}>
                            {I18n.t('dataCollection.stepCurrent', { step_number: 1 })}
                        </Text>
                        <ProgressIndicator
                            style={styles.progressIndicator}
                            count={4}
                            activeIndex={0}
                        />
                        <Text style={styles.stepTextRight}>
                            {I18n.t('dataCollection.stepTotal', { total: 4 })}
                        </Text>
                    </View>
                    <Text style={styles.description}>
                        {I18n.t('areasOfFocus.description')}
                    </Text>
                    <TabView
                        style={styles.tabView}
                        navigationState={this.state.tabView}
                        renderScene={SceneMap(scenes)}
                        onIndexChange={this.onIndexChange}
                        initialLayout={{
                            height: 0,
                            width: Dimensions.get('window').width,
                        }}
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
                            title={I18n.t('dataCollection.continue')}
                            onPress={this.onContinue}
                        />
                    </View>
                </Container>
            </SafeAreaView>
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
    areasContainer: {
        marginTop: 56
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
