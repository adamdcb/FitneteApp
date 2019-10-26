import React from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import Container from '../utils/components/Container';
import Button from '../utils/components/Button';
import { push, Route } from '../utils/navigation/NavigationService';
import DemoWebP from '../animations/training/demo.webp';

class WorkoutScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Container>
                    <View>
                        <FastImage
                            style={{ width: '100%', height: '100%' }}
                            source={DemoWebP}
                            // resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
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

WorkoutScreen.navigationOptions = () => ({

});

export default WorkoutScreen;