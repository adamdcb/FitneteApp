import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: this._getBackgroundColors()
        }
        this.onPressIn = this.onPressIn.bind(this);
        this.onPressOut = this.onPressOut.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.disabled !== this.props.disabled) {
            this._onButtonStateChanged();
        }
    }

    onPressIn() {
        this._onButtonStateChanged(true);
    }

    onPressOut() {
        this._onButtonStateChanged();
    }

    render() {
        const { title = '', style = {}, textStyle = {}, disabled = false, onPress } = this.props;
        return (
            <LinearGradient
                style={[styles.linearGradient, style]}
                colors={this.state.colors}
                useAngle
                angle={135}
                angleCenter={{ x: 0.5, y: 0.5 }}
            >
                <TouchableOpacity
                    style={[styles.button, style]}
                    disabled={disabled}
                    activeOpacity={1}
                    onPress={onPress}
                    onPressIn={this.onPressIn}
                    onPressOut={this.onPressOut}
                >
                    <Text style={[styles.text, textStyle]}>{title}</Text>
                </TouchableOpacity>
            </LinearGradient>
        );
    };

    _onButtonStateChanged(pressed = false) {
        const colors = this._getBackgroundColors(pressed);
        this.setState({
            colors
        });
    }

    _getBackgroundColors(pressed = false) {
        let colors = ['#08C757', '#00AC56'];
        if (this.props.disabled) {
            colors = ['#08C75752', '#08C75752']
        } else if (pressed) {
            colors = ['#08C757', '#08C757']
        }
        return colors;
    }
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        fontWeight: '600',
        textTransform: 'uppercase',
        color: '#FFFFFF'
    },
    linearGradient: {
        height: 40,
        borderRadius: 4
    }
});

export default Button;