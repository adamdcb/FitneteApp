import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class CountdownProgressBar extends React.PureComponent {
    render() {
        const { percentage } = this.props;
        return (
            <View style={styles.progressBarContainer}>
                <View style={styles.progressContainer}>
                    <LinearGradient
                        style={{
                            ...styles.progressView,
                            width: `${percentage}%`
                        }}
                        colors={['#89F8AD', '#73F9E0']}
                        locations={[0, 1]}
                        angle={270}
                        useAngle
                    >
                    </LinearGradient>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    progressBarContainer: {
        flex: 1,
        height: 16,
        marginHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DBDBDE',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center'
    },
    progressContainer: {
        height: 8,
        marginHorizontal: 4,
        borderRadius: 4,
        overflow: 'hidden'
    },
    progressView: {
        height: 8
    }
});

export default CountdownProgressBar;