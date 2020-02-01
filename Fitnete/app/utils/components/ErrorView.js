import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import Button from './Button';
import Container from './Container';

class ErrorView extends React.PureComponent {
    render() {
        const { style = {}, error = {}, buttonTitle = '', onButtonPress = () => null } = this.props;
        return (
            <Container>
                <SafeAreaView style={[styles.container, style]}>
                    <Text style={styles.title}>{error.title || ''}</Text>
                    <Text style={styles.message}>{error.message || ''}</Text>
                    <View style={styles.buttonContainer}>
                        <Button
                            style={styles.button}
                            title={buttonTitle}
                            onPress={onButtonPress}
                        />
                    </View>
                </SafeAreaView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#3E3750',
        textAlign: 'center'
    },
    message: {
        marginTop: 24,
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: '#4F4C57',
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    button: {
        flex: 1,
        marginTop: 48
    }
});

export default ErrorView;