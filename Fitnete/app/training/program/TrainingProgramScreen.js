import React from 'react';
import { SafeAreaView, ScrollView, Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';

import I18n from '../../utils/i18n/I18n';
import Button from '../../utils/components/Button';
import ButtonText from '../../utils/components/ButtonText';
import { Route, navigate } from '../../utils/navigation/NavigationService';

const SLIDER_ITEM_WIDTH_COEFF = 0.8;

class TrainingProgramScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenWidth: Dimensions.get('window').width
        };
        this.slideIndex = 0;
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

    }

    _renderItem({ item, index }) {
        const { program } = this.props.navigation.state.params;
        return (
            <View style={styles.sliderItemView}>
                <Image
                    style={styles.dayProgramImage}
                    source={{ uri: 'for_free' }}
                />
                <View style={styles.difficultyContainer}>
                    <Text style={styles.difficultyText}>{program.difficultyText}</Text>
                    <View style={styles.difficultyIcon} />
                </View>
                <Text style={styles.dayProgramTitle}>{item.title}</Text>
                <Text style={styles.dayProgramDescription} numberOfLines={3}>{item.description}</Text>
                <View style={styles.dayProgramOuterContainer}>
                    <View style={styles.dayProgramContainer}>
                        <Image
                            style={styles.dayStatusImage}
                            source={{ uri: 'clock' }}
                        />
                        <Text style={styles.dayStatusTitle}>{item.durationTitle}</Text>
                        <Text style={styles.dayStatusDetails}>{item.durationText}</Text>
                    </View>
                    <View style={styles.dayProgramContainer}>
                        <Image
                            style={styles.dayStatusImage}
                            source={{ uri: 'filter' }}
                        />
                        <Text style={styles.dayStatusTitle}>{item.repeatTitle}</Text>
                        <Text style={styles.dayStatusDetails}>{item.repeatText}</Text>
                    </View>
                    <View style={styles.dayProgramContainer}>
                        <Image
                            style={styles.dayStatusImage}
                            source={{ uri: 'filter' }}
                        />
                        <Text style={styles.dayStatusTitle}>{item.gearTitle}</Text>
                        <Text style={styles.dayStatusDetails}>{item.gearText}</Text>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <Button
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
            </View>
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
                                    <Image
                                        style={styles.statusImage}
                                        source={{ uri: 'clock' }}
                                    />
                                    <Text style={styles.statusDetails}>{program.durationText}</Text>
                                </View>
                                <View style={styles.statusContainer}>
                                    <Image
                                        style={styles.statusImage}
                                        source={{ uri: 'filter' }}
                                    />
                                    <Text style={styles.statusDetails}>{program.progressText}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.sliderContainer}>
                            <Carousel
                                removeClippedSubviews={false}
                                data={program.workouts}
                                renderItem={this._renderItem}
                                sliderWidth={this.state.screenWidth}
                                itemWidth={this.state.screenWidth * SLIDER_ITEM_WIDTH_COEFF}
                                activeSlideAlignment='start'
                                inactiveSlideOpacity={0.34}
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
    sliderItemView: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
    },
    slideStyle: {
        margin: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2
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
        marginRight: 4,
        width: 16,
        height: 16,
        resizeMode: 'contain'
    },
    statusDetails: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    dayProgramTitle: {
        marginHorizontal: 16,
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#3E3750',
        textAlign: 'left'
    },
    dayProgramDescription: {
        marginTop: 8,
        marginHorizontal: 16,
        marginBottom: 24,
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#3E3750',
        textAlign: 'left'
    },
    dayProgramImage: {
        width: null,
        height: 168,
        resizeMode: 'contain'
    },
    difficultyContainer: {
        alignSelf: 'flex-end',
        marginRight: 16,
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
    dayProgramOuterContainer: {
        marginTop: 24,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    dayProgramContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    dayStatusImage: {
        marginBottom: 4,
        width: 16,
        height: 16,
        resizeMode: 'contain'
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

});

export default TrainingProgramScreen;