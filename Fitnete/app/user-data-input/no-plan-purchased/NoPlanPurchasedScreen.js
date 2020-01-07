import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ElevatedView from 'fiber-react-native-elevated-view';

import I18n from '../../utils/i18n/I18n';
import Container from '../../utils/components/Container';
import Button from '../../utils/components/Button';
import { Route, pop, navigate } from '../../utils/navigation/NavigationService';
import ButtonText from '../../utils/components/ButtonText';

class NoPlanPurchasedScreen extends React.Component {
    constructor(props) {
        super(props);
        this.continueForFree = this.continueForFree.bind(this);
        this.goPremium = this.goPremium.bind(this);
    }

    continueForFree() {
        navigate(Route.MainApp);
    }

    goPremium() {
        pop();
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
                                source={{ uri: 'for_free' }}
                            />
                        </View>
                    </Container>
                </SafeAreaView>
                <ElevatedView
                    style={styles.bottomContainer}
                    elevation={16}
                >
                    <LinearGradient
                        style={styles.linearGradient}
                        colors={['#FFFFFF', '#FAFAFA']}
                        angle={0}
                    >
                        <View style={styles.buttonsContainer}>
                            <View style={styles.goPremiumButtonContainer}>
                                <Button
                                    style={styles.goPremiumButton}
                                    title={I18n.t('noPlanPurchased.goPremium')}
                                    onPress={this.goPremium}
                                />
                            </View>
                            <ButtonText
                                style={styles.continueButton}
                                title={I18n.t('noPlanPurchased.continue')}
                                showArrow={false}
                                onPress={this.continueForFree}
                            />
                        </View>
                        <View style={styles.divider} />
                        <Text style={styles.continueForFreeDescription}>
                            {I18n.t('noPlanPurchased.continueForFreeDescription')}
                        </Text>
                    </LinearGradient>
                </ElevatedView>
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
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    linearGradient: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    buttonsContainer: {
        marginHorizontal: 16,
        marginTop: 16,
        alignItems: 'center'
    },
    continueButton: {
        height: 40,
        marginTop: 8,
        justifyContent: 'center'
    },
    goPremiumButtonContainer: {
        flexDirection: 'row',
        flex: 1
    },
    goPremiumButton: {
        flex: 1
    },
    divider: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 8,
        height: 1,
        backgroundColor: '#EEEFF1'
    },
    continueForFreeDescription: {
        marginBottom: 36,
        marginHorizontal: 16,
        fontFamily: 'Poppins',
        fontSize: 12,
        color: '#B4B3B6',
        textAlign: 'center'
    }
});

NoPlanPurchasedScreen.navigationOptions = () => ({
    headerTitle: () => null
});

export default NoPlanPurchasedScreen;
