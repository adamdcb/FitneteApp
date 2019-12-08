import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

import Button from '../../utils/components/Button';
import I18n from '../../utils/i18n/I18n';
import { navigate, Route, HEADER_STYLE } from '../../utils/navigation/NavigationService';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '../../utils/components/CheckBox';
import ListViewItemSeparator from '../../utils/components/ListViewItemSeparator';
import FNIcon from '../../utils/components/FNIcon';
import FNPicker from '../../utils/components/FNPicker';
import ReminderPresenter from './ReminderPresenter';

const ROW_HEIGHT = 48;

class ReminderScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRepeatButton: '',
            selectedWeekdays: [],
            selectedTimeIndexes: [],
            isPickerVisible: false
        }
        this.presenter = new ReminderPresenter(this);
        this._renderItem = this._renderItem.bind(this);
        this._continue = this._continue.bind(this);
        this._changeTime = this._changeTime.bind(this);
        this._onDismissPicker = this._onDismissPicker.bind(this);
        this._onSaveTime = this._onSaveTime.bind(this);
    }

    componentDidMount() {
        this.presenter.getReminder();
    }

    componentWillUnmount() {
        this.presenter.unmountView();
    }

    setData(data) {
        this.setState({ ...data });
    }

    _continue() {
        navigate(Route.Training);
    }

    _changeTime() {
        this.setState({ isPickerVisible: true });
    }

    _onDismissPicker() {
        this.setState({
            isPickerVisible: false
        });
    }

    _onSaveTime(values) {
        this.presenter.addReminder(values);
    }

    _renderPicker() {
        const { isPickerVisible, selectedTimeIndexes } = this.state;
        if (!isPickerVisible) {
            return null;
        }
        return (<FNPicker
            visible={isPickerVisible}
            title={I18n.t('workoutReminder.reminderTime')}
            columns={[this.presenter.getHours(), this.presenter.getMinutes()]}
            columnLabels={[':', '']}
            initialScrollIndexes={selectedTimeIndexes}
            saveButtonTitle={I18n.t('save')}
            onDismiss={this._onDismissPicker}
            onSave={this._onSaveTime}
        />)
    }

    _renderItem({ item }) {
        const { selectedWeekdays } = this.state;
        return (
            <View style={styles.weekdayContainer}>
                <CheckBox active={selectedWeekdays.includes(item.id)} />
                <Text style={styles.weekdayText}>{item.name}</Text>
            </View>
        )
    }

    _renderRepeatButton(type) {
        const { activeRepeatButton } = this.state;
        return (
            <TouchableOpacity
                style={[styles.repeatButtonContainer, activeRepeatButton === type ? styles.repeatButtonContainerActive : styles.repeatButtonContainerInactive]}
                onPress={() => this.setState({ activeRepeatButton: type })}
            >
                <Text style={[styles.repeatButtonText, activeRepeatButton === type ? styles.repeatButtonTextActive : styles.repeatButtonTextInactive]}>{I18n.t(`workoutReminder.repeat.${type}`)}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        const { time } = this.state;
        return (
            <LinearGradient
                style={styles.container}
                colors={['#89F8AC3D', '#73F9E01A', '#FFFFFF00']}
                locations={[0, 0.45, 1]}
                angle={180}
                useAngle
            >
                <SafeAreaView style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.description}>{I18n.t('workoutReminder.description')}</Text>
                        <View style={styles.repeatButtons}>
                            {this._renderRepeatButton('once')}
                            {this._renderRepeatButton('weekly')}
                        </View>
                        <View>
                            <FlatList
                                style={styles.listView}
                                data={this.presenter.getWeekdays()}
                                keyExtractor={item => item}
                                renderItem={this._renderItem}
                                ItemSeparatorComponent={ListViewItemSeparator}
                                ListFooterComponent={ListViewItemSeparator}
                            />
                        </View>
                        <View style={styles.timeContainer}>
                            <Text style={styles.timeText}>{I18n.t('workoutReminder.time')}: <Text style={styles.timeValueText}>{time}</Text></Text>
                            <TouchableOpacity
                                onPress={this._changeTime}
                            >
                                <View style={styles.settingsButton}>
                                    <Text style={styles.changeText}>{I18n.t('workoutReminder.change')}</Text>
                                    <FNIcon
                                        name="settings-outline"
                                        size={18}
                                        color="#B4B3B6"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomContainer}>
                            <Button
                                title={I18n.t('workoutReminder.continue')}
                                onPress={this._continue}
                            />
                        </View>
                    </View>
                </SafeAreaView>
                {this._renderPicker()}
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        marginHorizontal: 20
    },
    description: {
        marginTop: 64,
        fontFamily: 'Poppins',
        fontSize: 15,
        color: '#4F4C57',
        textAlign: 'center'
    },
    repeatButtons: {
        flexDirection: 'row',
        height: 32,
        marginTop: 12
    },
    repeatButtonContainer: {
        flex: 1,
        borderRadius: 4,
        justifyContent: 'center'
    },
    repeatButtonContainerActive: {
        backgroundColor: '#3E3750'
    },
    repeatButtonContainerInactive: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E2E2'
    },
    repeatButtonText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        textAlign: 'center'
    },
    repeatButtonTextActive: {
        color: '#FFFFFF'
    },
    repeatButtonTextInactive: {
        color: '#3E3750'
    },
    listView: {
        marginTop: 12
    },
    weekdayContainer: {
        flexDirection: 'row',
        height: ROW_HEIGHT,
        alignItems: 'center'
    },
    weekdayText: {
        marginLeft: 8,
        fontFamily: 'Poppins',
        fontSize: 15,
        textAlign: 'center',
        color: '#4F4C57'
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: ROW_HEIGHT,
        justifyContent: 'space-between'
    },
    timeText: {
        fontFamily: 'Poppins',
        fontSize: 15,
        textAlign: 'center',
        color: '#4F4C57'
    },
    timeValueText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        textAlign: 'center',
        color: '#3E3750'
    },
    changeText: {
        fontFamily: 'Poppins',
        fontSize: 15,
        textAlign: 'center',
        color: '#B4B3B6',
        marginRight: 4
    },
    settingsButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottomContainer: {
        flex: 1,
        marginBottom: 16,
        justifyContent: 'flex-end'
    }
});

ReminderScreen.navigationOptions = () => ({
    title: I18n.t('workoutReminder.title'),
    headerStyle: {
        ...HEADER_STYLE,
        backgroundColor: '#89F8AC'
    }
});

export default ReminderScreen;