import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const Button = (props) => {
    const { title = '', style = {}, textStyle = {},  disabled = false, onPress } = props;
    return (
        <LinearGradient
            style={[styles.linearGradient, style]}
            colors={['#08C757', '#0DB15F']}
            useAngle
            angle={135}
            angleCenter={{ x: 0.5, y: 0.5 }}
        >
            <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.button, style]}>
                <Text style={[styles.text, textStyle]}>{title}</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 40,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#0ABE5A',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#FFFFFF'
    },
    linearGradient: {
        height: 40,
        borderRadius: 4
      }
});
