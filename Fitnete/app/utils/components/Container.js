import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class Container extends React.PureComponent {
    render() {
        const { locations = [0, 0.5, 1], colors = ['#F3F4FA', '#F9FEFF', '#FFFFFF'], angle = 180, useAngle = false, style = {} } = this.props;
        return (
            <LinearGradient
                style={[styles.linearGradient, style]}
                locations={locations}
                colors={colors}
                angle={angle}
                useAngle={useAngle}
            >
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContentContainer}
                    bounces={false}
                >
                    {this.props.children}
                </ScrollView>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20
    },
    scrollViewContentContainer: {
        flexGrow: 1
    }
});

export default Container;
