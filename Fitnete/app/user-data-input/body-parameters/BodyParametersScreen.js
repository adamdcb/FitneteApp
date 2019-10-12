import React from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import I18n from '../../utils/i18n/I18n';
import Container from '../../utils/components/Container';
import ProgressIndicator from '../../utils/components/ProgressIndicator';
import Button from '../../utils/components/Button';
import { push, Route } from '../../utils/navigation/NavigationService';
import BodyParametersPresenter from './BodyParametersPresenter';
import FNIcon from '../../utils/components/FNIcon';
import FNPicker from '../../utils/components/FNPicker';

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
        this._renderItemSeparator = this._renderItemSeparator.bind(this);
        this._renderPicker = this._renderPicker.bind(this);
        this._onPress = this._onPress.bind(this);
        this._onDismissPicker = this._onDismissPicker.bind(this);
        this._onSave = this._onSave.bind(this);
        this._onSelectUnit = this._onSelectUnit.bind(this);
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

    setData(data, dismissPicker = true) {
        const { selectedItem } = this.state;
        this.setState({
            data,
            selectedItem: !dismissPicker && selectedItem ? data.find(item => item.id === selectedItem.id) : null
        });
    }

    getLoadingView() {
        return (
            <SafeAreaView style={styles.container}>
                <Container />
            </SafeAreaView>
        );
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

    _onSave(values, units) {
        this.presenter.didSaveBodyParam(this.state.selectedItem, values);
    }

    _onSelectUnit(unit) {
        this.presenter.didSelectUnit(this.state.selectedItem, unit);
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
            <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={() => this._onPress(item)}
            >
                <Text style={styles.addButtonText}>{I18n.t('bodyParameters.add')}</Text>
                <View style={styles.addButton}>
                    <Text style={styles.addButtonPlus}>{'\uff0b'}</Text>
                </View>
            </TouchableOpacity>
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

    _renderItemSeparator() {
        return (
            <View style={{
                height: 1,
                backgroundColor: '#EEEFF1'
            }} />
        )
    }

    _renderPicker() {
        const { selectedItem } = this.state;
        if (!selectedItem) {
            return null;
        }

        return (<FNPicker
            visible={selectedItem !== null}
            data={selectedItem}
            units={selectedItem.units}
            selectedValuesIndexes={selectedItem.valueComponents}
            selectedUnitIndex={selectedItem.unitIndex}
            separator={selectedItem.separator}
            saveButtonTitle={I18n.t('save')}
            onDismiss={this._onDismissPicker}
            onSave={this._onSave}
            onSelectUnit={this._onSelectUnit}
        />)
    }

    render() {
        const { data } = this.state;
        if (!data) {
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
                        {I18n.t('bodyParameters.description')}
                    </Text>
                    <FlatList
                        style={{ flex: 1, marginTop: 40 }}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={this._renderItem}
                        ItemSeparatorComponent={this._renderItemSeparator}
                    />
                    <View style={styles.bottomContainer}>
                        <Button
                            title={I18n.t('dataCollection.continue')}
                            onPress={this.onContinue}
                        />
                    </View>
                    {this._renderPicker()}
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
        color: '#08C757'
    },
    addButton: {
        height: 28,
        width: 28,
        borderRadius: 4,
        backgroundColor: '#08C757',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        // elevation: 3,
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
