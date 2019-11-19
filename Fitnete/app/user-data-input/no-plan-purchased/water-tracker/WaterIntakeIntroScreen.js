import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';

import I18n from '../../../utils/i18n/I18n';
import Container from '../../../utils/components/Container';
import Button from '../../../utils/components/Button';
import { push, Route } from '../../../utils/navigation/NavigationService';
import HeaderTextButton from '../../../utils/components/HeaderTextButton';
import WaterTrackerIntroPresenter from './WaterTrackerIntroPresenter';

class WaterIntakeIntroScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            waterIntakeAmount: ''
        }
        this.continue = this.continue.bind(this);
        this.goToApp = this.goToApp.bind(this);
        this.presenter = new WaterTrackerIntroPresenter(this);
        this.props.navigation.setParams({ goToApp: this.goToApp });
    }

    componentDidMount() {
        this.presenter.loadData();
    }

    componentWillUnmount() {
        this.presenter.unmountView();
    }

    setData(data) {
        this.setState({ ...data });
    }

    continue() {
        push(Route.WaterTracker);
    }

    goToApp() {
        push(Route.WaterTracker);
    }

    render() {
        const { waterIntakeAmount } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <Container>
                    <Text style={styles.description}>
                        {I18n.t('waterIntakeIntro.description1')}
                    </Text>
                    <Text style={styles.descriptionBold}>
                        <Text style={styles.description2}>
                            {I18n.t('waterIntakeIntro.description2')}
                        </Text>
                        <Text style={styles.description3}>
                            {' '}{I18n.t('waterIntakeIntro.description3')}
                        </Text>
                    </Text>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{ uri: 'water_tracker_intro' }}
                        />
                    </View>
                    <Text style={styles.dailyWaterIntakeText}>
                        {I18n.t('waterIntakeIntro.dailyWaterIntake')}{' '}
                        <Text style={styles.dailyWaterIntakeValue}>
                            {waterIntakeAmount}
                        </Text>
                    </Text>
                    <View style={styles.bottomContainer}>
                        <Button
                            title={I18n.t('waterIntakeIntro.continue')}
                            onPress={this.continue}
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
    description: {
        marginTop: 48,
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#4F4C57',
        textAlign: 'center'
    },
    descriptionBold: {
        marginTop: 4,
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#3E3750',
        textAlign: 'center',
    },
    description2: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#3E3750',
        textAlign: 'center',
        textDecorationLine: 'underline',
        textDecorationColor: '#30D87C'
    },
    description3: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#3E3750',
        textAlign: 'center',
    },
    imageContainer: {
        marginTop: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 258,
        height: 228,
        resizeMode: 'contain'
    },
    dailyWaterIntakeText: {
        marginTop: 32,
        fontFamily: 'Poppins',
        fontSize: 15,
        color: '#4F4C57',
        textAlign: 'center'
    },
    dailyWaterIntakeValue: {
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        color: '#3E3750',
        textAlign: 'center'
    },
    bottomContainer: {
        flex: 1,
        marginBottom: 16,
        justifyContent: 'flex-end'
    }
});

WaterIntakeIntroScreen.navigationOptions = ({ navigation }) => ({
    headerRight:
        <HeaderTextButton
            text={I18n.t('later')}
            onPress={navigation.getParam('goToApp')}
        />
});

export default WaterIntakeIntroScreen;
