import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import AreaOfFocusTabViewScenePresenter from './AreaOfFocusTabViewScenePresenter';

class AreasOfFocusTabViewScene extends React.Component {
    constructor(props) {
        super(props);
        this.presenter = new AreaOfFocusTabViewScenePresenter(this, props.type);
        this.state = {
            areas: this.presenter.getData()
        }
        this.onToggleArea = this.onToggleArea.bind(this);
    }

    componentWillUnmount() {
        this.presenter.unmountView();
    }

    onToggleArea(index) {
        this.presenter.didToggleArea(index);
    }

    setAreasData(areas) {
        this.setState({ areas });
    }

    render() {
        return (
            <View style={[styles.tabViewScene]}>
                <View style={styles.tabViewImage}>

                </View>
                <View style={styles.areasContainer}>
                    {this.state.areas.map((area, index) => (
                        <View
                            key={area.id}
                            style={styles.areaItem}
                        >
                            <SwitchToggle
                                containerStyle={styles.switchContainer}
                                circleStyle={styles.switchCircle}
                                circleColorOff='#FFFFFF00'
                                circleColorOn='#FFFFFF00'
                                buttonStyle={styles.switchButton}
                                backgroundColorOn="#08C757"
                                backgroundColorOff="#3E3750"
                                switchOn={area.selected}
                                onPress={() => this.onToggleArea(index)}
                            />
                            <Text style={styles.areaItemText}>
                                {area.name}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    tabViewScene: {
        flex: 1,
        marginTop: 16,
        flexDirection: 'row'
    },
    tabViewImage: {
        width: 160
    },
    areasContainer: {
        marginTop: 56
    },
    areaItem: {
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center'
    },
    areaItemText: {
        marginLeft: 16,
        fontFamily: 'Poppins',
        fontSize: 15,
        color: '#4F4C57'
    },
    switchContainer: {
        width: 48,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#3E3750',
        padding: 4
    },
    switchCircle: {
        width: 16,
        height: 16
    },
    switchButton: {
        width: 16,
        height: 16,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        transform: [
            { rotate: '-45deg' }
        ]
    }
});

export default AreasOfFocusTabViewScene;
