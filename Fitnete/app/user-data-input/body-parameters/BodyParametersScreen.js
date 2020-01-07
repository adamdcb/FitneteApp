import React from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import ElevatedView from 'fiber-react-native-elevated-view';

import I18n from '../../utils/i18n/I18n';
import Container from '../../utils/components/Container';
import ProgressIndicator from '../../utils/components/ProgressIndicator';
import Button from '../../utils/components/Button';
import { push, Route } from '../../utils/navigation/NavigationService';
import BodyParametersPresenter from './BodyParametersPresenter';
import FNIcon from '../../utils/components/FNIcon';
import FNPicker from '../../utils/components/FNPicker';
import ListViewItemSeparator from '../../utils/components/ListViewItemSeparator';
import LoadingView from '../../utils/components/LoadingView';

class BodyParametersScreen extends React.Component {
    constructor(props) {
        super(props);
        this.presenter = new BodyParametersPresenter(this);
        this.state = {
            data: null,
            selectedItem: null
        };
        this.onContinue = this.onContinue.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this._renderPicker = this._renderPicker.bind(this);
        this._onPress = this._onPress.bind(this);
        this._onDismissPicker = this._onDismissPicker.bind(this);
        this._onSave = this._onSave.bind(this);
    }

    componentDidMount() {
        this.presenter.loadData();
    }

    componentWillUnmount() {
        this.presenter.unmountView();
    }

    onContinue() {
        push(Route.PrepareWorkoutPlan);
    }

    setData(data) {
        this.setState({
            data,
            selectedItem: null
        });
    }

    _onPress(item) {
        this.setState({
            selectedItem: item
        });
    }

    _onDismissPicker() {
        this.setState({
            selectedItem: null
        });
    }

    _onSave(values) {
        this.presenter.didSaveBodyParam(this.state.selectedItem, values);
    }

    _renderItem({ item }) {
        const RigthView = item.isDefaultValue ? this._renderAddButton(item) : this._renderValue(item)
        return (
            <View
                style={styles.listItemContainer}
            >
                <View style={styles.listItemInnerContainer}>
                    <View style={styles.listItemIconContainer}>
                        <FNIcon
                            name={item.iconName}
                            size={24}
                            color="#B4B3B6"
                        />
                    </View>
                    <Text style={styles.listItemTitle}>{item.title}</Text>
                </View>
                <View style={styles.listItemInnerContainer}>
                    {RigthView}
                </View>
            </View>
        )
    }

    _renderAddButton(item) {
        return (
            <View style={styles.addButtonContainer}>
                <Text style={styles.addButtonText}>{I18n.t('bodyParameters.add')}</Text>
                <ElevatedView
                    style={styles.addButton}
                    elevation={3}
                    feedbackEnabled
                    onPress={() => this._onPress(item)}
                >
                    <Text style={styles.addButtonPlus}>{'\uff0b'}</Text>
                </ElevatedView>
            </View>
        )
    }

    _renderValue(item) {
        return (
            <View style={styles.listItemInnerContainer}>
                <Text style={styles.listItemValue}>{`${item.displayValue}`}</Text>
                <TouchableOpacity
                    style={styles.listItemIconContainer}
                    onPress={() => this._onPress(item)}
                >
                    <FNIcon
                        name="settings-outline"
                        size={20}
                        color="#B4B3B6"
                    />
                </TouchableOpacity>
            </View>
        )
    }

    _renderPicker() {
        const { selectedItem } = this.state;
        if (!selectedItem) {
            return null;
        }

        return (<FNPicker
            visible={selectedItem !== null}
            title={selectedItem.title}
            columns={selectedItem.datasets}
            columnLabels={selectedItem.labels}
            initialScrollIndexes={selectedItem.valueComponents}
            saveButtonTitle={I18n.t('save')}
            onDismiss={this._onDismissPicker}
            onSave={this._onSave}
        />)
    }

    render() {
        const { data } = this.state;
        if (!data) {
            return (<LoadingView />);
        }
        const { step, stepsTotal } = this.props.navigation.state.params;
        return (
            <Container>
                <SafeAreaView style={styles.container}>
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
                        {I18n.t('bodyParameters.description')}
                    </Text>
                    <FlatList
                        style={{ flex: 1, marginTop: 40 }}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={this._renderItem}
                        ItemSeparatorComponent={ListViewItemSeparator}
                    />
                    <View style={styles.bottomContainer}>
                        <Button
                            title={I18n.t('dataCollection.continue')}
                            disabled={!data.hasSelectedBodyParams}
                            onPress={this.onContinue}
                        />
                    </View>
                    {this._renderPicker()}
                </SafeAreaView>
            </Container>
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
    listItemContainer: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    listItemInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listItemIconContainer: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listItemTitle: {
        marginLeft: 8,
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#4F4C57'
    },
    addButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    addButtonText: {
        marginRight: 4,
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#08C757',
        includeFontPadding: false
    },
    addButton: {
        height: 28,
        width: 28,
        borderRadius: 4,
        backgroundColor: '#08C757',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addButtonPlus: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    listItemValue: {
        marginRight: 8,
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#B4B3B6',
        textAlign: 'center'
    },
    bottomContainer: {
        marginBottom: 16,
        justifyContent: 'flex-end'
    },
});

BodyParametersScreen.navigationOptions = () => ({
    title: I18n.t('bodyParameters.title')
});

export default BodyParametersScreen;
