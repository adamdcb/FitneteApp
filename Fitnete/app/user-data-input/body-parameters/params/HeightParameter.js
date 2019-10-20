
const CM_INCH_COEFF = 2.54;
const FEET_INCH_COEFF = 12;

class HeightParameter {
    standardiseValue(value, unit = 'metric') {
        switch (unit) {
            case 'metric':
                return value;
            case 'imperial': {
                const feet = Math.trunc(value);
                const inches = Math.fround((value - feet) * 10);
                const cm = Math.trunc((feet * FEET_INCH_COEFF + inches) * CM_INCH_COEFF * 10) / 10;
                return cm;
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
                return `${Math.round(value)} CM`;
            case 'imperial': {
                const inches = value / CM_INCH_COEFF;
                const feet = Math.trunc(inches / FEET_INCH_COEFF);
                const remainingInches = Math.round(inches - (feet * FEET_INCH_COEFF));
                return `${feet} FT ${remainingInches} IN`;
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
                const inches = value / CM_INCH_COEFF;
                const feet = Math.trunc(inches / FEET_INCH_COEFF);
                const remainingInches = Math.round(inches - (feet * FEET_INCH_COEFF));
                return [feet, remainingInches];
            }
            default:
                return [];
        }
    }

}

export default HeightParameter;
