import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';

import I18n from '../../utils/i18n/I18n';
import Container from '../../utils/components/Container';
import Button from '../../utils/components/Button';
import { push, Route } from '../../utils/navigation/NavigationService';
import HeaderTextButton from '../../utils/components/HeaderTextButton';

class ContinueForFreeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.continue = this.continue.bind(this);
        this.goToApp = this.goToApp.bind(this);
        this.props.navigation.setParams({ goToApp: this.goToApp });
    }

    continue() {
        push(Route.WaterIntakeIntro);
    }

    goToApp() {
        push(Route.WaterTracker);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Container>
                    <Text style={styles.description}>
                        {I18n.t('continueForFree.description1')}
                    </Text>
                    <Text style={styles.description2}>
                        {I18n.t('continueForFree.description2')}{' '}
                        <Text style={styles.description3}>
                            {I18n.t('continueForFree.description3')}
                        </Text>
                    </Text>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{ uri: 'for_free' }}
                        />
                    </View>
                    <Text style={styles.continueForFreeDescription}>
                        {I18n.t('continueForFree.continueForFreeDescription')}
                    </Text>
                    <View style={styles.bottomContainer}>
                        <Text style={styles.readyText}>
                            {I18n.t('continueForFree.readyText')}
                        </Text>
                        <Button
                            title={I18n.t('continueForFree.continue')}
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
    description2: {
        marginTop: 4,
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#3E3750',
        textAlign: 'center'
    },
    description3: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#3E3750',
        textAlign: 'center'
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
    continueForFreeDescription: {
        width: 258,
        alignSelf: 'center',
        marginBottom: 16,
        fontFamily: 'Poppins',
        fontSize: 12,
        color: '#B4B3B6',
        textAlign: 'center'
    },
    bottomContainer: {
        flex: 1,
        marginBottom: 16,
        justifyContent: 'flex-end'
    },
    readyText: {
        marginBottom: 32,
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#3E3750',
        textAlign: 'center'
    }
});

ContinueForFreeScreen.navigationOptions = ({ navigation }) => ({
    headerRight:
        <HeaderTextButton
            text={I18n.t('later')}
            onPress={navigation.getParam('goToApp')}
        />
});

export default ContinueForFreeScreen;
