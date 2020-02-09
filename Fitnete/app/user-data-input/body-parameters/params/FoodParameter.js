import I18n from '../../../utils/i18n/I18n';

class FoodParameter {
    standardiseValue(value) {
        return value;
    }

    standardiseValueFromComponents(comps) {
        const value = comps[0];
        return this.standardiseValue(value);
    }

    convert(value) {
        return value;
    }
    
    getFormattedValue(value) {
        return I18n.t(`foodOptions.${value}`, { defaultValue: '' });
    }

    getValueObj({ value, defaultValue }) {
        const isDefault = value === null || value === undefined;
        return {
            value: isDefault ? defaultValue : value,
            isDefault
        }
    }

    getValueStr(value) {
        return I18n.t(`foodOptions.${value}`, { defaultValue: '' });
    }

    getValueComponents(value) {
        return [value];
    }
}

export default FoodParameter;
