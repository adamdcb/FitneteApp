import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import FNIcon from './FNIcon';
import Button from './Button';

const ROW_HEIGHT = 40;

class FNPicker extends React.Component {
    constructor(props) {
        super(props);
        const { selectedValuesIndexes, selectedUnitIndex, data, units = [] } = props;
        this.state = {
            selectedValuesIndexes: selectedValuesIndexes || Array.from({ length: data.datasets.length }, () => 0),
            selectedUnitIndex: selectedUnitIndex
        };
        this.onDismiss = this.onDismiss.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onSelectUnit = this.onSelectUnit.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
        this.getItemLayout = this.getItemLayout.bind(this);
    }

    onDismiss() {
        if (this.props.onDismiss) {
            this.props.onDismiss();
        }
    }

    onSave() {
        if (this.props.onSave) {
            const { selectedValuesIndexes, selectedUnitIndex } = this.state;
            this.props.onSave(selectedValuesIndexes, selectedUnitIndex);
        }
    }

    onSelectUnit(unitIndex) {
        this.setState({ selectedUnitIndex: unitIndex });
    }

    onMomentumScrollEnd(event, index) {
        const selectedValuesIndexes = [...this.state.selectedValuesIndexes];
        selectedValuesIndexes[index] = event.nativeEvent.contentOffset.y / ROW_HEIGHT;
        this.setState({ selectedValuesIndexes });
    }

    getItemLayout(data, index) {
        return {
            length: ROW_HEIGHT,
            offset: ROW_HEIGHT * index,
            index
        };
    }

    _renderDatasets(datasets) {
        const { selectedValuesIndexes } = this.state;
        const views = [];
        datasets.map((dataset, index) => {
            const parentIndex = index;
            if (index > 0 && this.props.separator) {
                const SeparatorView = <Text style={styles.separator} key={`${parentIndex}${this.props.separator}`}>{this.props.separator}</Text>;
                views.push(SeparatorView);
            }
            const ListView =
                <View
                    style={styles.listViewContainer}
                    key={`${parentIndex}${index}`}
                >
                    <FlatList
                        style={styles.listView}
                        data={dataset}
                        initialScrollIndex={selectedValuesIndexes[index]}
                        keyExtractor={(item, index) => `${parentIndex}${item}${index}`}
                        renderItem={this.renderItem}
                        showsVerticalScrollIndicator={false}
                        decelerationRate="fast"
                        snapToAlignment="center"
                        snapToInterval={ROW_HEIGHT}
                        onMomentumScrollEnd={(event) => this.onMomentumScrollEnd(event, index)}
                        getItemLayout={this.getItemLayout}
                    />
                    <View pointerEvents="none" style={styles.listIndicatorTopBorder}></View>
                    <View pointerEvents="none" style={styles.listIndicatorBottomBorder}></View>
                </View>;
            views.push(ListView);
        })
        return views;
    }

    _renderUnits(units) {
        if (!units) {
            return null;
        }
        const { selectedUnitIndex } = this.state;
        return units.map((unit, index) => (
            <TouchableOpacity
                style={index === selectedUnitIndex ? styles.unitButtonActive : styles.unitButton}
                key={`${unit}${index}`}
                onPress={() => this.onSelectUnit(index)}
            >
                <View style={styles.unitButtonInnerContainer}>
                    <FNIcon
                        size={12}
                        name="check"
                        color="#FFFFFF"
                    />
                    <Text style={index === selectedUnitIndex ? styles.unitTextActive : styles.unitText}>{unit}</Text>
                </View>
            </TouchableOpacity>
        ))
    }

    renderItem({ item }) {
        const value = (item === -1 || item === '') ? '' : item;
        return (
            <View style={styles.rowItem}>
                <Text>{value}</Text>
            </View>
        )
    }

    render() {
        const { visible, data, units } = this.props;
        if (!visible) {
            return null;
        }
        return (
            <Modal
                isVisible={this.props.visible}
                backdropOpacity={0.64}
                onBackdropPress={this.onDismiss}
                hideModalContentWhileAnimating
                propagateSwipe
            >
                <View style={styles.modalContainer} >
                    <TouchableOpacity
                        style={styles.closeButtonContainer}
                        onPress={this.onDismiss}
                    >
                        <FNIcon
                            name="close"
                            size={20}
                            color="#000000"
                        />
                    </TouchableOpacity>
                    <View style={styles.modalInnerContainer}>
                        <View style={styles.modalView}>
                            <Text style={styles.title}>{data.title || ''}</Text>
                            <View style={styles.unitContainer}>
                                {this._renderUnits(units)}
                            </View>
                            <View style={styles.listViewOuterContainer}>
                                {this._renderDatasets(data.datasets)}
                                <View pointerEvents="none" style={styles.listInactiveItemTop}></View>
                                <View pointerEvents="none" style={styles.listInactiveItemBottom}></View>
                            </View>
                            <View style={styles.bottomContainer}>
                                <Button
                                    title={this.props.saveButtonTitle || 'Save'}
                                    onPress={this.onSave}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };
}

const styles = StyleSheet.create({
    title: {
        marginTop: 24,
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        color: '#3E3750',
        textAlign: 'center'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalInnerContainer: {
        marginHorizontal: 4,
        flexDirection: 'row'
    },
    modalView: {
        flex: 1,
        borderRadius: 16,
        backgroundColor: '#FFFFFF'
    },
    closeButtonContainer: {
        alignSelf: "flex-end",
        width: 24,
        height: 24,
        marginBottom: 16,
        marginRight: 8
    },
    unitContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
        marginHorizontal: 40
    },
    unitButton: {
        flex: 1,
        height: 32,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#E2E2E2'
    },
    unitButtonActive: {
        flex: 1,
        height: 32,
        borderRadius: 4,
        backgroundColor: '#3E3750'
    },
    unitButtonInnerContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 16,
        alignItems: 'center'
    },
    unitText: {
        flex: 1,
        marginRight: 16,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        color: '#3E3750',
        textAlign: 'center'
    },
    unitTextActive: {
        flex: 1,
        marginRight: 16,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    rowItem: {
        flex: 1,
        height: ROW_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center'
    },
    separator: {
        width: 16,
        color: '#08C757',
        textAlign: 'center'
    },
    listViewOuterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 24,
        marginHorizontal: 40
    },
    listViewContainer: {
        flex: 1,
        height: 3 * ROW_HEIGHT
    },
    listView: {
        height: 3 * ROW_HEIGHT
    },
    listIndicatorTopBorder: {
        position: 'absolute',
        width: '100%',
        height: 1,
        top: ROW_HEIGHT - 1,
        backgroundColor: '#08C757'
    },
    listIndicatorBottomBorder: {
        position: 'absolute',
        width: '100%',
        height: 1,
        top: 2 * ROW_HEIGHT,
        backgroundColor: '#08C757'
    },
    listInactiveItemTop: {
        position: 'absolute',
        width: '100%',
        height: ROW_HEIGHT - 1,
        top: 0,
        backgroundColor: '#FFFFFFA0'
    },
    listInactiveItemBottom: {
        position: 'absolute',
        width: '100%',
        height: ROW_HEIGHT - 1,
        top: 2 * ROW_HEIGHT + 1,
        backgroundColor: '#FFFFFFA0'
    },
    bottomContainer: {
        marginVertical: 24,
        marginHorizontal: 40,
        justifyContent: 'flex-end'
    },
});

export default FNPicker;