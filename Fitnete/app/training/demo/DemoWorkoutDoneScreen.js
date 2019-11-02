import React from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet } from 'react-native';

import Container from '../../utils/components/Container';
import Button from '../../utils/components/Button';
import I18n from '../../utils/i18n/I18n';
import { Route, navigate } from '../../utils/navigation/NavigationService';

class DemoWorkoutDoneScreen extends React.Component {
    constructor(props) {
        super(props);
        this._continue = this._continue.bind(this);
    }

    _continue() {
        const { program } = this.props.navigation.state.params;
        navigate(Route.TrainingProgram, { program });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Container>
                <Text style={styles.description}>
                        {I18n.t('demoWorkoutDone.description1')}
                    </Text>
                    <Text style={styles.description2}>
                        {I18n.t('demoWorkoutDone.description2')}
                    </Text>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{ uri: 'congratulations' }}
                        />
                    </View>
                    <View style={styles.bottomContainer}>
                        <Button
                            title={I18n.t('demoWorkoutDone.continue')}
                            onPress={this._continue}
                        />
                    </View>
                </Container>
            </SafeAreaView>
        );
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
        textAlign: 'center',
        textDecorationLine: 'underline',
        textDecorationColor: '#30D87C'
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 258,
        height: 228,
        resizeMode: 'contain'
    },
    bottomContainer: {
        marginBottom: 16,
        justifyContent: 'flex-end'
    }
});

DemoWorkoutDoneScreen.navigationOptions = () => ({
    title: I18n.t('demoWorkoutDone.title')
});

export default DemoWorkoutDoneScreen;