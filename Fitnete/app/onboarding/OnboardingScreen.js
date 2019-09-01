import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { push, Route } from '../utils/navigation/NavigationService';
import I18n from '../utils/i18n/I18n';

class OnboardingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.onAccept = this.onAccept.bind(this);
        this.onPrivacyPolicyTap = this.onPrivacyPolicyTap.bind(this);
    }

    onAccept() {

    }

    onPrivacyPolicyTap() {
        push(Route.PrivacyPolicy)
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>{I18n.t('hello')}</Text>
                <View style={styles.termsContainer}>
                <Text>By signing up, you agree to Terms of Service and <Text onPress={this.onPrivacyPolicyTap} style = {{ textDecorationLine: 'underline' }}>Privacy Policy.</Text></Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onPress}
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
})


export default OnboardingScreen;