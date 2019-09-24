
const CM_INCH_COEFF = 2.54;
const FEET_INCH_COEFF = 12;

class HeightParameter {
    standardiseValue(value, unit = 'cm') {
        switch (unit) {
            case 'cm':
                return value;
            case 'ftIn': {
                const feet = Math.trunc(value);
                const inches = Math.fround((value - feet) * 10);
                const cm = Math.trunc((feet * FEET_INCH_COEFF + inches) * CM_INCH_COEFF * 10) / 10;
                return cm;
            }
            default:
                return value;
        }
    }

    standardiseValueFromComponents(comps, unit = 'cm') {
        const value = comps[0] + (comps[1] / 10);
        return this.standardiseValue(value, unit);
    }

    getFormattedValue(value, unit = 'cm') {
        switch (unit) {
            case 'cm':
                return `${value} CM`;
            case 'ftIn': {
                const inches = value / CM_INCH_COEFF;
                const feet = Math.trunc(inches / FEET_INCH_COEFF);
                const remainingInches = Math.round(inches - (feet * FEET_INCH_COEFF));
                return `${feet} FT ${remainingInches} IN`;
            }
            default:
                return '';
        }
    }

    getValueStr(value) {
        if (value === -1) {
            return ''
        };
        return `${value}`;
    }

    getValueComponents(value, unit = 'cm') {
        switch (unit) {
            case 'cm': {
                const integral = Math.trunc(value);
                const decimal = Math.fround(10 * (value - integral));
                console.log([integral, decimal]);
                return [integral, decimal];
            }
            case 'ftIn': {
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
