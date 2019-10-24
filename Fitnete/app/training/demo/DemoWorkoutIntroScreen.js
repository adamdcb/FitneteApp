import React from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Container from '../../utils/components/Container';
import Button from '../../utils/components/Button';
import ButtonText from '../../utils/components/ButtonText';
import { pop, push, Route } from '../../utils/navigation/NavigationService';

class DemoWorkoutIntroScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this._notReady = this._notReady.bind(this);
        this._previewWorkout = this._previewWorkout.bind(this);
    }

    _notReady() {
        pop();
    }

    _previewWorkout() {
        push(Route.DemoWorkout, { step: 1, stepsTotal: 3 });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={styles.container}>
                    <Container>
                        <Image
                            style={styles.demoImage}
                            source={{ uri: 'for_free' }}
                        />
                        <Text style={styles.demoWorkout}>{`DEMO\nWORKOUT`}</Text>
                    </Container>
                </SafeAreaView>
                <View style={styles.bottomContainer}>
                    <LinearGradient
                        style={styles.linearGradient}
                        colors={['#FFFFFF', '#FAFAFA']}
                        angle={0}
                    >
                        <Text style={styles.title}>Toned arms and breasts</Text>
                        <Text style={styles.description}>Program description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                        <Button
                            title={'YES, PREVIEW THIS WORKOUT'}
                            onPress={this._previewWorkout}
                        />
                        <ButtonText
                            style={{ marginTop: 8 }}
                            title={'No, I\'m not ready to train yet'}
                            showArrow={false}
                            onPress={this._notReady}
                        />
                    </LinearGradient>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    demoWorkout: {
        marginTop: 136,
        lineHeight: 44,
        fontFamily: 'Poppins-Bold',
        fontSize: 40,
        color: '#3E3750'
    },
    demoImage: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 172,
        height: 326,
        resizeMode: 'contain'
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
    },
    linearGradient: {
        paddingHorizontal: 32,
        paddingBottom: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    title: {
        marginTop: 24,
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        color: '#3E3750',
        textAlign: 'center'
    },
    description: {
        marginTop: 8,
        marginBottom: 40,
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#3E3750',
        textAlign: 'center'
    }
});

DemoWorkoutIntroScreen.navigationOptions = () => ({

});

export default DemoWorkoutIntroScreen;