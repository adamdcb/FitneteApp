import I18n from '../../../utils/i18n/I18n';

class FitnessLevelParameter {
    standardiseValue(value) {
        return value;
    }

    standardiseValueFromComponents() {
        return -1;
    }

    getFormattedValue(value) {
        return this.getValueStr(value);
    }

    getValueObj({ value }) {
        return {
            value,
            isDefault: false
        }
    }

    getValueStr(value) {
        return I18n.t(`fitnessLevel.level${value + 1}`);
    }

    getValueComponents() {
        return [];
    }
}

export default FitnessLevelParameter;
