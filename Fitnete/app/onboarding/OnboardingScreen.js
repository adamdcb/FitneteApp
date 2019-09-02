import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { push, Route } from '../utils/navigation/NavigationService';
import I18n from '../utils/i18n/I18n';
import OnboardingPresenter from './OnboardingPresenter';

class OnboardingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onPrivacyPolicyTap = this.onPrivacyPolicyTap.bind(this);
        this.onTermsAndConditionsTap = this.onTermsAndConditionsTap.bind(this);
        this.onAcceptTerms = this.onAcceptTerms.bind(this);
        this.presenter = new OnboardingPresenter(this);
    }

    componentDidMount() {

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

    componentWillUnmount() {
        this.presenter.unmountView();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>{I18n.t('hello')}</Text>
                <View style={styles.termsContainer}>
                <Text style={{ marginBottom: 20 }}>By signing up, you agree to <Text onPress={this.onTermsAndConditionsTap} style = {{ textDecorationLine: 'underline' }}>Terms and Conditions</Text> and <Text onPress={this.onPrivacyPolicyTap} style = {{ textDecorationLine: 'underline' }}>Privacy Policy</Text>.</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onAcceptTerms}
                    >
                        <Text style={styles.buttonText}>
                            {I18n.t('accept').toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    termsContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#5caf66',
        borderRadius: 4,
        padding: 10
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold'
    }
});


export default OnboardingScreen;