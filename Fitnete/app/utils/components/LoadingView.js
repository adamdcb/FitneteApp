import React from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';

class LoadingView extends React.PureComponent {
    render() {
        const { style = {} } = this.props;
        return (
            <SafeAreaView style={[styles.container, style]}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4FA',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LoadingView;