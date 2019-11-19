import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import Slider from 'react-native-slider-custom';
import LinearGradient from 'react-native-linear-gradient';

import { HEADER_STYLE, navigate, Route } from '../utils/navigation/NavigationService';
import I18n from '../utils/i18n/I18n';
import Container from '../utils/components/Container';
import FNIcon from '../utils/components/FNIcon';
import WaterTrackerPresenter from './WaterTrackerPresenter';

class WaterTrackerScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageWidth: Dimensions.get('window').width
        };
        this.presenter = new WaterTrackerPresenter(this);
        this.onSliderValueChange = this.onSliderValueChange.bind(this);
        this.goToWorkouts = this.goToWorkouts.bind(this);
        this.drinkWater = this.drinkWater.bind(this);
    }

    componentDidMount() {
        this.presenter.loadData();
    }

    componentWillUnmount() {
        this.presenter.unmountView();
    }

    setData(data) {
        this.setState({ ...data });
    }

    onSliderValueChange(value) {
        this.presenter.updateDrinkSize(value);
    }

    drinkWater() {
        this.presenter.drinkWater();
    }

    goToWorkouts() {
        navigate(Route.MainApp);
    }

    render() {
        const { drinkSize = 0,
            drinkSizeText = '',
            drinkStepSize = 0,
            totalWaterIntake = 0,
            customDrinkSizeBounds = {},
            goals = 0,
            pageWidth
        } = this.state;
        const waterTrackerImageMaxWidth = (pageWidth - 40) * 0.42;
        const { showWorkoutsLink } = this.props.navigation.state.params;
        return (
            <SafeAreaView style={styles.container}>
                <Container
                    locations={[0, 0.5, 1]}
                    colors={['#CEF9FC', '#ECFFFA', '#FFFFFF']}
                >
                    <Text style={styles.title}>
                        {I18n.t('waterTracker.title')}
                    </Text>
                    <View style={styles.waterIntakeContainer}>
                        <View>
                            <Text style={[styles.waterIntakeValue, styles.leftText]}>
                                {totalWaterIntake}
                            </Text>
                            <Text style={[styles.waterIntakeDescription, styles.leftText]}>
                                {I18n.t('waterTracker.totalWaterIntaker')}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={this.drinkWater}
                        >
                            <Image
                                style={[styles.waterIntakeImage, {
                                    width: waterTrackerImageMaxWidth,
                                    height: waterTrackerImageMaxWidth
                                }]}
                                source={{ uri: 'daily_water' }}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text style={[styles.waterIntakeValue, styles.rightText]}>
                                {goals}
                            </Text>
                            <Text style={[styles.waterIntakeDescription, styles.rightText]}>
                                {I18n.t('waterTracker.completedGoals')}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.sliderOuterContainer}>
                        <View style={styles.sliderShadowContainer}>
                            <View style={styles.sliderShadowView} />
                        </View>
                        <View style={styles.sliderBackgroundContainer}>
                            <LinearGradient
                                style={styles.sliderBackgroundView}
                                colors={['#A0F8FF', '#FAFAFA']}
                                useAngle
                                angle={90}
                                angleCenter={{ x: 0.5, y: 0.5 }}
                                pointerEvents="none"
                            />
                        </View>
                        <Slider
                            style={styles.slider}
                            trackStyle={styles.sliderTrack}
                            minimumValue={customDrinkSizeBounds.min}
                            maximumValue={customDrinkSizeBounds.max}
                            step={drinkStepSize}
                            value={drinkSize}
                            onValueChange={this.onSliderValueChange}
                            minimumTrackTintColor={'transparent'}
                            customMinimumTrack={(
                                <View style={styles.sliderCustomMinimumTrackContainer}>
                                    <LinearGradient
                                        style={styles.sliderCustomMinimumTrack}
                                        colors={['#09D4E3', '#13B6D1']}
                                        useAngle
                                        angle={135}
                                        angleCenter={{ x: 0.5, y: 0.5 }}
                                    />
                                </View>
                            )}
                            maximumTrackTintColor={'transparent'}
                            customThumb={(
                                <View style={styles.sliderThumbOuterContainer}>
                                    <View style={styles.sliderThumbInnerContainer}>
                                        <View style={styles.sliderThumbLine} />
                                        <View style={styles.sliderThumbTriangle} />
                                    </View>
                                </View>
                            )}
                            thumbTouchSize={{
                                width: 64,
                                height: 128
                            }}
                        />
                        <View
                            style={styles.sliderTickOuterContainer}
                            pointerEvents="none"
                        >
                            <View style={styles.sliderTickInnerContainer}>
                                <View style={styles.sliderTick} />
                                <View style={styles.sliderTick} />
                                <View style={styles.sliderTick} />
                                <View style={styles.sliderTick} />
                            </View>
                        </View>
                    </View>
                    <Text style={styles.sliderInfo} >
                        {I18n.t('waterTracker.sliderInfo', { default_amount: drinkSizeText })}
                    </Text>
                    {
                        showWorkoutsLink ?
                            <View style={styles.bottomContainer}>
                                <View style={styles.goToWorkoutsContainer}>
                                    <View style={styles.divider} />
                                    <TouchableOpacity
                                        style={styles.goToWorkoutsLinkContainer}
                                        onPress={this.goToWorkouts}
                                    >
                                        <Text style={styles.goToWorkoutsLink}>
                                            {I18n.t('waterTracker.goToWorkouts')}
                                        </Text>
                                        <FNIcon
                                            name="arrow-right"
                                            color="#0F7788"
                                            size={11}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View> : null
                    }
                </Container>
            </SafeAreaView>
        );
    }
}

