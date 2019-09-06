import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class Container extends React.PureComponent {
    render() {
        return (
            <LinearGradient
                style={styles.linearGradient}
                locations={[0, 0.5138, 1]}
                colors={['#F3F4FA', '#F9FEFF', '#FFFFFF']}
                angle={180}
            >
                {this.props.children}
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1
    },
});

export default Container;
