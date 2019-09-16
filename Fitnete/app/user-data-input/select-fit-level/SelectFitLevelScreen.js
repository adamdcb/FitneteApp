import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Slider from 'react-native-slider-custom';

import I18n from '../../utils/i18n/I18n';
import Container from '../../utils/components/Container';
import ProgressIndicator from '../../utils/components/ProgressIndicator';
import Button from '../../utils/components/Button';
import { push, Route } from '../../utils/navigation/NavigationService';
import DotSlider from '../../utils/components/DotSlider';
import SelectFitLevelPresenter from './SelectFitLevelPresenter';

class SelectFitLevelScreen extends React.Component {
    constructor(props) {
        super(props);
        this.presenter = new SelectFitLevelPresenter(this);
        this.state = {
            level: null,
            levelCount: 0,
            levelIndex: -1
        };
        this.onSliderValueChange = this.onSliderValueChange.bind(this);
        this.onContinue = this.onContinue.bind(this);
    }

    componentDidMount() {
        this.presenter.loadData();
    }

    componentWillUnmount() {
        this.presenter.unmountView();
    }

    onSliderValueChange(value) {
        this.presenter.didChangeLevel(value);
    }

    onContinue() {
        push(Route.WaterTracker);
    }

    setFitnessLevelData(level, count, index) {
        this.setState({
            level,
            levelCount: count,
            levelIndex: index
        })
    }

    getLoadingView() {
        return (
            <SafeAreaView style={styles.container}>
                <Container />
            </SafeAreaView>
        );
    }

    getLevelDescription(level) {
        const highlightStartIndex = level.description.indexOf(level.descriptionHighlight);
        return (
            <Text style={styles.fitnessLevelDescription}>
                {level.description.substring(0, highlightStartIndex)}
                <Text style={styles.fitnessLevelDescriptionHighlight}>{level.descriptionHighlight}</Text>
                {level.description.substring(highlightStartIndex + level.descriptionHighlight.length)}
            </Text>
        )
    }

    render() {
        const { level } = this.state;
        if (!level) {
            return this.getLoadingView();
        }
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
                    <Text style={styles.description}>
                        {I18n.t('selectFitLevel.description')}
                    </Text>
                    <View style={styles.fitnessContainer}>
                        <View style={styles.fitnessLevelView}>
                            <View style={styles.fitnessLevelImage}>

                            </View>
                            <Text style={styles.fitnessLevelTitle}>
                                {level.title}
                            </Text>
                            {this.getLevelDescription(level)}
                        </View>
                    </View>
                    <View>
                        <Slider
                            style={styles.slider}
                            trackStyle={styles.sliderTrack}
                            minimumValue={0}
                            maximumValue={this.state.levelCount - 1}
                            step={1}
                            value={this.state.levelIndex}
                            onValueChange={this.onSliderValueChange}
                            minimumTrackTintColor={'transparent'}
                            customMinimumTrack={(
                                <View style={styles.sliderCustomMinimumTrack}>
                                    <DotSlider
                                        style={styles.sliderCustomMinimumTrackSliderView}
                                        count={this.state.levelIndex + 1}
                                        activeIndex={this.state.levelIndex}
                                    />
                                </View>
                            )}
                            maximumTrackTintColor={'transparent'}
                            customMaximumTrack={(
                                <View style={styles.sliderCustomMaximumTrack}>
                                    <DotSlider
                                        style={styles.sliderCustomMaximumTrackSliderView}
                                        count={this.state.levelCount}
                                        activeIndex={this.state.levelIndex}
                                    />
                                </View>
                            )}
                            customThumb={(
                                <View style={styles.sliderThumbOuterContainer}>
                                    <View style={styles.sliderThumb} />
                                </View>
                            )}
                            thumbTouchSize={{
                                width: 64,
                                height: 64
                            }}
                        />
                        <Text style={styles.sliderDescription}>
                            {I18n.t('selectFitLevel.sliderDescription')}
                        </Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <Button
                            title={I18n.t('dataCollection.continue')}
                            onPress={this.onContinue}
                        />
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
    description: {
        marginTop: 48,
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#4F4C57',
        textAlign: 'center'
    },
    fitnessContainer: {
        marginVertical: 24
    },
    fitnessLevelView: {
        paddingVertical: 24,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#EEEFF1',
        alignItems: 'center'
    },
    fitnessLevelImage: {
        height: 126,
        width: 187,
        backgroundColor: '#F2F2F2'
    },
    fitnessLevelTitle: {
        marginTop: 16,
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#4F4C57',
        textAlign: 'center'
    },
    fitnessLevelDescription: {
        marginTop: 4,
        fontFamily: 'Poppins',
        fontSize: 15,
        color: '#4F4C57',
        textAlign: 'center'
    },
    fitnessLevelDescriptionHighlight: {
        marginTop: 4,
        fontFamily: 'Poppins',
        fontSize: 15,
        color: '#08C757',
        textAlign: 'center'
    },
    bottomContainer: {
        flex: 1,
        marginBottom: 16,
        justifyContent: 'flex-end'
    },
    slider: {
        marginTop: -4,
    },
    sliderTrack: {
        height: 32
    },
    sliderCustomMinimumTrack: {
        flex: 1,
        paddingHorizontal: 8
    },
    sliderCustomMinimumTrackSliderView: {
        flex: 1,
        marginRight: -16
    },
    sliderCustomMaximumTrack: {
        flex: 1,
        paddingHorizontal: 8
    },
    sliderCustomMaximumTrackSliderView: {
        flex: 1
    },
    sliderThumbOuterContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DBDBDE',
        height: 32,
        width: 32,
        borderRadius: 16
    },
    sliderThumb: {
        backgroundColor: '#08C757',
        height: 20,
        width: 20,
        borderRadius: 10
    },
    sliderDescription: {
        marginTop: 24,
        fontFamily: 'Poppins',
        fontSize: 15,
        color: '#B4B3B6',
        textAlign: 'center'
    }
});

SelectFitLevelScreen.navigationOptions = () => ({
    title: I18n.t('selectFitLevel.title')
});

export default SelectFitLevelScreen;
