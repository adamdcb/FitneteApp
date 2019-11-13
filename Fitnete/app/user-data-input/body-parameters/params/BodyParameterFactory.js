import HeightParameter from './HeightParameter';
import WeightParameter from './WeightParameter';
import FoodParameter from './FoodParameter';
import UnitParameter from './UnitParameter';
import AreasOfFocusParameter from './AreasOfFocusParameter';

export default class BodyParameterFactory {
    static createParameter(type) {
        switch (type) {
            case 'unit': 
                return new UnitParameter();
            case 'height':
                return new HeightParameter();
            case 'weight':
                return new WeightParameter();
            case 'food':
                return new FoodParameter();
            case 'areasOfFocus':
                return new AreasOfFocusParameter();
            default:
                return null;
        }
    }
}