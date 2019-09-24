import HeightParameter from './HeightParameter';
import WeightParameter from './WeightParameter';
import FoodParameter from './FoodParameter';

export default class BodyParameterFactory {
    static createParameter(type) {
        switch (type) {
            case 'height':
                return new HeightParameter();
            case 'weight':
                return new WeightParameter();
            case 'food':
                return new FoodParameter();
            default:
                return null;
        }
    }
}