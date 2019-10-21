import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import Container from '../utils/components/Container';

class TrainingScreen extends React.Component {
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

TrainingScreen.navigationOptions = () => ({

});

export default TrainingScreen;