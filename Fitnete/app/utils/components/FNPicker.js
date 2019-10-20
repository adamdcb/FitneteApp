import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import FNIcon from './FNIcon';
import Button from './Button';

const ROW_HEIGHT = 40;

class FNPicker extends React.Component {
    constructor(props) {
        super(props);
        const { columns, initialScrollIndexes } = this.props;
        this.state = {
            columns,
            scrollIndexes: initialScrollIndexes
        };
        this.onDismiss = this.onDismiss.bind(this);
        this.onSave = this.onSave.bind(this);
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
            const { scrollIndexes } = this.state;
            this.props.onSave(scrollIndexes);
        }
    }

    onMomentumScrollEnd(event, index) {
        const scrollIndexes = [...this.state.scrollIndexes];
        scrollIndexes[index] = event.nativeEvent.contentOffset.y / ROW_HEIGHT;
        this.setState({ scrollIndexes });
    }

    getItemLayout(data, index) {
        return {
            length: ROW_HEIGHT,
            offset: ROW_HEIGHT * index,
            index
        };
    }

    _renderColumns() {
        const { columns, scrollIndexes } = this.state;
        const views = [];
        columns.forEach((column, index) => {
            const parentIndex = index;
            if (this.props.columnLabels) {
                const SeparatorView = <Text style={{ color: 'transparent' }} key={`${parentIndex}${this.props.separator}`}>{this.props.columnLabels[index]}</Text>;
                views.push(SeparatorView);
            }
            const ListView =
                <View
                    style={styles.listViewContainer}
                    key={`${parentIndex}${index}`}
                >
                    <FlatList
                        style={styles.listView}
                        data={column}
                        extraData={this.state}
                        initialScrollIndex={scrollIndexes[index]}
                        keyExtractor={(item, index) => `${parentIndex}${item}${index}`}
                        listKey={`${parentIndex}`}
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
            if (this.props.columnLabels) {
                const SeparatorView = <Text style={styles.separator} key={`${parentIndex}${this.props.separator}`}>{this.props.columnLabels[index]}</Text>;
                views.push(SeparatorView);
            }
        })
        return views;
    }

    renderItem({ item }) {
        return (
            <View style={styles.rowItem}>
                <Text>{item}</Text>
            </View>
        )
    }

    render() {
        const { visible, title } = this.props;
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
                            <Text style={styles.title}>{title || ''}</Text>
                            <View style={styles.listViewOuterContainer}>
                                {this._renderColumns()}
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
    rowItem: {
        flex: 1,
        height: ROW_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center'
    },
    separator: {
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
        height: 3 * ROW_HEIGHT,
        marginHorizontal: 8
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