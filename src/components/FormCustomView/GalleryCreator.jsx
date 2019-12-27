/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/static-property-placement */
import React, { Component } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import { equals } from 'ramda';

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

    componentDidUpdate(prevProps) {
      const { onChange } = this.props;
      const prevCollectionConfigsName = prevProps.collectionConfig.map((column) => column.name);
      const currentCollectionConfigsName = this.props.collectionConfig.map((column) => column.name);

      if (
        equals(this.props.metadata, prevProps.metadata)
          && !equals(prevCollectionConfigsName, currentCollectionConfigsName)
      ) {
        // check if new collectionConfig changes the available columns for metadata
        const currentMetadata = this.props.metadata
          .filter((m) => currentCollectionConfigsName.includes(m));

        if (this.props.metadata.length !== currentMetadata.length) {
          onChange({ metadata: currentMetadata });
        }
      }
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
      const collectionConfigsName = collectionConfig.map((column) => column.name);

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
            {collectionConfigsName.map((column) => (
              <Select.Option value={column} key={column}>
                {column}
              </Select.Option>
            ))}
          </Select>
        </>
      );
    }
}
