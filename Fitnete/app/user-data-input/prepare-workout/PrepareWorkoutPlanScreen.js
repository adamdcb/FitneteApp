import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import I18n from '../../utils/i18n/I18n';
import Container from '../../utils/components/Container';
import ProgressIndicator from '../../utils/components/ProgressIndicator';
import { push, Route } from '../../utils/navigation/NavigationService';
import PrepareWorkoutPlanPresenter from './PrepareWorkoutPlanPresenter';

const progressViewSize = Dimensions.get('window').width - 120;

class PrepareWorkoutPlanScreen extends React.Component {
    constructor(props) {
        super(props);
        this.presenter = new PrepareWorkoutPlanPresenter(this);
        this.state = {
            progress: 0
        };
    }

    componentDidMount() {
        this.presenter.startPreparingWorkoutPlan();
    }

    componentWillUnmount() {
        this.presenter.unmountView();
    }

    onContinue() {
        push(Route.WorkoutPlanReady);
    }

    setProgress(progress) {
        this.setState({
            progress
        })
    }

    getLoadingView() {
        return (
            <SafeAreaView style={styles.container}>
                <Container />
            </SafeAreaView>
        );
    }

    render() {
        const { step, stepsTotal } = this.props.navigation.state.params;
        return (
            <SafeAreaView style={styles.container}>
                <Container>
                    <View style={styles.progressContainer}>
                        <Text style={styles.stepTextLeft}>
                            {I18n.t('dataCollection.stepCurrent', { step_number: step })}
                        </Text>
                        <ProgressIndicator
                            style={styles.progressIndicator}
                            count={stepsTotal}
                            activeIndex={step - 1}
                        />
                        <Text style={styles.stepTextRight}>
                            {I18n.t('dataCollection.stepTotal', { total: stepsTotal })}
                        </Text>
                    </View>
                    <Text style={styles.description1}>
                        {I18n.t('prepareWorkoutPlan.description1')}
                    </Text>
                    <Text style={styles.description2}>
                        {I18n.t('prepareWorkoutPlan.description2')}
                    </Text>
                    <View style={styles.progressViewContainer}>
                        <AnimatedCircularProgress
                            size={progressViewSize}
                            width={6}
                            rotation={0}
                            fill={this.state.progress}
                            tintColor="#08C757"
                            lineCap="round"
                            backgroundColor="#FFFFFF"
                            style={styles.progressView}
                            childrenContainerStyle={styles.progressViewChildrenContainer}
                        >
                            {
                                (fill) => (
                                    <View style={styles.progressViewChildrenInnerContainer}>
                                        <Image
                                            style={styles.progressImage}
                                            source={{ uri: 'processing' }}
                                        />
                                        <Text style={styles.processingText}>
                                            {I18n.t('prepareWorkoutPlan.processing')}
                                        </Text>
                                        <View style={styles.progressTextContainer}>
                                            <Text style={styles.progressText}>
                                                {this.state.progress}
                                            </Text>
                                            <Text style={styles.progressUnit}>
                                                %
                                            </Text>
                                        </View>
                                    </View>
                                )
                            }
                        </AnimatedCircularProgress>
                    </View>
                </Container>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16
    },
    stepTextLeft: {
        flex: 1,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#BBBBBB',
        textAlign: 'left'
    },
    stepTextRight: {
        flex: 1,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#BBBBBB',
        textAlign: 'right'
    },
    progressIndicator: {
        flex: 1
    },
    description1: {
        marginTop: 48,
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#4F4C57',
        textAlign: 'center'
    },
    description2: {
        marginTop: 4,
        marginBottom: 32,
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#3E3750',
        textAlign: 'center',
        textDecorationLine: 'underline',
        textDecorationColor: '#30D87C'
    },
    progressViewContainer: {
        flex: 1,
        alignItems: 'center'
    },
    progressView: {
        borderRadius: progressViewSize,
        borderWidth: 1.5,
        borderColor: '#EEEFF1'
    },
    progressViewChildrenContainer: {
        borderWidth: 1.5,
        borderColor: '#EEEFF1'
    },
    progressViewChildrenInnerContainer: {
        flex: 1,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressImage: {
        flex: 1,
        width: null,
        height: 132,
        aspectRatio: 516 / 456,
        resizeMode: 'contain'
    },
    processingText: {
        marginTop: 16,
        fontFamily: 'Poppins',
        fontSize: 12,
        fontWeight: "500",
        color: '#3E3750',
        textAlign: 'center'
    },
    progressTextContainer: {
        flexDirection: 'row'
    },
    progressText: {
        width: 68,
        textAlign: 'right',
        fontFamily: 'Poppins-Bold',
        fontSize: 40,
        color: '#3E3750',
        textAlign: 'center'
    },
    progressUnit: {
        marginTop: 8,
        fontFamily: 'Poppins',
        fontSize: 15,
        color: '#B4B3B6',
        textAlign: 'center'
    }
});

PrepareWorkoutPlanScreen.navigationOptions = () => ({
    title: I18n.t('prepareWorkoutPlan.title')
});

export default PrepareWorkoutPlanScreen;
