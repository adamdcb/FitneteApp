import React from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import I18n from '../../utils/i18n/I18n';
import Container from '../../utils/components/Container';
import ProgressIndicator from '../../utils/components/ProgressIndicator';
import Button from '../../utils/components/Button';
import { push, Route } from '../../utils/navigation/NavigationService';
import BodyParametersPresenter from './BodyParametersPresenter';
import FNIcon from '../../utils/components/FNIcon';

class BodyParametersScreen extends React.Component {
    constructor(props) {
        super(props);
        this.presenter = new BodyParametersPresenter(this);
        this.state = {
            data: null
        };
        this.onContinue = this.onContinue.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this._renderItemSeparator = this._renderItemSeparator.bind(this);
        this._onPress = this._onPress.bind(this);
    }

    componentDidMount() {
        this.presenter.loadData();
    }

    componentWillUnmount() {
        this.presenter.unmountView();
    }

    onContinue() {
        push(Route.WaterTracker);
    }

    setData(data) {
        this.setState({
            data
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

    }

    _renderItem({ item }) {
        const RigthView = !item.value ? this._renderAddButton() : this._renderValue(item.value, item.unit)
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

    _renderAddButton() {
        return (
            <TouchableOpacity style={styles.addButtonContainer}>
                <Text style={styles.addButtonText}>{I18n.t('bodyParameters.add')}</Text>
                <View style={styles.addButton}>
                    <Text style={styles.addButtonPlus}>{'\uff0b'}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _renderValue(value, unit) {
        return (
            <View style={styles.listItemInnerContainer}>
                <Text style={styles.listItemValue}>{`${value} ${unit}`}</Text>
                <TouchableOpacity style={styles.listItemIconContainer}>
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

    render() {
        const { data } = this.state;
        if (!data) {
            return this.getLoadingView();
        }
        console.log(data);
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
        elevation: 3,
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
        marginRight: 4,
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#B4B3B6',
        textAlign: 'center'
    },
    bottomContainer: {
        flex: 1,
        marginBottom: 16,
        justifyContent: 'flex-end'
    },
});

BodyParametersScreen.navigationOptions = () => ({
    title: I18n.t('bodyParameters.title')
});

export default BodyParametersScreen;
