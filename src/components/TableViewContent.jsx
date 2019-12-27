/* eslint-disable class-methods-use-this */
/* eslint-disable react/sort-comp */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import Field from './Field';
import Table from './Table';

export default class TableViewContent extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool,
    primaryKeyName: PropTypes.string,
    config: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      default: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      enum: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ])),
    })),
    onValueChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    data: [],
    config: [],
    primaryKeyName: '',
    isLoading: false,
  };

  getColumns() {
    const { config } = this.props;
    return config.map((conf) => {
      const render = this.mapTypeToRender(conf);
      return {
        title: conf.name,
        dataIndex: conf.name,
        key: conf.name,
        ...render ? { render } : {},
      };
    });
  }

  onValueChange = (record, column, value) => {
    const { data, onValueChange, primaryKeyName } = this.props;
    const primaryKey = record[primaryKeyName];
    const row = data.find((item) => item[primaryKeyName] === primaryKey);
    if (row) {
      const newValues = {
        [column]: value,
      };
      onValueChange(primaryKey, newValues);
    }
  }

  getDefaultValue(columnName) {
    const { config } = this.props;
    const configOfColumn = config.find((col) => col.name === columnName);
    if (!configOfColumn) {
      return undefined;
    }
    return configOfColumn.default;
  }

  getEnumValues(columnName) {
    const { config } = this.props;
    const configOfColumn = config.find((col) => col.name === columnName);
    if (!configOfColumn) {
      return undefined;
    }
    return configOfColumn.enum || [];
  }


  mapTypeToRender(config) {
    const { primaryKeyName } = this.props;
    if (!config.primaryKey) {
      return (value, record) => (
        <Field
          value={value}
          configColumn={config}
          onValueChange={(newValue, colName) => this.onValueChange(record, colName, newValue)}
        />
      );
    }
    return (value, record) => {
      const primaryKey = record[primaryKeyName];
      const text = value || config.default;
      return <Button type="link" onClick={() => config.action(primaryKey)}>{text}</Button>;
    };
  }

  render() {
    const { data, primaryKeyName, isLoading } = this.props;
    return (
      <Table
        loading={isLoading}
        dataSource={data}
        columns={this.getColumns()}
        rowKey={(record) => record[primaryKeyName]}
      />
    );
  }
}
