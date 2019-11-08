import I18n from '../../utils/i18n/I18n';
import UserDataSource from '../../data/UserDataSource';
import BodyParameterFactory from './params/BodyParameterFactory';

export default class BodyParametersPresenter {
    constructor(view) {
        this.view = view;
        this.dataSource = new UserDataSource();
        this.unit = '';
        this.data = [];
        this.uiData = [];
    }

    async loadData() {
        const user = await this.dataSource.getUser();
        this.unit = ((user || {}).settings || {}).unit;
        if (!this.unit) {
            this.unit = 'metric'
            await this._setUnit(this.unit);
        }
        const bodyParams = ((user || {}).fitness || {}).bodyParams || {};
        this.data = this._getData();
        this.uiData = this._getUIData(bodyParams);
        this.view.setData(this.uiData);
    }

    async didSaveBodyParam(bodyParam, valuesIndexes) {
        const bParam = BodyParameterFactory.createParameter(bodyParam.type);
        const id = bodyParam.id;
        const datasets = this.data.find(d => d.id === id).datasets;
        const dataset = datasets.find(ds => ds.unit === this.unit) || datasets[0];
        const value = bParam.standardiseValueFromComponents(valuesIndexes.map((v, i) => dataset.data[i][v + 1]), this.unit);
        if (bodyParam.type === 'unit') {
            this.uiData = await this._saveUnit(value);
        } else {
            this.uiData = await this._saveBodyParam(id, value, bParam.getFormattedValue(value, this.unit), valuesIndexes);
        }
        this.view.setData(this.uiData);
    }

    async _saveUnit(value) {
        this.unit = value;
        await this._setUnit(value);
        const user = await this.dataSource.getUser();
        const bodyParams = ((user || {}).fitness || {}).bodyParams || {};
        return this._getUIData(bodyParams);
    }

    async _saveBodyParam(id, value, displayValue, valueComponents) {
        const param = {};
        param[id] = {
            value
        };
        const data = {
            fitness: {
                bodyParams: {
                    ...param
                }
            }
        }
        await this.dataSource.setUser(data);
        return this.uiData.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    value,
                    displayValue,
                    valueComponents,
                    isDefaultValue: false
                }
            }
            return item;
        });
    }

    unmountView() {
        this.view = null;
    }

    async _setUnit(unit) {
        await this.dataSource.setUser({
            settings: {
                unit
            }
        });
        return true;
    }

    _getUIData(bodyParams) {
        return this.data.map((item) => {
            const param = bodyParams[item.id] || {};
            const dataset = item.datasets.find(ds => ds.unit === this.unit) || item.datasets[0];
            const bParam = BodyParameterFactory.createParameter(item.type);
            const valueObj = bParam.getValueObj({ value: param.value, defaultValue: dataset.defaultValue, unit: this.unit });
            const value = valueObj.value;
            return {
                id: item.id,
                type: item.type,
                title: I18n.t(`bodyParameters.${item.id}`),
                iconName: item.id,
                datasets: dataset.data.map(d => d.map(v => bParam.getValueStr(v))),
                labels: dataset.dataLabels,
                displayValue: bParam.getFormattedValue(value, this.unit),
                valueComponents: bParam.getValueComponents(value, this.unit).map((v, i) => dataset.data[i].indexOf(v) - 1),
                isDefaultValue: valueObj.isDefault
            }
        });
    }

    _dataWithPadding(data, padding) {
        data.unshift(padding);
        data.push(padding);
        return data;
    }

    _getData() {
        return [{
            id: 'unit',
            type: 'unit',
            datasets: [{
                defaultValue: 'metric',
                data: [
                    this._dataWithPadding(
                        [
                            'metric',
                            'imperial'
                        ], '')
                ]
            }]
        },
        {
            id: 'height',
            type: 'height',
            datasets: [{
                unit: 'metric',
                defaultValue: 175,
                dataLabels: ['CM'],
                data: [
                    this._dataWithPadding(Array.from({ length: 250 }, (v, i) => i), -1)
                ]
            },
            {
                unit: 'imperial',
                defaultValue: 5.9,
                dataLabels: ['FT', 'IN'],
                data: [
                    this._dataWithPadding(Array.from({ length: 8 }, (v, i) => i), -1),
                    this._dataWithPadding(Array.from({ length: 12 }, (v, i) => i), -1)
                ]
            }]
        },
        {
            id: 'weight',
            type: 'weight',
            datasets: [{
                unit: 'metric',
                defaultValue: 75,
                dataLabels: ['KG'],
                data: [
                    this._dataWithPadding(Array.from({ length: 161 }, (v, i) => i + 20), -1)
                ]
            },
            {
                unit: 'imperial',
                defaultValue: 165,
                dataLabels: ['LBS'],
                data: [
                    this._dataWithPadding(Array.from({ length: 361 }, (v, i) => i + 40), -1)
                ]
            }]
        },
        {
            id: 'target_weight',
            type: 'weight',
            datasets: [{
                unit: 'metric',
                defaultValue: 75,
                dataLabels: ['KG'],
                data: [
                    this._dataWithPadding(Array.from({ length: 161 }, (v, i) => i + 20), -1)
                ]
            },
            {
                unit: 'imperial',
                defaultValue: 165,
                dataLabels: ['LBS'],
                data: [
                    this._dataWithPadding(Array.from({ length: 361 }, (v, i) => i + 40), -1)
                ]
            }]
        }
        ];
    }
}
