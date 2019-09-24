import I18n from '../../utils/i18n/I18n';
import UserDataSource from '../../data/UserDataSource';
import BodyParameterFactory from './params/BodyParameterFactory';

const units = {
    cm: 'cm',
    ftIn: 'ft, in',
    kg: 'kg',
    lbs: 'lbs'
};

export default class BodyParametersPresenter {
    constructor(view) {
        this.view = view;
        this.dataSource = new UserDataSource();
        this.data = [];
        this.uiData = [];
    }

    async loadData() {
        const user = await this.dataSource.getUser();
        const bodyParams = ((user || {}).fitness || {}).bodyParams || {};
        this.data = this._getData();
        this.uiData = this._getUIData(bodyParams);
        this.view.setData(this.uiData);
    }

    async didSelectUnit(bodyParam, unitIndex) {
        const bParam = BodyParameterFactory.createParameter(bodyParam.type);
        const param = {};
        const id = bodyParam.id;
        const dataset = this.data.find(d => d.id === id).datasets[unitIndex];
        param[id] = {
            displayUnit: dataset.unit
        };
        const data = {
            fitness: {
                bodyParams: {
                    ...param
                }
            }
        }
        this.dataSource.setUser(data);
        this.uiData = this.uiData.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    datasets: dataset.data.map(d => d.map(v => bParam.getValueStr(v))),
                    unitIndex: unitIndex,
                    displayValue: bParam.getFormattedValue(bodyParam.value, dataset.unit),
                    valueComponents: bParam.getValueComponents(bodyParam.value, dataset.unit).map((v, i) => dataset.data[i][v + 1])
                }
            }
            return item;
        });
        this.view.setData(this.uiData, false);
    }

    async didSaveBodyParam(bodyParam, valuesIndexes) {
        const bParam = BodyParameterFactory.createParameter(bodyParam.type);
        const param = {};
        const id = bodyParam.id;
        const dataset = this.data.find(d => d.id === id).datasets[bodyParam.unitIndex];
        const value = bParam.standardiseValueFromComponents(valuesIndexes.map((v, i) => dataset.data[i][v + 1]), dataset.unit);
        param[id] = {
            displayUnit: dataset.unit,
            value: value
        };
        const data = {
            fitness: {
                bodyParams: {
                    ...param
                }
            }
        }
        this.dataSource.setUser(data);
        this.uiData = this.uiData.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    value: value,
                    displayValue: bParam.getFormattedValue(value, dataset.unit),
                    valueComponents: valuesIndexes,
                    isDefaultValue: false
                }
            }
            return item;
        });
        this.view.setData(this.uiData, true);
    }

    unmountView() {
        this.view = null;
    }

    _getUIData(bodyParams) {
        return this.data.map((item) => {
            const param = bodyParams[item.id] || {};
            const { displayUnit } = param;
            const dataset = item.datasets.find(ds => ds.unit === displayUnit) || item.datasets[0];
            const value = param.value || dataset.defaultValue;
            const bodyParam = BodyParameterFactory.createParameter(item.type);
            return {
                id: item.id,
                type: item.type,
                title: I18n.t(`bodyParameters.${item.id}`),
                iconName: item.id,
                datasets: dataset.data.map(d => d.map(v => bodyParam.getValueStr(v))),
                units: item.datasets.filter(ds => ds.unit).map(ds => units[ds.unit]),
                unitIndex: item.datasets.indexOf(dataset),
                value: value,
                displayValue: bodyParam.getFormattedValue(value, dataset.unit),
                valueComponents: bodyParam.getValueComponents(value, dataset.unit).map((v, i) => dataset.data[i].indexOf(v) - 1),
                isDefaultValue: !param.value,
                separator: dataset.separator
            }
        });
    }

    _dataWithPadding(data, padding) {
        data.unshift(padding);
        data.push(padding);
        return data;
    }

    _getData() {
        return [
            {
                id: 'height',
                type: 'height',
                datasets: [
                    {
                        unit: 'cm',
                        defaultValue: 175.0,
                        separator: '.',
                        data: [
                            this._dataWithPadding(Array.from({ length: 250 }, (v, i) => i), -1),
                            this._dataWithPadding(Array.from({ length: 10 }, (v, i) => i), -1)
                        ]
                    },
                    {
                        unit: 'ftIn',
                        defaultValue: 5.9,
                        separator: '.',
                        data: [
                            this._dataWithPadding(Array.from({ length: 8 }, (v, i) => i), -1),
                            this._dataWithPadding(Array.from({ length: 12 }, (v, i) => i), -1)
                        ]
                    }
                ]
            },
            {
                id: 'weight',
                type: 'weight',
                datasets: [
                    {
                        unit: 'kg',
                        defaultValue: 75,
                        separator: '.',
                        data: [
                            this._dataWithPadding(Array.from({ length: 200 }, (v, i) => i), -1),
                            this._dataWithPadding(Array.from({ length: 10 }, (v, i) => i), -1)
                        ]
                    },
                    {
                        unit: 'lbs',
                        defaultValue: 150,
                        separator: '.',
                        data: [
                            this._dataWithPadding(Array.from({ length: 440 }, (v, i) => i), -1),
                            this._dataWithPadding(Array.from({ length: 10 }, (v, i) => i), -1)
                        ]
                    }
                ]
            },
            {
                id: 'target_weight',
                type: 'weight',
                datasets: [
                    {
                        unit: 'kg',
                        defaultValue: 75,
                        separator: '.',
                        data: [
                            this._dataWithPadding(Array.from({ length: 200 }, (v, i) => i), -1),
                            this._dataWithPadding(Array.from({ length: 10 }, (v, i) => i), -1)
                        ]
                    },
                    {
                        unit: 'lbs',
                        defaultValue: 150,
                        separator: '.',
                        data: [
                            this._dataWithPadding(Array.from({ length: 440 }, (v, i) => i), -1),
                            this._dataWithPadding(Array.from({ length: 10 }, (v, i) => i), -1)
                        ]
                    }
                ]
            },
            {
                id: 'food',
                type: 'food',
                datasets: [
                    {
                        defaultValue: 'vegetarian',
                        data: [
                            this._dataWithPadding(
                                [
                                    'gluten_free',
                                    'vegetarian',
                                    'balanced_diet'
                                ], '')
                        ]
                    }
                ]
            }
        ];
    }
}
