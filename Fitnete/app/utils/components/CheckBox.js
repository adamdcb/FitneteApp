import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';


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
        const { style = {}} = this.props;
        return (
            <TouchableOpacity onPress={this.onToggle} style={[boxStyle, style]}>
               
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
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#FFFFFF'
    }
});

export default CheckBox;