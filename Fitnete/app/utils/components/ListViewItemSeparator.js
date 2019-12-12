import React from 'react';
import { View, StyleSheet } from 'react-native';

const HEIGHT = 1;

class ListViewItemSeparator extends React.PureComponent {
    render() {
        const { style = {} } = this.props;
        return (
            <View style={[styles.container, style]} />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        backgroundColor: '#EEEFF1'
    }
});

ListViewItemSeparator.HEIGHT = HEIGHT;

export default ListViewItemSeparator;