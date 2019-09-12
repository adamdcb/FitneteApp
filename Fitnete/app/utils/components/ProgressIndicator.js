import React from 'react';
import { View, StyleSheet } from 'react-native';

class ProgressIndicator extends React.PureComponent {
    constructor(props) {
        super(props);
        this.subviews = this.getSubviews();
    }

    getSubviews() {
        const { count = 1, activeIndex = 0 } = this.props;
        return Array.from({ length: count }, (v, i) => i).map((index) => {
            const style = index < activeIndex ? styles.pastBarStyle : (index > activeIndex ? styles.futureBarStyle : styles.activeBarStyle);
            const marginRight = index < count - 1 ? 4 : 0;
            return (
                <View
                    style={[style, {
                        marginRight: marginRight
                    }]}
                    key={`${index}`}
                />
            );
        });
    }

    render() {
        const { style = {} } = this.props;
        return (
            <View
                style={[styles.container, style]}
            >
                {this.subviews}
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pastBarStyle: {
        backgroundColor: '#30D87C3D',
        height: 6,
        width: 16,
        borderRadius: 3
    },
    activeBarStyle: {
        backgroundColor: '#08C757',
        height: 6,
        width: 32,
        borderRadius: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4
    },
    futureBarStyle: {
        backgroundColor: '#DBDBDE',
        height: 6,
        width: 16,
        borderRadius: 3
    },
});

export default ProgressIndicator;