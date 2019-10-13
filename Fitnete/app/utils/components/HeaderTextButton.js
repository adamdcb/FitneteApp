import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

class HeaderTextButton extends React.PureComponent {
    render() {
        const { style = {}, text = '', onPress = () => null } = this.props;
        return (
            <TouchableOpacity
                style={[styles.container, style]}
                onPress={onPress}
            >
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Poppins',
        fontSize: 12,
        fontWeight: "500",
        color: '#B4B3B6',
        textAlign: 'center'
    }
});

export default HeaderTextButton;