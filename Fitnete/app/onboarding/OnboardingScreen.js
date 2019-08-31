import React from 'react';
import { View, Text } from 'react-native';
import I18n from '../utils/i18n/I18n';

class OnboardingScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{I18n.t('hello')}</Text>
            </View>
        );
    }
}

export default OnboardingScreen;