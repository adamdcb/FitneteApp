import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Slider from 'react-native-slider-custom';
import LinearGradient from 'react-native-linear-gradient';

import { headerHeight } from '../utils/navigation/NavigationService';
import I18n from '../utils/i18n/I18n';
import Container from '../utils/components/Container';

const SLIDER_STEP_SIZE = 100;

class WaterTrackerScreen extends React.Component {
    constructor(props) {
        super(props);
        // this.presenter = new AppIntroPresenter(this);
        this.state = {
            value: 0,
            minimumValue: 0,
            maximumValue: 2500
        };
        this.onSliderValueChange = this.onSliderValueChange.bind(this);
    }

    onSliderValueChange(value) {
        this.setState({ value });
    }

    render() {
        const { minimumValue, maximumValue } = this.state;
        return (
            <Container
                locations={[0, 0.5, 1]}
                colors={['#CEF9FC', '#ECFFFA', '#FFFFFF']}
            >
                <SafeAreaView style={styles.container}>
                    <Text style={styles.title}>
                        {I18n.t('waterTracker.title')}
                    </Text>
                    <View style={styles.waterIntakeContainer}>
                        <View>
                            <Text style={[styles.waterIntakeValue, styles.leftText]}>
                                1.5 L
                            </Text>
                            <Text style={[styles.waterIntakeDescription, styles.leftText]}>
                                {I18n.t('waterTracker.totalWaterIntaker')}
                            </Text>
                        </View>
                        <View style={styles.waterIntakeImage}>

                        </View>
                        <View>
                            <Text style={[styles.waterIntakeValue, styles.rightText]}>
                                2
                            </Text>
                            <Text style={[styles.waterIntakeDescription, styles.rightText]}>
                                {I18n.t('waterTracker.completedGoals')}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.sliderOuterContainer}>
                        <View
                            style={styles.sliderInnerContainer}
                        >
                            <LinearGradient
                                style={styles.sliderBackgroundView}
                                colors={['#A0F8FF', '#FAFAFA']}
                                useAngle
                                angle={90}
                                angleCenter={{ x: 0.5, y: 0.5 }}
                            />

                            <Slider
                                style={styles.slider}
                                trackStyle={styles.sliderTrack}
                                minimumValue={minimumValue}
                                maximumValue={maximumValue}
                                step={SLIDER_STEP_SIZE}
                                value={this.state.value}
                                onValueChange={this.onSliderValueChange}
                                minimumTrackTintColor={'transparent'}
                                customMinimumTrack={(
                                    <LinearGradient
                                        style={styles.sliderCustomMinimumTrack}
                                        colors={['#09D4E3', '#13B6D1']}
                                        useAngle
                                        angle={135}
                                        angleCenter={{ x: 0.5, y: 0.5 }}
                                    />
                                )}
                                maximumTrackTintColor={'transparent'}
                                customThumb={(
                                    <View style={styles.sliderThumbContainer}>
                                        <View style={styles.sliderThumbLine} />
                                        <View style={styles.sliderThumbTriangle} />
                                    </View>
                                )}
                                thumbTouchSize={{
                                    width: 64,
                                    height: 128
                                }}
                            />
                            <View
                                style={styles.sliderTickContainer}
                                pointerEvents="none"
                            >
                                <View style={styles.sliderTick} />
                                <View style={styles.sliderTick} />
                                <View style={styles.sliderTick} />
                                <View style={styles.sliderTick} />
                            </View>
                        </View>
                    </View>
                    <Text>{this.state.value}</Text>
                    <Text style={styles.sliderInfo} >
                        {I18n.t('waterTracker.sliderInfo')}
                    </Text>
                    <View style={styles.bottomContainer}>
                        <View style={styles.goToWorkoutsContainer}>
                            <View style={styles.divider} />
                            <TouchableOpacity>
                                <Text style={styles.goToWorkoutsLink}>
                                    {I18n.t('waterTracker.goToWorkouts') + '  \u2192'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        marginTop: headerHeight()
    },
    title: {
        marginTop: 88,
        height: 28,
        color: '#3E3750',
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
        fontSize: 15,
        fontWeight: "bold"
    },
    waterIntakeDescription: {
        width: 69,
        color: '#B4B3B6',
        fontSize: 12
    },
    waterIntakeImage: {
        height: 183,
        width: 183,
        marginTop: 8,
        borderRadius: 91.5,
        borderWidth: 1,
        borderColor: '#30D87C'
    },
    rightText: {
        textAlign: 'right'
    },
    leftText: {
        textAlign: 'left'
    },
    sliderOuterContainer: {
        marginTop: 40,
        height: 72,
        justifyContent: 'flex-end'
    },
    sliderInnerContainer: {
        height: 32,
        flexDirection: 'row',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    sliderBackgroundView: {
        width: '100%',
        height: 32,
        borderRadius: 8,
        position: 'absolute'
    },
    slider: {
        flex: 1,
        marginTop: -4
    },
    sliderTrack: {
        height: 32
    },
    sliderCustomMinimumTrack: {
        flex: 1,
        borderRadius: 4
    },
    sliderThumbContainer: {
        height: 72,
        marginBottom: 20
    },
    sliderThumbLine: {
        height: 62,
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
    sliderTickContainer: {
        width: '100%',
        flexDirection: 'row',
        height: 32,
        justifyContent: 'space-evenly',
        position: 'absolute'
    },
    sliderTick: {
        height: 32,
        width: 1,
        backgroundColor: '#00000016'
    },
    sliderInfo: {
        marginTop: 16,
        color: '#4F4C57',
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
        flexDirection: 'row'
    },
    goToWorkoutsLink: {
        color: '#0F7788',
        fontSize: 15,
        textAlign: "center",
        marginRight: 8
    }
});

export default WaterTrackerScreen;