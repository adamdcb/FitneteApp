import React from 'react';

import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../utils/config-files/fitnete_config.json';

const Icon = createIconSetFromFontello(fontelloConfig);

class FNIcon extends React.PureComponent {
    render() {
        const { color = '#3E3750', size = 10, name = '' } = this.props;
        return (
            <Icon
                name={name}
                size={size}
                color={color}
            />
        );
    };
}

export default FNIcon;