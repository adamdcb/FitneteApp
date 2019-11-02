import React from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';

import Container from '../utils/components/Container';
import Button from '../utils/components/Button';
import { Route, navigate } from '../utils/navigation/NavigationService';
import I18n from '../utils/i18n/I18n';
import TrainingPresenter from './TrainingPresenter';

const SLIDER_ITEM_WIDTH_COEFF = 0.8;
const CIRCLE_SIZE_COEFF = 6;
const SLIDER_ITEM_MARGIN = 4;
const SLIDER_ITEM_TOP_VIEW_HEIGHT = 216;

class TrainingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenWidth: Dimensions.get('window').width,
            programs: null
        };
        this.slideIndex = 0;
        this.presenter = new TrainingPresenter(this);
        this._renderItem = this._renderItem.bind(this);
        this._openProgram = this._openProgram.bind(this);
        this._onSnapToItem = this._onSnapToItem.bind(this);
    }

    componentDidMount() {
        this.presenter.loadData();
    }

    componentWillUnmount() {
        this.presenter.unmountView();
    }

    setData(data) {
        this.setState({ programs: data });
    }

    _openProgram() {
        const { programs } = this.state;
        navigate(Route.DemoWorkoutIntro, { program: programs[this.slideIndex] });
    }

    _renderItem({ item, index }) {
        const { screenWidth } = this.state;
        const circleSize = CIRCLE_SIZE_COEFF * screenWidth;
        const topMargin = SLIDER_ITEM_TOP_VIEW_HEIGHT - circleSize;
        const leftMargin = -(CIRCLE_SIZE_COEFF - SLIDER_ITEM_WIDTH_COEFF) / 2 * screenWidth - SLIDER_ITEM_MARGIN;
        return (
            <View style={styles.sliderItemView}>
                <LinearGradient
                    style={styles.sliderItemBottomContaier}
                    locations={[0, 1]}
                    colors={['#0F7788', '#3E3750']}
                    angle={180}
                >
                    <View style={styles.sliderItemBottomInnerContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <View style={styles.statusOuterContainer}>
                            <View style={styles.statusContainer}>
                                <View style={styles.statusDurationContainer}>
                                    <Image
                                        style={styles.statusImage}
                                        source={{ uri: 'clock' }}
                                    />
                                    <Text style={styles.statusTitle}>{item.durationTitle}</Text>
                                    <Text style={styles.statusDetails}>{item.durationText}</Text>
                                </View>
                                <View style={styles.statusProgressContainer}>
                                    <Image
                                        style={styles.statusImage}
                                        source={{ uri: 'filter' }}
                                    />
                                    <Text style={styles.statusTitle}>{item.progressTitle}</Text>
                                    <Text style={styles.statusDetails}>{item.progressText}</Text>
                                </View>
                            </View>
                            <Button
                                style={{ paddingHorizontal: 16 }}
                                title={I18n.t('training.openProgram')}
                                onPress={this._openProgram}
                            />
                        </View>
                    </View>
                </LinearGradient>
                <View style={{
                    ...styles.sliderItemTopContaier,
                    top: topMargin,
                    left: leftMargin,
                    width: circleSize,
                    height: circleSize,
                    borderRadius: circleSize / 2
                }}>
                    <View style={{
                        padding: 16,
                        height: SLIDER_ITEM_TOP_VIEW_HEIGHT,
                        width: screenWidth * SLIDER_ITEM_WIDTH_COEFF
                    }}>
                        <View style={styles.sliderItemTopHeaderView}>
                            {item.newText ?
                                <Text style={styles.newText}>{item.newText}</Text>
                                : <View />}
                            <View style={styles.difficultyContainer}>
                                <Text style={styles.difficultyText}>{item.difficultyText}</Text>
                                <View style={styles.difficultyIcon}></View>
                            </View>
                        </View>
                        <Image
                            style={styles.slideImage}
                            source={{ uri: 'exercise_1' }}
                        />
                    </View>
                </View>
            </View>
        );
    }

    _onSnapToItem(slideIndex) {
        this.slideIndex = slideIndex;
    }

    getLoadingView() {
        return (
            <SafeAreaView style={styles.container}>
                <Container />
            </SafeAreaView>
        );
    }

    render() {
        const { programs } = this.state;
        if (programs === null) {
            return this.getLoadingView();
        }
        return (
            <SafeAreaView style={styles.container}>
                <Container>
                    <View style={styles.sliderContainer}>
                        <Carousel
                            removeClippedSubviews={false}
                            data={this.state.programs}
                            renderItem={this._renderItem}
                            sliderWidth={this.state.screenWidth}
                            itemWidth={this.state.screenWidth * SLIDER_ITEM_WIDTH_COEFF}
                            activeSlideAlignment='start'
                            inactiveSlideOpacity={0.34}
                            onSnapToItem={this._onSnapToItem}
                            slideStyle={styles.slideStyle}
                        />
                    </View>
                </Container>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4FA'
    },
    sliderContainer: {
        flex: 1,
        marginTop: 32,
        marginBottom: 40
    },
    sliderItemView: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden'
    },
    slideStyle: {
        margin: SLIDER_ITEM_MARGIN,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2
    },
    sliderItemTopContaier: {
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#FFFFFF',
        borderWidth: 1
    },
    sliderItemTopHeaderView: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    sliderItemBottomContaier: {
        flex: 1,
        padding: 16,
        marginTop: SLIDER_ITEM_TOP_VIEW_HEIGHT - 16
    },
    sliderItemBottomInnerContainer: {
        flex: 1
    },
    newText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        color: '#FFD338',
        fontWeight: "500"
    },
    difficultyContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    difficultyText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        color: '#30D87C'
    },
    difficultyIcon: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 6,
        backgroundColor: '#08C757'
    },
    slideImage: {
        alignSelf: 'center',
        marginTop: 16,
        width: 226,
        height: 167,
        resizeMode: 'contain'
    },
    title: {
        marginTop: 24,
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    description: {
        marginTop: 8,
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    statusOuterContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: 24
    },
    statusContainer: {
        flexDirection: 'row',
        marginBottom: 16
    },
    statusDurationContainer: {
        alignItems: 'center'
    },
    statusProgressContainer: {
        marginLeft: 24,
        alignItems: 'center'
    },
    statusImage: {
        marginBottom: 4,
        width: 16,
        height: 16,
        resizeMode: 'contain'
    },
    statusTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    statusDetails: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: '#FFFFFF',
        textAlign: 'center'
    }
});

TrainingScreen.navigationOptions = () => ({

});

export default TrainingScreen;