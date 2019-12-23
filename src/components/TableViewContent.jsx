/* eslint-disable react/static-property-placement */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Typography, Button } from 'antd';
import EditableText from './EditableText';
import EditableImage from './EditableImage';
import Table from './Table';
import EditableEnum from './EditableEnum';

export default class TableViewContent extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
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
  };

  getColumns() {
    const { config } = this.props;
    return config.map((conf) => {
      const render = this.mapTypeToRender(conf.name, conf.editable, conf.action)[conf.type];
      return {
        title: conf.name,
        dataIndex: conf.name,
        key: conf.name,
        ...render ? { render } : {},
      };
    });
  }

  onValueChange = (id, column, value) => {
    const { data, onValueChange } = this.props;
    const row = data.find((item) => item.id === id);
    if (row) {
      const newValues = {
        [column]: value,
      };
      onValueChange(id, newValues);
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

  mapTypeToRender(columnName, isEditable, action) {
    return ({
      image: (value, record) => {
        const url = value || this.getDefaultValue(columnName);
        if (isEditable) {
          return (
            <EditableImage
              url={url}
              onChange={(newValue) => this.onValueChange(record.id, columnName, newValue)}
            />
          );
        }
        return <img src={url} alt={url} height={50} />;
      },
      string: (value, record) => {
        const { id } = record;
        const text = value || this.getDefaultValue(columnName);
        if (isEditable) {
          return (
            <EditableText
              text={text}
              onChange={(newValue) => this.onValueChange(id, columnName, newValue)}
            />
          );
        }
        return <Typography.Text>{text}</Typography.Text>;
      },
      action: (value, record) => {
        const { id } = record;
        const text = value || this.getDefaultValue(columnName);
        return <Button type="link" onClick={() => action(id)}>{text}</Button>;
      },
      enum: (value, record) => (
        <EditableEnum
          enumValues={this.getEnumValues(columnName)}
          text={value || this.getDefaultValue(columnName)}
          onChange={(newValue) => this.onValueChange(record.id, columnName, newValue)}
        />
      ),
    });
  }

  render() {
    const { data } = this.props;
    return (
      <div style={{ height: '100%', overflow: 'hidden' }}>
        <Table
          dataSource={data}
          columns={this.getColumns()}
          rowKey={(record) => record.id}
        />
      </div>
    );
  }
}
