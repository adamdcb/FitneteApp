import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import ElevatedView from 'fiber-react-native-elevated-view';

import I18n from '../../utils/i18n/I18n';
import Container from '../../utils/components/Container';
import Button from '../../utils/components/Button';
import { Route, navigate, push, pop } from '../../utils/navigation/NavigationService';
import ButtonText from '../../utils/components/ButtonText';
import PurchasePresenter from './PurchasePresenter';
import FNIcon from '../../utils/components/FNIcon';
import LoadingView from '../../utils/components/LoadingView';

class PurchaseScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscriptions: [],
            activeSubscriptionType: '',
            workoutsTotal: 0,
            workoutsPerWeek: 0,
            loading: true,
            paymentLoading: false
        }
        this.navigationParams = this.props.navigation.state.params || {};
        this.usesModalBehaviour = !!this.navigationParams.useModalBehaviour;
        this.tryRestore = !!this.navigationParams.tryRestore;
        this.presenter = new PurchasePresenter(this);
        this.continue = this.continue.bind(this);
        this.continueForFree = this.continueForFree.bind(this);
    }

    componentDidMount() {
        this.presenter.loadData(this.tryRestore);
    }

    componentWillUnmount() {
        this.presenter.unmountView();
    }

    setData(data) {
        this.setState({ ...data });
        if (data.premium) {
            this.onSubscriptionSuccess();
        }
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

    onSubscriptionError(errorTitle, errorMessage) {
        this.setState({ paymentLoading: false });
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
                <ButtonText
                    style={styles.continueButton}
                    title={I18n.t('purchase.continueForFree')}
                    showArrow={false}
                    onPress={this.continueForFree}
                />
            </View>
        );
    }

    renderSubscriptionButton(subscription) {
        const { activeSubscriptionType } = this.state;
        const borderColor = activeSubscriptionType === subscription.type ? '#08C757' : '#E2E2E2';
        const topTextColor = activeSubscriptionType === subscription.type ? '#08C757' : '#3E3750';
        return (
            <ElevatedView
                style={{ flex: 1 }}
                elevation={1}
                onPress={() => this.presenter.setSelectedSubscription(subscription.id)}
            >
                <View style={[styles.subscriptionButtonContainer, { borderColor }]}>
                    <View>
                        <Text style={[styles.title, { color: topTextColor }]}>{subscription.title}</Text>
                        <Text style={[styles.pricePerWeek, { color: topTextColor }]}>{subscription.pricePerWeekText}</Text>
                    </View>
                    <View style={styles.subscriptionButtonBottomView}>
                        <Text style={styles.priceText}>{subscription.priceText}</Text>
                        <Text style={styles.description}>{subscription.description}</Text>
                    </View>
                </View>
            </ElevatedView>
        );
    }

    render() {
        const { loading } = this.state;
        if (loading) {
            return (<LoadingView />);
        }
        const { subscriptions, workoutsTotal, workoutsPerWeek, paymentLoading } = this.state;
        return (
            <Container>
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
                        <Text style={styles.legalDescription}>
                            {I18n.t('purchase.fullDescription')}
                        </Text>
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
        paddingVertical: 16,
        paddingLeft: 12,
        borderRadius: 8,
        borderWidth: 1
    },
    subscriptionButtonBottomView: {
        marginTop: 24
    },
    goPremiumContainer: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 32,
        paddingVertical: 24,
        paddingVertical: 16
    },
    goPremiumTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 24
    },
    goPremium: {
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        color: '#0F7788',
        textAlign: 'center'
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 13,
        lineHeight: 15,
        color: '#3E3750'
    },
    pricePerWeek: {
        fontFamily: 'Poppins',
        fontSize: 12,
        lineHeight: 14,
        color: '#B4B3B6'
    },
    priceText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        lineHeight: 14,
        color: '#3E3750'
    },
    description: {
        fontFamily: 'Poppins',
        fontSize: 12,
        lineHeight: 14,
        color: '#B4B3B6'
    },
    legalDescription: {
        marginVertical: 32,
        fontFamily: 'Poppins',
        fontSize: 12,
        color: '#3E3750',
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginVertical: 16,
        minHeight: 88,
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
