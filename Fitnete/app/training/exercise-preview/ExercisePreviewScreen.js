import React from 'react';
import { SafeAreaView, Text, View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import ElevatedView from 'fiber-react-native-elevated-view';

import Container from '../../utils/components/Container';
import ExercisePreviewPresenter from './ExercisePreviewPresenter';

class ExercisePreviewScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            animationSource: null
        };
        const { exercise } = this.props.navigation.state.params;
        this.presenter = new ExercisePreviewPresenter(this, exercise);
        this._didLoadAnimation = this._didLoadAnimation.bind(this);
    }

    componentDidMount() {
        this.presenter.loadExercise();
    }

    componentWillUnmount() {
        this.presenter.unmountView();
    }

    setData(data) {
        this.setState({ ...data });
    }

    _didLoadAnimation() {
        this.setState({ loading: false });
    }

    renderAnimation(animationSource) {
        return (
            <FastImage
                style={styles.animation}
                source={animationSource}
                resizeMode={FastImage.resizeMode.contain}
                onLoadEnd={this._didLoadAnimation}
            />
        );
    }

    renderLoading() {
        return (
            <ActivityIndicator
                size='large'
                color='#FFFFFF'
                style={styles.loading}
            />
        );
    }

    render() {
        const { loading,
            animationSource,
            description } = this.state;
        const { workout: { background } } = this.props.navigation.state.params;
        return (
            <Container
                scrollViewStyle={{ paddingHorizontal: 0 }}
            >
                <Image
                    style={styles.background}
                    source={{ uri: background }}
                />
                <SafeAreaView style={styles.container}>
                    <View style={styles.animationContainer}>
                        {
                            animationSource ? this.renderAnimation(animationSource) : null
                        }
                        {
                            loading ? this.renderLoading() : null
                        }
                    </View>
                </SafeAreaView>
                <ElevatedView
                    style={styles.bottomContainer}
                    elevation={16}
                >
                    <LinearGradient
                        style={styles.linearGradient}
                        colors={['#FFFFFF', '#FAFAFA']}
                        angle={0}
                    >
                        <Text style={styles.infoDescription}>{description}</Text>
                    </LinearGradient>
                </ElevatedView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20
    },
    background: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    loading: {
        alignSelf: 'center',
        paddingBottom: 48
    },
    animationContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    animation: {
        height: '100%',
        width: '100%'
    },
    bottomContainer: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    linearGradient: {
        paddingHorizontal: 32,
        paddingVertical: 24,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    infoDescription: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#4F4C57',
        textAlign: 'center'
    }
});

ExercisePreviewScreen.navigationOptions = ({ navigation }) => {
    const { exercise } = navigation.state.params;
    return {
        title: exercise.title
    }
};

export default ExercisePreviewScreen;