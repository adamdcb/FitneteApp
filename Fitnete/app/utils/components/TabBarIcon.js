import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

class TabBarIcon extends React.PureComponent {
    render() {
        const { style = {}, iconName } = this.props;
        return (
            <View>
                <Image
                    style={[styles.image, style]}
                    source={{ uri: iconName }}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    image: {
        width: 32,
        height: 32,
        resizeMode: 'contain'
    }
});

export default TabBarIcon;