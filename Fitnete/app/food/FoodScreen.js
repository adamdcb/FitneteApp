import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import Container from '../utils/components/Container';

class FoodScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Container>

                </Container>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

FoodScreen.navigationOptions = () => ({

});

export default FoodScreen;