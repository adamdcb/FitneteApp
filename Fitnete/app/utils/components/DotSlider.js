import React from 'react';
import { View, StyleSheet } from 'react-native';

class DotSlider extends React.PureComponent {

    getSubviews(count = 0, activeIndex = 0) {
        return Array.from({ length: count }, (v, i) => i).map((index) => {
            const dotStyle = index < activeIndex ? styles.pastDot : (index > activeIndex ? styles.futureDot : styles.activeDot);
            const barStyle = index > activeIndex ? styles.futureBar : styles.pastBar;
            const BarView = index > 0 ? <View style={barStyle} /> : <View />
            return (
                <View
                    style={[
                        styles.subviewContainer,
                        {
                            flex: index > 0 ? 1 : 0
                        }
                    ]}
                    key={`${index}`}
                >
                    {BarView}
                    <View
                        style={dotStyle}
                    />
                </View >
            );
        });
    }

    render() {
        const { style = {}, count, activeIndex } = this.props;
        const subviews = this.getSubviews(count, activeIndex);
        return (
            <View
                style={[styles.container, style]}
            >
                {subviews}
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        height: 32,
        flexDirection: 'row',
        alignItems: 'center'
    },
    subviewContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    pastDot: {
        backgroundColor: '#30D87C3D',
        height: 20,
        width: 20,
        borderRadius: 10
    },
    pastBar: {
        flex: 1,
        marginHorizontal: 4,
        backgroundColor: '#30D87C3D',
        height: 4,
        borderRadius: 2
    },
    activeDot: {
        backgroundColor: '#08C757',
        height: 20,
        width: 20,
        borderRadius: 10
    },
    futureDot: {
        backgroundColor: '#DBDBDE',
        height: 20,
        width: 20,
        borderRadius: 10
    },
    futureBar: {
        flex: 1,
        marginHorizontal: 4,
        backgroundColor: '#DBDBDE',
        height: 4,
        borderRadius: 2
    }
});

export default DotSlider;