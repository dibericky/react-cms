/* eslint-disable react/static-property-placement */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Typography, Button } from 'antd';
import EditableText from './EditableText';
import EditableImage from './EditableImage';
import Table from './Table';

function injectIdInField(data) {
  return data.map((item) => Object.keys(item).reduce((acc, key) => ({
    ...acc,
    [key]: { value: item[key], id: item.id },
  }), {}));
}

export default class TableViewContent extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    config: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
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

  mapTypeToRender(columnName, isEditable, action) {
    return ({
      image: ({ id, value: url }) => {
        if (isEditable) {
          return (
            <EditableImage
              url={url}
              onChange={(newValue) => this.onValueChange(id, columnName, newValue)}
            />
          );
        }
        return <img src={url} alt={url} height={50} />;
      },
      string: ({ id, value: text }) => {
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
      action: ({ id, value: text }) => <Button type="link" onClick={() => action(id)}>{text}</Button>,
    });
  }

  render() {
    const { data } = this.props;
    return (
      <div style={{ height: '100%', overflow: 'hidden' }}>
        <Table
          dataSource={injectIdInField(data)}
          columns={this.getColumns()}
          rowKey={(record) => record.id.value}
        />
      </div>
    );
  }
}
