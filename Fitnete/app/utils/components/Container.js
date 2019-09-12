import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class Container extends React.PureComponent {
    render() {
        const { locations = [0, 0.5, 1], colors = ['#F3F4FA', '#F9FEFF', '#FFFFFF'], angle = 180, style = {} } = this.props;
        return (
            <LinearGradient
                style={[styles.linearGradient, style]}
                locations={locations}
                colors={colors}
                angle={angle}
            >
                {this.props.children}
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingHorizontal: 20
    },
});

export default Container;
