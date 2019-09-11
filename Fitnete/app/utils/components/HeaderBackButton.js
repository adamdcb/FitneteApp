import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import FNIcon from './FNIcon';

class HeaderBackButton extends React.PureComponent {
    render() {
        const { style = {} } = this.props;
        return (
            <View
                style={[styles.container, style]}
            >
                <FNIcon
                    name="arrow-left"
                    size={14}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Platform.select({
            ios: 16,
            android: 0
        }),
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default HeaderBackButton;