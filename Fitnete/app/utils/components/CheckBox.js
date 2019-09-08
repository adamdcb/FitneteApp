import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle() {
        const { active } = this.state;
        if (this.props.onToggle) {
            this.props.onToggle(!active);
        }
        this.setState({
            active: !active
        });
    }

    render() {
        const { active } = this.state;
        const boxStyle = active ? styles.boxActive : styles.box;
        const checkmarkStyle = active ? styles.checkmarkActive : styles.checkmark;
        const { style = {}} = this.props;
        return (
            <TouchableOpacity onPress={this.onToggle} style={[boxStyle, style]}>
               <Text style={checkmarkStyle}>{'\u2713'}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    box: {
        height: 16,
        width: 16,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#B4B3B6'
    },
    boxActive: {
        height: 16,
        width: 16,
        borderRadius: 2,
        backgroundColor: '#08C757'
    },
    checkmark: {
        color: 'transparent'
    },
    checkmarkActive: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '500'
    }
});

export default CheckBox;