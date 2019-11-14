import React from 'react';
import { View, StyleSheet } from 'react-native';

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
        height: 1,
        backgroundColor: '#EEEFF1'
    }
});

export default ListViewItemSeparator;