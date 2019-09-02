import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import I18n from '../../utils/i18n/I18n';

class PrivacyPolicyScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                  <Text>{I18n.t('privacyPolicyTitle')}</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

PrivacyPolicyScreen.navigationOptions = () => ({
    title: I18n.t('privacyPolicyTitle')
});

export default PrivacyPolicyScreen;