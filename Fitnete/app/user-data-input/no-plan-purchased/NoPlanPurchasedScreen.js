import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import I18n from '../../utils/i18n/I18n';
import Container from '../../utils/components/Container';
import Button from '../../utils/components/Button';
import { push, Route } from '../../utils/navigation/NavigationService';
import HeaderTextButton from '../../utils/components/HeaderTextButton';

class NoPlanPurchasedScreen extends React.Component {
    constructor(props) {
        super(props);
        this.continueForFree = this.continueForFree.bind(this);
        this.goPremium = this.goPremium.bind(this);
        this.goToApp = this.goToApp.bind(this);
        this.props.navigation.setParams({ goToApp: this.goToApp });
    }

    continueForFree() {
        push(Route.ContinueForFree);
    }

    goPremium() {

    }

    goToApp() {
        push(Route.WaterTracker);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={styles.container}>
                    <Container>
                        <Text style={styles.description}>
                            {I18n.t('noPlanPurchased.description1')}
                        </Text>
                        <Text style={styles.description2}>
                            {I18n.t('noPlanPurchased.description2')}{' '}
                            <Text style={styles.description3}>
                                {I18n.t('noPlanPurchased.description3')}
                            </Text>
                        </Text>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={{ uri: 'no_premium' }}
                            />
                        </View>
                    </Container>
                </SafeAreaView>
                <View style={styles.bottomContainer}>
                    <LinearGradient
                        style={styles.linearGradient}
                        colors={['#FFFFFF', '#FAFAFA']}
                        angle={0}
                    >
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={styles.continueButtonContainer}
                                onPress={this.continueForFree}
                            >
                                <Text style={styles.continueButton}>{I18n.t('noPlanPurchased.continue')}</Text>
                            </TouchableOpacity>
                            <Button
                                style={styles.goPremiumButton}
                                title={I18n.t('noPlanPurchased.goPremium')}
                                onPress={this.goPremium}
                            />
                        </View>
                        <View style={styles.divider} />
                        <Text style={styles.continueForFreeDescription}>
                            {I18n.t('noPlanPurchased.continueForFreeDescription')}
                        </Text>
                    </LinearGradient>

                </View>
            </View>
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
        textAlign: 'center',
        textDecorationLine: 'underline',
        textDecorationColor: '#30D87C'
    },
    imageContainer: {
        marginTop: 64,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 258,
        height: 228,
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
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginTop: 16,
        alignItems: 'center'
    },
    continueButtonContainer: {
        flex: 1,
        height: 40,
        marginRight: 16,
        justifyContent: 'center'
    },
    continueButton: {
        fontFamily: 'Poppins',
        fontSize: 15,
        color: '#0F7788',
        textAlign: 'left'
    },
    goPremiumButton: {
        flex: 1
    },
    divider: {
        flex: 1,
        margin: 16,
        height: 1,
        backgroundColor: '#EEEFF1'
    },
    continueForFreeDescription: {
        marginBottom: 36,
        fontFamily: 'Poppins',
        fontSize: 12,
        color: '#B4B3B6',
        textAlign: 'center'
    }
});

NoPlanPurchasedScreen.navigationOptions = ({ navigation }) => ({
    headerRight:
        <HeaderTextButton
            text={I18n.t('later')}
            onPress={navigation.getParam('goToApp')}
        />
});

export default NoPlanPurchasedScreen;
