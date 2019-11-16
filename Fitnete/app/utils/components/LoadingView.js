import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Container from './Container';

class LoadingView extends React.PureComponent {
    render() {
        const { style = {} } = this.props;
        return (
            <SafeAreaView style={[styles.container, style]}>
                <Container />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default LoadingView;