import I18n from '../../../utils/i18n/I18n';

class AreasOfFocusParameter {
    standardiseValue(value) {
        return value;
    }

    standardiseValueFromComponents() {
        return -1;
    }

    getFormattedValue(values) {
        if (values && values.length) {
            const value = values[0];
            const other = values.length > 1 ? `, + ${values.length - 1}` : '';
            return `${I18n.t(`areasOfFocusOptions.${value}`, { defaultValue: '' })}${other}`;
        }
        return '';
    }

    getValueObj({ value }) {
        return {
            value,
            isDefault: false
        }
    }

    getValueStr(value) {
        return I18n.t(`areasOfFocusOptions.${value}`);
    }

    getValueComponents() {
        return [];
    }
}

export default AreasOfFocusParameter;
