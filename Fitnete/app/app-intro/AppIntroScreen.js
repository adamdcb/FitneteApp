import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-web-swiper';

import { push, Route, navigate } from '../utils/navigation/NavigationService';
import I18n from '../utils/i18n/I18n';
import AppIntroPresenter from './AppIntroPresenter';
import Button from '../utils/components/Button';
import Container from '../utils/components/Container';
import CheckBox from '../utils/components/CheckBox';

class AppIntroScreen extends React.Component {
    constructor(props) {
        super(props);
        this.presenter = new AppIntroPresenter(this);
        this.data = this.presenter.getData();
        const [element = {}] = this.data;
        this.state = {
            title: I18n.t(element.title),
            message: I18n.t(element.description),
            isTermsAndCondtionsCheckBoxActive: false,
            isPrivacyPolicyCheckBoxActive: false
        }
        this.onPrivacyPolicyTap = this.onPrivacyPolicyTap.bind(this);
        this.onTermsAndConditionsTap = this.onTermsAndConditionsTap.bind(this);
        this.onToggleTermsAndConditionsCheckBox = this.onToggleTermsAndConditionsCheckBox.bind(this);
        this.onTogglePrivacyPolicyCheckBox = this.onTogglePrivacyPolicyCheckBox.bind(this);
        this.onAcceptTerms = this.onAcceptTerms.bind(this);
        this.onSwiperIndexChanged = this.onSwiperIndexChanged.bind(this);
    }

    onAcceptTerms() {
        this.presenter.didAcceptTerms();
    }

    onPrivacyPolicyTap() {
        push(Route.PrivacyPolicy);
    }

    onTermsAndConditionsTap() {
        push(Route.TermsAndConditions);
    }

    onToggleTermsAndConditionsCheckBox(active) {
        this.setState({
            isTermsAndCondtionsCheckBoxActive: active
        });
    }

    onTogglePrivacyPolicyCheckBox(active) {
        this.setState({
            isPrivacyPolicyCheckBoxActive: active
        });
    }

    onSwiperIndexChanged(index) {
        const element = this.data[index];
        this.setState({
            title: I18n.t(element.title),
            message: I18n.t(element.description)
        })
    }

    didAcceptTerms() {
        navigate(Route.AreasOfFocus);
    }

    componentWillUnmount() {
        this.presenter.unmountView();
    }

    render() {
        const { isTermsAndCondtionsCheckBoxActive, isPrivacyPolicyCheckBoxActive } = this.state;
        const isAcceptEnabled = isTermsAndCondtionsCheckBoxActive && isPrivacyPolicyCheckBoxActive;
        return (
            <SafeAreaView style={styles.container}>
                <Container>
                    <View style={styles.swiper}>
                        <Swiper
                            minDistanceForAction={0.1}
                            controlsProps={{
                                nextPos: 'right',
                                NextComponent: ({ onPress }) => (
                                    <TouchableOpacity
                                        style={styles.rightArrowContainer}
                                        onPress={onPress}
                                    >
                                        <Text style={styles.arrow}>
                                            {'›'}
                                        </Text>
                                    </TouchableOpacity>
                                ),
                                prevPos: 'left',
                                PrevComponent: ({ onPress }) => (
                                    <TouchableOpacity
                                        style={styles.leftArrowContainer}
                                        onPress={onPress}
                                    >
                                        <Text style={styles.arrow}>
                                            {'‹'}
                                        </Text>
                                    </TouchableOpacity>
                                ),
                                dotsTouchable: true,
                                dotProps: {
                                    badgeStyle: styles.dotStyle
                                },
                                dotActiveStyle: styles.dotActiveStyle
                            }}
                            onIndexChanged={this.onSwiperIndexChanged}
                        >
                            {this.data.map((element) => (
                                <View
                                    style={styles.slide}
                                    key={element.id}
                                >
                                    <Image
                                        style={styles.slideImage}
                                        source={{ uri: element.imageName }}
                                    />
                                </View>
                            ))}
                        </Swiper>
                    </View>
                    <Text style={styles.pageTitle}>
                        {this.state.title}
                    </Text>
                    <Text style={styles.pageMessage}>
                        {this.state.message}
                    </Text>
                    <View style={styles.bottomContainer}>
                        <View style={styles.checkBoxTextContainer}>
                            <CheckBox onToggle={this.onToggleTermsAndConditionsCheckBox} />
                            <Text
                                style={styles.termsText}
                            >
                                {I18n.t('appIntro.acceptTermsText1')} <Text onPress={this.onTermsAndConditionsTap} style={styles.termsTextUnderlined}>{I18n.t('appIntro.acceptTermsText2')} </Text>{I18n.t('appIntro.acceptTermsText3')}
                            </Text>
                        </View>
                        <View style={styles.checkBoxTextContainer}>
                            <CheckBox onToggle={this.onTogglePrivacyPolicyCheckBox} />
                            <Text
                                style={styles.termsText}
                            >
                                {I18n.t('appIntro.acceptPrivacyPolicyText1')} <Text onPress={this.onPrivacyPolicyTap} style={styles.termsTextUnderlined}>{I18n.t('appIntro.acceptPrivacyPolicyText2')} </Text>{I18n.t('appIntro.acceptPrivacyPolicyText3')}
                            </Text>
                        </View>
                        <Button
                            title={I18n.t('appIntro.accept')}
                            disabled={!isAcceptEnabled}
                            onPress={this.onAcceptTerms}
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
    swiper: {
        height: 216,
        marginTop: 32,
        marginBottom: 4
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    slideImage: {
        width: 253,
        height: 170,
        resizeMode: 'contain'
    },
    leftArrowContainer: {
        marginLeft: -20
    },
    rightArrowContainer: {
        marginRight: -20
    },
    arrow: {
        color: '#3E3750',
        fontSize: 40,
        fontWeight: '400'
    },
    dotStyle: {
        backgroundColor: '#DBDBDE'
    },
    dotActiveStyle: {
        backgroundColor: '#08C757'
    },
    pageTitle: {
        color: '#3E3750',
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 16
    },
    pageMessage: {
        color: '#4F4C57',
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 32
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 16
    },
    checkBoxTextContainer: {
        flexDirection: 'row'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#5caf66',
        borderRadius: 4,
        padding: 12
    },
    termsText: {
        color: '#BBBBBB',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        marginHorizontal: 12,
        marginBottom: 24
    },
    termsTextUnderlined: {
        color: '#08C757',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        textDecorationLine: 'underline'
    }
});

export default AppIntroScreen;