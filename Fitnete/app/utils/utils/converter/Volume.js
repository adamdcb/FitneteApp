const LITRE_TO_OUNCE_COEFF = 33.814;

export default {
    convert(value, unit = 'metric') {
        switch (unit) {
            case 'imperial':
                return Math.round(value * LITRE_TO_OUNCE_COEFF);
            default:
                return value;
        }
    },

    convertToMetric(value, unit = 'imperial') {
        switch (unit) {
            case 'imperial':
                return Math.round((value / LITRE_TO_OUNCE_COEFF) * 10) / 10;
            default:
                return value;
        }
    },

    getFormattedValue(value, unit = 'metric') {
        switch (unit) {
            case 'imperial':
                return `${Math.round(value * LITRE_TO_OUNCE_COEFF)} OZ`;
            default: {
                if (value < 1) {
                    return `${Math.round(value * 1000)} mL`;
                }
                return `${Math.round(value * 100) / 100} L`;
            }
        }
    }
}