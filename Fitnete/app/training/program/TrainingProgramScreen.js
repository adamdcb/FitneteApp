import React from 'react';
import { SafeAreaView, ScrollView, Text, View, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import ElevatedView from 'fiber-react-native-elevated-view';
import MICIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import I18n from '../../utils/i18n/I18n';
import Button from '../../utils/components/Button';
import ButtonText from '../../utils/components/ButtonText';
import { Route, navigate } from '../../utils/navigation/NavigationService';
import FNIcon from '../../utils/components/FNIcon';

const SLIDER_ITEM_WIDTH_COEFF = 0.8;

class TrainingProgramScreen extends React.Component {
    constructor(props) {
        super(props);
        const { program } = this.props.navigation.state.params;
        this.state = {
            screenWidth: Dimensions.get('window').width
        };
        this.slideIndex = program.progress;
        this._renderItem = this._renderItem.bind(this);
        this._startWorkout = this._startWorkout.bind(this);
        this._showExerciseList = this._showExerciseList.bind(this);
        this._onSnapToItem = this._onSnapToItem.bind(this);
    }

    _startWorkout() {
        const { program } = this.props.navigation.state.params;
        navigate(Route.Countdown, { workout: program.workouts[this.slideIndex] });
    }

    _showExerciseList() {
        const { program } = this.props.navigation.state.params;
        navigate(Route.ExerciseList, {
            workout: program.workouts[this.slideIndex],
            programName: program.title
        });
    }

    _renderItem({ item, index }) {
        return (
            <ElevatedView
                style={styles.sliderItemView}
                elevation={2}
            >
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.imageBackground}
                        defaultSource={{ uri: item.background }}
                        source={{ uri: item.background }}
                    />
                    <Image
                        style={styles.dayProgramImage}
                        defaultSource={{ uri: item.image }}
                        source={{ uri: item.image }}
                    />
                </View>
                <View style={styles.difficultyContainer}>
                    <Text style={[styles.difficultyText, {
                        color: item.difficulty.color
                    }]}
                    >
                        {item.difficulty.text}
                    </Text>
                    <View style={[styles.difficultyIcon, {
                        backgroundColor: item.difficulty.color
                    }]} />
                </View>
                <View style={styles.dayProgramTitleContainer}>
                    <Text style={styles.dayProgramTitle}>{item.title}</Text>
                    {item.locked ?
                        <MICIcon
                            style={styles.lockIcon}
                            name="lock-outline"
                            size={24}
                            color="#000000"
                        /> : null
                    }
                </View>
                <View style={styles.dayProgramOuterContainer}>
                    <View style={styles.dayProgramContainer}>
                        <View style={styles.dayStatusImage}>
                            <FNIcon
                                name='filters'
                                size={18}
                                color="#008FA6"
                            />
                        </View>
                        <Text style={styles.dayStatusTitle}>{item.durationTitle}</Text>
                        <Text style={styles.dayStatusDetails}>{item.durationText}</Text>
                    </View>
                    <View style={styles.dayProgramContainer}>
                        <View style={styles.dayStatusImage}>
                            <FNIcon
                                name='clock'
                                size={18}
                                color="#008FA6"
                            />
                        </View>
                        <Text style={styles.dayStatusTitle}>{item.repeatTitle}</Text>
                        <Text style={styles.dayStatusDetails}>{item.repeatText}</Text>
                    </View>
                    <View style={styles.dayProgramContainer}>
                        <View style={styles.dayStatusImage}>
                            <FNIcon
                                name='note'
                                size={18}
                                color="#008FA6"
                            />
                        </View>
                        <Text style={styles.dayStatusTitle}>{item.gearTitle}</Text>
                        <Text style={styles.dayStatusDetails}>{item.gearText}</Text>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <Button
                        disabled={item.locked}
                        title={I18n.t('dayProgram.startWorkout')}
                        onPress={this._startWorkout}
                    />
                    <ButtonText
                        style={{ marginTop: 8 }}
                        title={I18n.t('dayProgram.showExerciseList')}
                        showArrow={false}
                        onPress={this._showExerciseList}
                    />
                </View>
            </ElevatedView>
        );
    }

    _onSnapToItem(slideIndex) {
        this.slideIndex = slideIndex;
    }

    render() {
        const { program } = this.props.navigation.state.params;
        return (
            <LinearGradient
                style={styles.container}
                colors={['#FFFFFF', '#94E4F1', '#0F7788', '#3E3750']}
                locations={[0, 0.2344, 0.6377, 1]}
                angle={335}
                start={{ x: 0.73, y: 0.5 }}
                end={{ x: 0.5, y: 0 }}
            >
                <SafeAreaView style={styles.container}>
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.scrollViewContentContainer}
                        bounces={false}
                    >
                        <View style={styles.headerContainer}>
                            <Text style={styles.title}>{program.title}</Text>
                            <View style={styles.statusOuterContainer}>
                                <View style={styles.statusContainer}>
                                    <View style={styles.statusImage}>
                                        <FNIcon
                                            name='clock'
                                            size={18}
                                            color="#08C757"
                                        />
                                    </View>
                                    <Text style={styles.statusDetails}>{program.durationText}</Text>
                                </View>
                                <View style={styles.statusContainer}>
                                    <View style={styles.statusImage}>
                                        <FNIcon
                                            name='filters'
                                            size={18}
                                            color="#08C757"
                                        />
                                    </View>
                                    <Text style={styles.statusDetails}>{program.progressText}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.sliderContainer}>
                            <Carousel
                                removeClippedSubviews={false}
                                data={program.workouts}
                                firstItem={program.progress}
                                renderItem={this._renderItem}
                                sliderWidth={this.state.screenWidth}
                                itemWidth={this.state.screenWidth * SLIDER_ITEM_WIDTH_COEFF}
                                activeSlideAlignment='start'
                                inactiveSlideOpacity={Platform.select({
                                    ios: 0.34,
                                    android: 1
                                })}
                                enableMomentum
                                shouldOptimizeUpdates
                                onSnapToItem={this._onSnapToItem}
                                slideStyle={styles.slideStyle}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20
    },
    scrollViewContentContainer: {
        flexGrow: 1
    },
    sliderContainer: {
        flex: 1,
        marginBottom: 8
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24
    },
    title: {
        flex: 1,
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        lineHeight: 28,
        color: '#FFFFFF'
    },
    imageContainer: {
        height: 168,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: 'hidden'
    },
    imageBackground: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    sliderItemView: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12
    },
    slideStyle: {
        padding: 4,
        overflow: Platform.select({
            ios: 'visible',
            android: 'hidden',
        })
    },
    statusOuterContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },
    statusContainer: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    statusImage: {
        marginRight: 4
    },
    statusDetails: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    dayProgramTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dayProgramTitle: {
        marginHorizontal: 16,
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#3E3750',
        textAlign: 'left'
    },
    dayProgramImage: {
        width: null,
        height: 168,
        resizeMode: 'contain'
    },
    lockIcon: {
        marginRight: 9,
        includeFontPadding: false
    },
    difficultyContainer: {
        marginTop: 8,
        marginRight: 16,
        flexDirection: 'row',
        alignItems: Platform.select({
            ios: 'baseline',
            android: 'center'
        }),
        justifyContent: 'flex-end'
    },
    difficultyText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        color: '#30D87C',
        textAlign: 'center',
        textAlignVertical: 'center',
        includeFontPadding: false
    },
    difficultyIcon: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 6
    },
    dayProgramOuterContainer: {
        marginTop: 24,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    dayProgramContainer: {
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    dayStatusImage: {
        marginBottom: 4
    },
    dayStatusTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#3E3750',
        textAlign: 'center'
    },
    dayStatusDetails: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: '#3E3750',
        textAlign: 'center'
    },
    bottomContainer: {
        flex: 1,
        margin: 16,
        justifyContent: 'flex-end'
    }
});

TrainingProgramScreen.navigationOptions = () => ({
    headerShown: false
});

export default TrainingProgramScreen;