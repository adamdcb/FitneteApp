import React from 'react';
import {
    SafeAreaView,
    ActivityIndicator,
    StyleSheet
} from 'react-native';

class LoadingScreen extends React.PureComponent {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 20
    }
});

export default LoadingScreen;