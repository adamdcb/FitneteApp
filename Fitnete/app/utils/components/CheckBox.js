import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import FNIcon from './FNIcon';


class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
        this.onToggle = this.onToggle.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.active !== this.props.active) {
            this.setState({ active: this.props.active });
        }
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
        const checkmarkColor = active ? '#FFFFFF' : 'transparent';
        const { style = {}} = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={this.onToggle} >
                <View style={[boxStyle, style]}>
                <FNIcon
                    name="check"
                    color={checkmarkColor}
                    size={12}
                />
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: -4,
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        height: 16,
        width: 16,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#B4B3B6',
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxActive: {
        height: 16,
        width: 16,
        borderRadius: 2,
        backgroundColor: '#08C757',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CheckBox;