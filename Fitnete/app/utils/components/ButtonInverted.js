import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

class ButtonInverted extends React.PureComponent {
    render() {
        const { title = '', style = {}, textStyle = {}, onPress } = this.props;
        return (
            <View style={[styles.container, style]}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onPress}
                >
                    <Text style={[styles.text, textStyle]}>{title}</Text>
                </TouchableOpacity>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
        borderColor: '#08C757',
        borderWidth: 1
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Poppins',
        fontSize: 15,
        color: '#4F4C57',
        textAlign: 'center'
    }
});

export default ButtonInverted;