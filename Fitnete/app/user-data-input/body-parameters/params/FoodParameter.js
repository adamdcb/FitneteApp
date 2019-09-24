import I18n from '../../../utils/i18n/I18n';

class FoodParameter {
    standardiseValue(value) {
        return value;
    }

    standardiseValueFromComponents(comps) {
        const value = comps[0];
        return this.standardiseValue(value);
    }

    getFormattedValue(value) {
        return I18n.t(`foodOptions.${value}`, { defaultValue: '' });
    }

    getValueStr(value) {
        return I18n.t(`foodOptions.${value}`, { defaultValue: '' });
    }

    getValueComponents(value) {
        return [value];
    }
}

export default FoodParameter;
