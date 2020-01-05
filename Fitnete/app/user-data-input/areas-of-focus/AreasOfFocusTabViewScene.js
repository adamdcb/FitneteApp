import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import AreaOfFocusTabViewScenePresenter from './AreaOfFocusTabViewScenePresenter';

class AreasOfFocusTabViewScene extends React.Component {
    constructor(props) {
        super(props);
        this.presenter = new AreaOfFocusTabViewScenePresenter(this, props.type);
        this.state = {
            areas: []
        }
        this.onToggleArea = this.onToggleArea.bind(this);
    }

    componentDidMount() {
        this.presenter.loadData();
    }

    componentWillUnmount() {
        this.presenter.unmountView();
    }

    onToggleArea(index) {
        this.presenter.didToggleArea(index);
    }

    setAreasData(areas) {
        this.setState({ areas });
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange();
        }
    }

    reload() {
        this.presenter.loadData();
    }

    render() {
        return (
            <View style={styles.tabViewScene}>
                <View>
                    <Image
                        style={styles.tabViewImage}
                        source={{ uri: `area_${this.props.type}` }}
                    />
                    {this.state.areas.map((area) => {
                        if (!area.selected) {
                            return null;
                        }
                        return (<Image
                            key={area.id}
                            style={{
                                ...styles.areaItemHighlightImage,
                                ...area.highlight.position
                            }}
                            source={{ uri: area.highlight.iconName }}
                        />)
                    })}
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
                            <Text
                                style={styles.areaItemText}
                            >
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
        marginVertical: 16,
        flexDirection: 'row'
    },
    tabViewImage: {
        marginTop: 16,
        width: 98,
        height: 286,
        resizeMode: 'contain'
    },
    areasContainer: {
        flex: 1,
        marginLeft: 24,
        justifyContent: 'center'
    },
    areaItem: {
        marginBottom: 24,
        flexDirection: 'row'
    },
    areaItemText: {
        marginLeft: 16,
        fontFamily: 'Poppins',
        fontSize: 15,
        color: '#4F4C57'
    },
    areaItemHighlightImage: {
        width: 27,
        height: 27,
        position: 'absolute'
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
