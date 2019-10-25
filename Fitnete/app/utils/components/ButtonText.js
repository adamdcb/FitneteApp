import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

import FNIcon from './FNIcon';

class ButtonText extends React.PureComponent {
    render() {
        const { title = '', style = {}, textStyle = {}, disabled = false, showArrow = false, onPress } = this.props;
        return (
            <TouchableOpacity
                style={[styles.container, style]}
                disabled={disabled}
                onPress={onPress}
            >
                <Text style={[styles.link, textStyle]}>
                    {title}
                </Text>
                {showArrow ?
                    <View style={styles.arrowContainer}>
                        <FNIcon
                            name="arrow-right"
                            color="#0F7788"
                            size={11}
                        />
                    </View> : <View/>
                }

            </TouchableOpacity>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    link: {
        color: '#0F7788',
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        textAlign: "center"
    },
    arrowContainer: {
        marginLeft: 8
    }
});

export default ButtonText;