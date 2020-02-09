import I18n from '../../utils/i18n/I18n';
import UserDataSource from '../../data/UserDataSource';
import BodyParameterFactory from './params/BodyParameterFactory';
import Utils from '../../utils/utils/Utils';

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
        this.unit = user.unit;
        this.data = this._getData();
        this.uiData = this._getUIData(user);
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
            for (let index = 0; index < bodyParam.resetParamsOnChange.length; index++) {
                const paramId = bodyParam.resetParamsOnChange[index];
                this.uiData = await this._resetBodyParam(paramId, value);
            }
        }
        this.view.setData(this.uiData);
    }

    async _saveUnit(value) {
        this.unit = value;
        await this._setUnit(value);
        const user = await this.dataSource.getUser();
        return this._getUIData(user);
    }

    async _saveBodyParam(id, value, displayValue, valueComponents) {
        const param = {};
        param[id] = value;
        const data = {
            ...param
        }
        await this.dataSource.setUser(data);
        const uiData = this.uiData.map((item) => {
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
        uiData.hasSelectedBodyParams = !uiData.some(d => d.isDefaultValue);
        return uiData;
    }

    async _resetBodyParam(id, maxValue) {
        const param = {};
        param[id] = null;
        const data = {
            ...param
        };
        await this.dataSource.setUser(data);
        const uiData = this.uiData.map((item) => {
            if (item.id === id) {
                const bParam = BodyParameterFactory.createParameter(item.type);
                const mValue = bParam.convert(maxValue, this.unit) - 1;
                const data = this.data.find(d => d.id === id);
                const dataset = data.datasets.find(ds => ds.unit === this.unit) || data.datasets[0];
                const valueObj = bParam.getValueObj({ value: null, defaultValue: Math.min(mValue, dataset.defaultValue), unit: this.unit });
                const value = valueObj.value;
                return {
                    ...item,
                    datasets: dataset.data.map(d => d.filter(v => v <= mValue).map(v => bParam.getValueStr(v))),
                    value,
                    displayValue: bParam.getFormattedValue(value, this.unit),
                    valueComponents: bParam.getValueComponents(value, this.unit).map((v, i) => dataset.data[i].indexOf(v) - 1),
                    isDefaultValue: true
                }
            }
            return item;
        });
        uiData.hasSelectedBodyParams = false;
        return uiData;
    }

    unmountView() {
        this.view = null;
    }

    async _setUnit(unit) {
        await this.dataSource.setUser({
            unit
        });
        return true;
    }

    _getUIData(user) {
        const uiData = this.data.map((item) => {
            const paramValue = user[item.id];
            const dataset = item.datasets.find(ds => ds.unit === this.unit) || item.datasets[0];
            const bParam = BodyParameterFactory.createParameter(item.type);
            const maxParamValue = item.dependsOn ? bParam.convert(user[item.dependsOn] || Number.MAX_VALUE, this.unit) - 1 : null;
            const valueObj = bParam.getValueObj({ value: paramValue, defaultValue: maxParamValue ? Math.min(maxParamValue, dataset.defaultValue) : dataset.defaultValue, unit: this.unit });
            const value = valueObj.value;
            return {
                id: item.id,
                type: item.type,
                title: I18n.t(`bodyParameters.${item.id}`),
                iconName: item.id.replace(/([a-zA-Z])(?=[A-Z])/g, '$1_').toLowerCase(),
                datasets: dataset.data.map(d => d.filter(v => maxParamValue ? v <= maxParamValue : true).map(v => bParam.getValueStr(v))),
                labels: dataset.dataLabels,
                displayValue: bParam.getFormattedValue(value, this.unit),
                valueComponents: bParam.getValueComponents(value, this.unit).map((v, i) => dataset.data[i].indexOf(v) - 1),
                resetParamsOnChange: item.resetParamsOnChange,
                dependsOn: item.dependsOn,
                isDefaultValue: valueObj.isDefault
            }
        });
        uiData.hasSelectedBodyParams = !uiData.some(d => d.isDefaultValue);
        return uiData;
    }

    _dataWithPadding(data, padding) {
        return Utils.arrayWithPadding(data, padding);
    }

    _getData() {
        return [{
            id: 'unit',
            type: 'unit',
            resetParamsOnChange: [],
            dependsOn: null,
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
            resetParamsOnChange: [],
            dependsOn: null,
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
            resetParamsOnChange: ['targetWeight'],
            dependsOn: null,
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
            id: 'targetWeight',
            type: 'weight',
            resetParamsOnChange: [],
            dependsOn: 'weight',
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
