const KG_LBS_COEFF = 2.20462;

class WeightParameter {
    standardiseValue(value, unit = 'metric') {
        switch (unit) {
            case 'metric':
                return value;
            case 'imperial': {
                const kg = Math.trunc((value / KG_LBS_COEFF) * 10) / 10;
                return kg;
            }
            default:
                return value;
        }
    }

    standardiseValueFromComponents(comps, unit = 'metric') {
        const value = comps[0] + ((comps[1] || 0) / 10);
        return this.standardiseValue(value, unit);
    }

    getFormattedValue(value, unit = 'metric') {
        switch (unit) {
            case 'metric':
                return `${Math.round(value)} KG`;
            case 'imperial': {
                const lbs = Math.round(Math.trunc(value * KG_LBS_COEFF * 10) / 10);
                return `${lbs} LBS`;
            }
            default:
                return '';
        }
    }

    getValueObj({ value, unit, defaultValue }) {
        const isDefault = value === null || value === undefined;
        return {
            value: isDefault ? this.standardiseValue(defaultValue, unit) : value,
            isDefault
        }
    }

    getValueStr(value) {
        if (value === -1) {
            return ''
        };
        return `${value}`;
    }

    getValueComponents(value, unit = 'metric') {
        switch (unit) {
            case 'metric': {
                const integral = Math.round(value);
                return [integral];
            }
            case 'imperial': {
                const lbs = value * KG_LBS_COEFF;
                const integral = Math.round(lbs);
                return [integral];
            }
            default:
                return [];
        }
    }
}

export default WeightParameter;