const SLIDER_HEIGHT = 32;
const SLIDER_PADDING = 10;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        marginTop: 48,
        color: '#3E3750',
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        fontWeight: "bold",
        textAlign: 'center'
    },
    waterIntakeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 24
    },
    waterIntakeValue: {
        height: 18,
        color: '#3E3750',
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        fontWeight: "bold"
    },
    waterIntakeDescription: {
        maxWidth: 72,
        color: '#B4B3B6',
        fontFamily: 'Poppins-Regular',
        fontSize: 12
    },
    waterIntakeImage: {
        aspectRatio: 516 / 456,
        resizeMode: 'contain'
    },
    rightText: {
        textAlign: 'right'
    },
    leftText: {
        textAlign: 'left'
    },
    sliderOuterContainer: {
        marginTop: 8,
        height: SLIDER_HEIGHT * 3,
        paddingBottom: SLIDER_HEIGHT / 2
    },
    sliderShadowContainer: {
        width: '100%',
        height: SLIDER_HEIGHT,
        top: SLIDER_HEIGHT * 1.5,
        position: 'absolute'
    },
    sliderShadowView: {
        flex: 1,
        marginHorizontal: SLIDER_PADDING,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    sliderBackgroundContainer: {
        width: '100%',
        height: SLIDER_HEIGHT,
        top: SLIDER_HEIGHT * 1.5,
        position: 'absolute',
        elevation: 4
    },
    sliderBackgroundView: {
        flex: 1,
        borderRadius: 8,
        marginHorizontal: SLIDER_PADDING
    },
    slider: {
        flex: 1,
        justifyContent: 'flex-end',
        elevation: 4
    },
    sliderTrack: {
        marginLeft: SLIDER_PADDING,
        height: SLIDER_HEIGHT
    },
    sliderCustomMinimumTrackContainer: {
        flex: 1,
        borderRadius: 8,
        overflow: 'hidden'
    },
    sliderCustomMinimumTrack: {
        flex: 1,
        marginRight: SLIDER_PADDING
    },
    sliderThumbOuterContainer: {
        height: SLIDER_HEIGHT * 2.25,
        marginHorizontal: SLIDER_PADDING
    },
    sliderThumbInnerContainer: {
        width: 10,
        height: SLIDER_HEIGHT * 2.25,
        position: 'absolute'
    },
    sliderThumbLine: {
        height: SLIDER_HEIGHT * 2.25,
        width: 2,
        backgroundColor: '#33D6E2'
    },
    sliderThumbTriangle: {
        width: 0,
        height: 0,
        position: 'absolute',
        marginLeft: -7,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderBottomWidth: 12,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#13B6D1',
        borderRadius: 4,
        transform: [
            { rotate: '180deg' }
        ]
    },
    sliderTickOuterContainer: {
        width: '100%',
        height: SLIDER_HEIGHT,
        top: SLIDER_HEIGHT * 1.5,
        position: 'absolute',
        elevation: 4
    },
    sliderTickInnerContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: SLIDER_PADDING,
        justifyContent: 'space-evenly'
    },
    sliderTick: {
        height: SLIDER_HEIGHT,
        width: 1,
        backgroundColor: '#00000016'
    },
    sliderInfo: {
        marginVertical: 16,
        color: '#4F4C57',
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        textAlign: "center"
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    goToWorkoutsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        height: 40
    },
    divider: {
        flex: 1,
        height: 2,
        marginTop: 2,
        marginRight: 24,
        backgroundColor: '#EEEFF1'
    },
    goToWorkoutsLinkContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    goToWorkoutsLink: {
        color: '#0F7788',
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        textAlign: "center",
        marginRight: 8
    }
});

WaterTrackerScreen.navigationOptions = () => ({
    headerStyle: {
        ...HEADER_STYLE,
        backgroundColor: '#CEF9FC'
    },
});

export default WaterTrackerScreen;