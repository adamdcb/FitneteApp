import React from 'react';
import { SafeAreaView, View, ScrollView, Text, StyleSheet, ActivityIndicator, Alert, Platform, Linking } from 'react-native';
import ElevatedView from 'fiber-react-native-elevated-view';

import I18n from '../../utils/i18n/I18n';
import Container from '../../utils/components/Container';
import Button from '../../utils/components/Button';
import { Route, navigate, push, pop } from '../../utils/navigation/NavigationService';
import ButtonText from '../../utils/components/ButtonText';
import PurchasePresenter from './PurchasePresenter';
import FNIcon from '../../utils/components/FNIcon';
import LoadingView from '../../utils/components/LoadingView';
import ErrorView from '../../utils/components/ErrorView';
import { URL } from '../../utils/utils/Constants';

class PurchaseScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscriptions: null,
            activeSubscriptionType: '',
            workoutsTotal: 0,
            workoutsPerWeek: 0,
            paymentLoading: false,
            error: null
        }
        this.navigationParams = this.props.navigation.state.params || {};
        this.usesModalBehaviour = !!this.navigationParams.useModalBehaviour;
        this.presenter = new PurchasePresenter(this);
        this.continue = this.continue.bind(this);
        this.continueForFree = this.continueForFree.bind(this);
        this.restore = this.restore.bind(this);
        this.retry = this.retry.bind(this);
        this.openPrivacyPolicy = this.openPrivacyPolicy.bind(this);
        this.openTermsAndConditions = this.openTermsAndConditions.bind(this);
        this.openBillingTerms = this.openBillingTerms.bind(this);
    }

    componentDidMount() {
        this.presenter.loadData();
    }

    componentWillUnmount() {
        this.presenter.unmountView();
    }

    setData(data) {
        this.setState(data);
    }

    continue() {
        this.setState({ paymentLoading: true });
        this.presenter.requestSubscription();
    }

    continueForFree() {
        if (this.usesModalBehaviour) {
            pop();
        } else {
            push(Route.NoPlanPurchased);
        }
    }

    restore() {
        this.setState({ paymentLoading: true });
        this.presenter.restoreSubscription();
    }

    retry() {
        this.setState({ error: null });
        this.presenter.loadData();
    }

    openPrivacyPolicy() {
        this.openURL(URL.PrivacyPolicy);
    }

    openTermsAndConditions() {
        this.openURL(URL.TermsAndConditions);
    }

    openBillingTerms() {
        this.openURL(URL.BillingTerms);
    }

    openURL(url) {
        try {
            Linking.openURL(url);
        } catch (error) {
            console.log(`openUrl(): ${url}`, error);
        }
    }

    onSubscriptionSuccess() {
        this.setState({ paymentLoading: false });
        if (this.usesModalBehaviour) {
            const { onPurchaseSuccess } = this.navigationParams;
            onPurchaseSuccess();
            pop();
        } else {
            navigate(Route.MainApp);
        }
    }

    onSubscriptionError(error) {
        this.setState({ paymentLoading: false });
        Alert.alert(
            error.title,
            error.message,
            [{
                text: I18n.t('ok')
            }],
            {
                cancelable: true
            }
        );
    }

    getTextNumberOfLines() {
        return Platform.select({
            ios: 1,
            android: 2
        });
    }

    renderLoading() {
        return (
            <ActivityIndicator
                size='large'
                style={styles.paymentLoading}
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
                <View style={styles.continueRestoreContainer}>
                    {/* 
                        // TODO: Enable continue for free option!
                        <ButtonText
                        style={styles.continueForFree}
                        title={I18n.t('purchase.continueForFree')}
                        showArrow={false}
                        onPress={this.continueForFree}
                    /> */}
                    <ButtonText
                        style={styles.restore}
                        title={I18n.t('purchase.restore')}
                        showArrow={false}
                        onPress={this.restore}
                    />
                </View>
            </View>
        );
    }

    renderSubscriptionButton(subscription) {
        const { activeSubscriptionType } = this.state;
        const borderColor = activeSubscriptionType === subscription.type ? '#009A4D' : '#E2E2E2';
        const topTextColor = activeSubscriptionType === subscription.type ? '#009A4D' : '#3E3750';
        return (
            <ElevatedView
                style={{ flex: 1 }}
                elevation={1}
                onPress={() => this.presenter.setSelectedSubscription(subscription.id)}
            >
                <View style={[styles.subscriptionButtonContainer, { borderColor }]}>
                    <View>
                        <Text
                            numberOfLines={this.getTextNumberOfLines()}
                            adjustsFontSizeToFit
                            style={[styles.title, { color: topTextColor }]}
                        >
                            {subscription.title}
                        </Text>
                        <Text
                            numberOfLines={this.getTextNumberOfLines()}
                            adjustsFontSizeToFit
                            style={[styles.priceText, { color: topTextColor }]}
                        >
                            {subscription.priceText}
                        </Text>
                    </View>
                    <View style={styles.subscriptionButtonBottomView}>
                        <Text
                            numberOfLines={this.getTextNumberOfLines()}
                            adjustsFontSizeToFit
                            style={styles.pricePerWeek}
                        >
                            {subscription.pricePerWeekText}
                        </Text>
                        <Text
                            numberOfLines={2}
                            adjustsFontSizeToFit
                            style={styles.description}
                        >
                            {subscription.description}
                        </Text>
                    </View>
                </View>
            </ElevatedView>
        );
    }

    render() {
        const { subscriptions, error } = this.state;
        if (error) {
            return (
                <ErrorView
                    error={error}
                    buttonTitle={I18n.t('error.retry')}
                    onButtonPress={this.retry}
                />
            );
        }
        if (subscriptions === null) {
            return (<LoadingView />);
        }
        const { workoutsTotal, workoutsPerWeek, paymentLoading } = this.state;
        return (
            <Container useScroll={false}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.contentContainer}>
                        <ElevatedView
                            style={styles.goPremiumContainer}
                            elevation={1}
                            feedbackEnabled={false}
                        >
                            <View style={styles.goPremiumTextContainer}>
                                <Text style={styles.goPremium}>{I18n.t('purchase.goPremium')}</Text>
                                <Text style={styles.goPremium}>{I18n.t('purchase.getTheFullExperience')}</Text>
                            </View>
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
                        </ElevatedView>
                        <View style={styles.subscriptionContainer}>
                            {subscriptions.map(subscription => this.renderSubscriptionButton(subscription))}
                        </View>
                        <Text style={styles.fullDescription}>
                            {I18n.t('purchase.fullDescription')}
                        </Text>
                        <ScrollView>
                            <Text style={styles.legalDescription}>
                                {I18n.t('purchase.legal.description1')}
                            </Text>
                            <Text style={styles.legalDescription}>
                                <Text
                                    style={styles.terms}
                                    onPress={this.openPrivacyPolicy}
                                >
                                    {I18n.t('purchase.legal.privacyPolicy')}
                                </Text>
                                {', '}
                                <Text
                                    style={styles.terms}
                                    onPress={this.openTermsAndConditions}
                                >
                                    {I18n.t('purchase.legal.termsAndConditions')}
                                </Text>
                                {', '}
                                <Text>
                                    {I18n.t('and')}{' '}
                                </Text>
                                <Text
                                    style={styles.terms}
                                    onPress={this.openBillingTerms}
                                >
                                    {I18n.t('purchase.legal.billingTerms')}
                                </Text>
                            </Text>
                            <Text style={[styles.legalDescription, { marginTop: 12 }]}>
                                {I18n.t(`purchase.legal.description2_${Platform.OS}`)}
                            </Text>
                        </ScrollView>
                    </View>
                    <View style={styles.buttonsContainer}>
                        {
                            paymentLoading ? this.renderLoading() : this.renderButtons()
                        }
                    </View>
                </SafeAreaView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    paymentLoading: {
        alignSelf: 'center'
    },
    headerViewContainer: {
        flexDirection: 'row',
        paddingHorizontal: 8
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
    subscriptionContainer: {
        flexDirection: 'row'
    },
    subscriptionButtonContainer: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1
    },
    subscriptionButtonBottomView: {
        marginTop: 12
    },
    goPremiumContainer: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 8,
        marginBottom: 16,
        paddingVertical: 8
    },
    goPremiumTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 8
    },
    goPremium: {
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        color: '#0F7788',
        textAlign: 'center'
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        lineHeight: 20,
        color: '#3E3750'
    },
    pricePerWeek: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        lineHeight: 16,
        color: '#5F5F5F'
    },
    priceText: {
        fontFamily: 'Poppins',
        fontSize: 16,
        lineHeight: 20,
        color: '#B4B3B6'
    },
    description: {
        fontFamily: 'Poppins',
        fontSize: 12,
        lineHeight: 16,
        color: '#B4B3B6'
    },
    fullDescription: {
        marginVertical: 12,
        marginLeft: 12,
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        color: '#0F7788'
    },
    legalDescription: {
        marginLeft: 12,
        fontFamily: 'Poppins',
        fontSize: 12,
        color: '#B4B3B6'
    },
    terms: {
        textDecorationLine: 'underline'
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginVertical: 16,
        minHeight: 88,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    goPremiumButtonContainer: {
        flexDirection: 'row'
    },
    goPremiumButton: {
        flex: 1
    },
    continueRestoreContainer: {
        flexDirection: 'row',
        height: 40,
        marginTop: 8,
        justifyContent: 'center'
    },
    continueForFree: {
        // marginRight: 12
    },
    restore: {
        marginLeft: 12
    }
});

PurchaseScreen.navigationOptions = () => ({
    headerShown: false,
    gestureEnabled: false
});

export default PurchaseScreen;
