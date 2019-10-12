import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';

import I18n from '../../utils/i18n/I18n';
import Container from '../../utils/components/Container';
import Button from '../../utils/components/Button';
import { push, Route } from '../../utils/navigation/NavigationService';

class WorkoutPlanReadyScreen extends React.Component {
    constructor(props) {
        super(props);
        this.goToPlan = this.goToPlan.bind(this);
    }

    goToPlan() {
        push(Route.WaterTracker);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Container>
                    <Text style={styles.description}>
                        {I18n.t('workoutPlanReady.description1')}
                    </Text>
                    <Text style={styles.description2}>
                        {I18n.t('workoutPlanReady.description2')}
                    </Text>
                    <Text style={styles.description3}>
                            {I18n.t('workoutPlanReady.description3')}
                        </Text>
                    <View style={styles.successImageContainer}>
                        <Image
                            style={styles.successImage}
                            source={{ uri: 'processing_success' }}
                        />
                    </View>
                    <View style={styles.bottomContainer}>
                        <Button
                            title={I18n.t('workoutPlanReady.getYourPlan')}
                            onPress={this.goToPlan}
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
    description2: {
        marginTop: 4,
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#3E3750',
        textAlign: 'center'
    },
    description3: {
        marginTop: -4,
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#3E3750',
        textAlign: 'center',
        textDecorationLine: 'underline',
        textDecorationColor: '#30D87C'
    },
    successImageContainer: {
        marginTop: 64,
        alignItems: 'center',
        justifyContent: 'center'
    },
    successImage: {
        width: 246,
        height: 228,
        resizeMode: 'contain'
    },
    bottomContainer: {
        flex: 1,
        marginBottom: 16,
        justifyContent: 'flex-end'
    }
});

WorkoutPlanReadyScreen.navigationOptions = () => ({
    title: I18n.t('workoutPlanReady.title')
});

export default WorkoutPlanReadyScreen;
