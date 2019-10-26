import React from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Container from '../../utils/components/Container';
import Button from '../../utils/components/Button';
import ButtonText from '../../utils/components/ButtonText';
import { pop, push, Route } from '../../utils/navigation/NavigationService';
import I18n from '../../utils/i18n/I18n';

class DemoWorkoutIntroScreen extends React.Component {
    constructor(props) {
        super(props);
        this._notReady = this._notReady.bind(this);
        this._previewWorkout = this._previewWorkout.bind(this);
    }

    _notReady() {
        pop();
    }

    _previewWorkout() {
        const { program } = this.props.navigation.state.params;
        push(Route.DemoWorkout, { program: program });
    }

    render() {
        const { program } = this.props.navigation.state.params;
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={styles.container}>
                    <Container>
                        <View style={styles.innerContainer}>
                            <Image
                                style={styles.demoImage}
                                source={{ uri: program.image }}
                            />
                            <Text style={styles.demoWorkout}>{I18n.t('demoWorkout.introTitle')}</Text>
                        </View>
                    </Container>
                </SafeAreaView>
                <View style={styles.bottomContainer}>
                    <LinearGradient
                        style={styles.linearGradient}
                        colors={['#FFFFFF', '#FAFAFA']}
                        angle={0}
                    >
                        <Text style={styles.title}>{program.title}</Text>
                        <Text style={styles.description}>{program.description}</Text>
                        <Button
                            title={I18n.t('demoWorkout.previewWorkout')}
                            onPress={this._previewWorkout}
                        />
                        <ButtonText
                            style={{ marginTop: 8 }}
                            title={I18n.t('demoWorkout.notReadyYet')}
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
    innerContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    demoWorkout: {
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
        height: '100%',
        resizeMode: 'contain'
    },
    bottomContainer: {
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