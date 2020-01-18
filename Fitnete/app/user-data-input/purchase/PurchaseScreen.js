import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { getStatusBarHeight } from 'react-native-safe-area-view';
import LinearGradient from 'react-native-linear-gradient';
import ElevatedView from 'fiber-react-native-elevated-view';

import I18n from '../../utils/i18n/I18n';
import Container from '../../utils/components/Container';
import Button from '../../utils/components/Button';
import { Route, navigate, push } from '../../utils/navigation/NavigationService';
import ButtonText from '../../utils/components/ButtonText';
import PurchasePresenter from './PurchasePresenter';
import FNIcon from '../../utils/components/FNIcon';
import LoadingView from '../../utils/components/LoadingView';

const HEADER_VIEW_HEIGHT = 84;

class PurchaseScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscriptions: null,
            activeSubscriptionType: '',
            workoutsTotal: 0,
            workoutsPerWeek: 0,
            loading: false
        }
        this.presenter = new PurchasePresenter(this);
        this.continue = this.continue.bind(this);
        this.continueForFree = this.continueForFree.bind(this);
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
        this.setState({ loading: true });
        this.presenter.requestSubscription();
    }

    continueForFree() {
        push(Route.NoPlanPurchased);
    }

    onSubscriptionSuccess() {
        this.setState({ loading: false });
        navigate(Route.MainApp);
    }

    onSubscriptionError(errorTitle, errorMessage) {
        this.setState({ loading: false });
        Alert.alert(
            errorTitle,
            errorMessage,
            [{
                text: I18n.t('ok')
            }],
            {
                cancelable: true
            }
        );
    }

    renderPayButton(subscription) {
        const { activeSubscriptionType } = this.state;
        return (
            <TouchableOpacity
                style={[styles.payButtonContainer, activeSubscriptionType === subscription.type ? styles.payButtonContainerActive : styles.payButtonContainerInactive]}
                onPress={() => this.presenter.setSelectedSubscription(subscription.id)}
            >
                <Text style={[styles.payButtonText, activeSubscriptionType === subscription.type ? styles.payButtonTextActive : styles.payButtonTextInactive]}>{I18n.t(`purchase.pay.${subscription.type}`)}</Text>
            </TouchableOpacity>
        );
    }

    renderLoading() {
        return (
            <ActivityIndicator
                size='large'
                color='#08C757'
                style={styles.loading}
            />
        );
    }

    renderButtons() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.goPremiumButtonContainer}>
                    <Button
                        style={styles.goPremiumButton}
                        title={I18n.t('purchase.continue')}
                        onPress={this.continue}
                    />
                </View>
                <ButtonText
                    style={styles.continueButton}
                    title={I18n.t('purchase.continueForFree')}
                    showArrow={false}
                    onPress={this.continueForFree}
                />
            </View>
        );
    }

    render() {
        const { subscriptions, activeSubscriptionType, workoutsTotal, workoutsPerWeek, loading } = this.state;
        if (subscriptions === null) {
            return (<LoadingView />);
        }
        const subscription = subscriptions.find(subscription => subscription.type === activeSubscriptionType) || {};
        return (
            <SafeAreaView style={styles.container}>
                <Container>
                    <View style={styles.contentContainer}>
                        <ElevatedView
                            style={styles.subscriptionOuterContainer}
                            elevation={2}
                        >
                            <LinearGradient
                                style={styles.subscriptionGradient}
                                colors={['#1CD9D929', '#FFFFFF00']}
                                locations={[0, 1]}
                                angle={90}
                                useAngle
                            >
                                <View style={styles.subscriptionContainer}>
                                    <View style={styles.subscriptionContainerLeft}>
                                        <Text style={styles.goPremium}>{I18n.t('purchase.goPremium')}</Text>
                                        <Text style={styles.priceText}>{subscription.priceText}</Text>
                                        <Text style={styles.priceDescription}>{subscription.description}</Text>
                                    </View>
                                    <View style={styles.subscriptionContainerRight}>
                                        <Text style={styles.trialTitle}>{subscription.trialTitle}</Text>
                                        <Text style={styles.trialDescription}>{subscription.trialDescription}</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </ElevatedView>
                        <View style={styles.payButtons}>
                            {subscriptions.map(subscription => this.renderPayButton(subscription))}
                        </View>
                        <Text style={styles.legalDescription}>
                            {subscription.fullDescription}
                        </Text>
                        <View style={styles.buttonsContainer}>
                            {
                                loading ? this.renderLoading() : this.renderButtons()
                            }

                        </View>
                    </View>
                </Container>
                <View style={styles.headerBackground}>
                    <View style={styles.headerViewContainer}>
                        <FNIcon
                            name='bars'
                            size={20}
                            color="#008FA6"
                        />
                        <Text style={styles.headerTextContainer}>
                            <Text style={styles.headerValueText} numberOfLines={1} ellipsizeMode="tail">{workoutsPerWeek}{' '}</Text>
                            <Text style={styles.headerText}>{I18n.t('purchase.workoutsPerWeek')}</Text>
                        </Text>
                    </View>
                    <View style={styles.headerViewContainer}>
                        <FNIcon
                            name='goal'
                            size={20}
                            color="#008FA6"
                        />
                        <Text style={styles.headerTextContainer}>
                            <Text style={styles.headerValueText} numberOfLines={1} ellipsizeMode="tail">{workoutsTotal}{' '}</Text>
                            <Text style={styles.headerText}>{I18n.t('purchase.workoutsToAchieveGoal')}</Text>
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    contentContainer: {
        flex: 1,
        marginTop: HEADER_VIEW_HEIGHT + 16,
        marginHorizontal: 1
    },
    loading: {
        marginVertical: 48
    },
    headerBackground: {
        position: 'absolute',
        height: HEADER_VIEW_HEIGHT,
        width: '100%',
        top: getStatusBarHeight(),
        paddingTop: 16,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24
    },
    headerViewContainer: {
        flexDirection: 'row'
    },
    headerTextContainer: {
        height: 24,
        marginLeft: 4,
        justifyContent: 'center',
        includeFontPadding: false
    },
    headerValueText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        color: '#3E3750'
    },
    headerText: {
        fontFamily: 'Poppins',
        fontSize: 15,
        color: '#4F4C57'
    },
    subscriptionOuterContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4
    },
    subscriptionGradient: {
        borderRadius: 4
    },
    subscriptionContainer: {
        flexDirection: 'row',
        paddingVertical: 24
    },
    subscriptionContainerLeft: {
        flex: 1,
        paddingHorizontal: 8,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    subscriptionContainerRight: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    goPremium: {
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        color: '#0F7788',
        textAlign: 'center'
    },
    priceText: {
        marginTop: 16,
        fontFamily: 'Poppins',
        fontSize: 12,
        color: '#3E3750',
        textAlign: 'center'
    },
    priceDescription: {
        marginTop: 4,
        fontFamily: 'Poppins',
        fontSize: 12,
        color: '#B4B3B6',
        textAlign: 'center'
    },
    trialTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        color: '#3E3750',
        textAlign: 'center'
    },
    trialDescription: {
        fontFamily: 'Poppins',
        fontSize: 12,
        color: '#3E3750',
        textAlign: 'center'
    },
    payButtons: {
        flexDirection: 'row',
        height: 32,
        marginTop: 16
    },
    payButtonContainer: {
        flex: 1,
        borderRadius: 4,
        justifyContent: 'center'
    },
    payButtonContainerActive: {
        backgroundColor: '#3E3750'
    },
    payButtonContainerInactive: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E2E2'
    },
    payButtonText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        textAlign: 'center'
    },
    payButtonTextActive: {
        color: '#FFFFFF'
    },
    payButtonTextInactive: {
        color: '#3E3750'
    },
    legalDescription: {
        marginVertical: 16,
        fontFamily: 'Poppins',
        fontSize: 12,
        color: '#3E3750',
        textAlign: 'center'
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 16,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    continueButton: {
        height: 40,
        marginTop: 8,
        justifyContent: 'center'
    },
    goPremiumButtonContainer: {
        flexDirection: 'row'
    },
    goPremiumButton: {
        flex: 1
    }
});

PurchaseScreen.navigationOptions = () => ({
    headerShown: false,
    gestureEnabled: false
});

export default PurchaseScreen;
