import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import I18n from '../../utils/i18n/I18n';

class TermsAndConditionsScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>{I18n.t('termsAndConditionsTitle')}</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

TermsAndConditionsScreen.navigationOptions = () => ({
    title: I18n.t('termsAndConditionsTitle')
});

export default TermsAndConditionsScreen;