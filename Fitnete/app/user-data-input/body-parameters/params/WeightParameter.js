const KG_LBS_COEFF = 2.20462;

class WeightParameter {
    standardiseValue(value, unit = 'kg') {
        switch (unit) {
            case 'kg':
                return value;
            case 'lbs': {
                const kg = Math.trunc((value / KG_LBS_COEFF) * 10) / 10;
                return kg;
            }
            default:
                return value;
        }
    }

    standardiseValueFromComponents(comps, unit = 'kg') {
        const value = comps[0] + (comps[1] / 10);
        return this.standardiseValue(value, unit);
    }

    getFormattedValue(value, unit = 'kg') {
        switch (unit) {
            case 'kg':
                return `${value} KG`;
            case 'lbs': {
                const lbs = Math.trunc(value * KG_LBS_COEFF * 10) / 10;
                return `${lbs} LBS`;
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

    getValueComponents(value, unit = 'kg') {
        switch (unit) {
            case 'kg': {
                const integral = Math.trunc(value);
                const decimal =  Math.fround(10 * (value - integral));
                return [integral, decimal];
            }
            case 'lbs': {
                const lbs = value * KG_LBS_COEFF;
                const integral = Math.trunc(lbs);
                const decimal =  Math.trunc(10 * (lbs - integral));
                return [integral, decimal];
            }
            default:
                return [];
        }
    }
}

export default WeightParameter;
