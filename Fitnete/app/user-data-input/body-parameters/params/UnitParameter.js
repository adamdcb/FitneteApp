import I18n from '../../../utils/i18n/I18n';

class UnitParameter {
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
        return I18n.t(`unit.${value}`, { defaultValue: '' });
    }

    getValueObj({ unit }) {
        return {
            value: unit,
            isDefault: false
        }
    }

    getValueStr(value) {
        return I18n.t(`unit.${value}`, { defaultValue: '' });
    }

    getValueComponents(value) {
        return [value];
    }
}

export default UnitParameter;
