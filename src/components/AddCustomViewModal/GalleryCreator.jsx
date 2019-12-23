/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/static-property-placement */
import React, { Component } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';


export default class GalleryCreator extends Component {
    static propTypes = {
      collectionConfig: PropTypes.arrayOf(PropTypes.object),
      onChange: PropTypes.func.isRequired,
      imageColumn: PropTypes.string,
      metadata: PropTypes.arrayOf(PropTypes.string).isRequired,
    }

    static defaultProps = {
      collectionConfig: [],
      imageColumn: undefined,
    }

    getImageColumns() {
      const { collectionConfig } = this.props;
      return collectionConfig
        .filter((column) => column.type === 'image');
    }

    render() {
      const {
        onChange, imageColumn, metadata, collectionConfig,
      } = this.props;
      return (
        <>
          <Select
            placeholder="Select an image column"
            value={imageColumn}
            onChange={(column) => onChange({ imageColumn: column })}
          >
            {this.getImageColumns().map((column) => (
              <Select.Option value={column.name} key={column.name}>
                {column.name}
              </Select.Option>
            ))}
          </Select>
          <Select
            placeholder="Select columns for metadata"
            mode="multiple"
            value={metadata}
            onChange={(columns) => onChange({ metadata: columns })}
          >
            {collectionConfig.map((column) => (
              <Select.Option value={column.name} key={column.name}>
                {column.name}
              </Select.Option>
            ))}
          </Select>
        </>
      );
    }
}
