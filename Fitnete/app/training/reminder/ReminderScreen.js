import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';

import Button from '../../utils/components/Button';
import I18n from '../../utils/i18n/I18n';
import { popToTop } from '../../utils/navigation/NavigationService';
import Container from '../../utils/components/Container';
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
            time: '',
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

    showPermissionDeniedError() {
        Alert.alert(
            I18n.t('notification.permissionDeniedTitle'),
            I18n.t('notification.permissionDeniedMessage'),
            [{
                text: I18n.t('ok')
            }],
            {
                cancelable: true
            }
        );
    }

    onRemiderScheduled() {
        popToTop();
    }

    _continue() {
        this.presenter.addReminder();
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
        this.presenter.setSelectedTime(values);
        this._onDismissPicker();
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
                <CheckBox
                    active={selectedWeekdays.includes(item.id)}
                    onToggle={(active) => this.presenter.setWeekdaySelected(item.id, active)}
                />
                <Text style={styles.weekdayText}>{item.name}</Text>
            </View>
        )
    }

    _renderRepeatButton(type) {
        const { activeRepeatButton } = this.state;
        return (
            <TouchableOpacity
                style={[styles.repeatButtonContainer, activeRepeatButton === type ? styles.repeatButtonContainerActive : styles.repeatButtonContainerInactive]}
                onPress={() => this.presenter.setSelectedRepeat(type)}
            >
                <Text style={[styles.repeatButtonText, activeRepeatButton === type ? styles.repeatButtonTextActive : styles.repeatButtonTextInactive]}>{I18n.t(`workoutReminder.repeat.${type}`)}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        const { time } = this.state;
        return (
            <Container>
                <SafeAreaView style={styles.container}>
                    <View style={styles.topContainer}>
                        <Text style={styles.description}>{I18n.t('workoutReminder.description')}</Text>
                        <View style={styles.repeatButtons}>
                            {this._renderRepeatButton('once')}
                            {this._renderRepeatButton('week')}
                        </View>
                        <View style={styles.listViewContainer}>
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
                    </View>
                    <View style={styles.bottomContainer}>
                        <Button
                            title={I18n.t('workoutReminder.continue')}
                            onPress={this._continue}
                        />
                    </View>

                </SafeAreaView>
                {this._renderPicker()}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topContainer: {
        flex: 1
    },
    description: {
        marginTop: 24,
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
    listViewContainer: {
        marginTop: 12,
        maxHeight: 7 * (ROW_HEIGHT + ListViewItemSeparator.HEIGHT),
        flexGrow: 1
    },
    listView: {
        flex: 1
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
        justifyContent: 'space-between',
        marginBottom: 24
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
        marginBottom: 16,
        justifyContent: 'flex-end'
    }
});

ReminderScreen.navigationOptions = () => ({
    title: I18n.t('workoutReminder.title')
});

export default ReminderScreen;