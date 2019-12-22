/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/static-property-placement */
import React, { Component } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';

import TypeSelector from './TypeSelector';

export default class SourceCollectionCreator extends Component {
    static propTypes = {
      collectionsConfig: PropTypes.object.isRequired,
      onChange: PropTypes.func.isRequired,
      type: PropTypes.string,
      collection: PropTypes.string,
      projection: PropTypes.arrayOf(PropTypes.string).isRequired,
      metadata: PropTypes.arrayOf(PropTypes.string).isRequired,
    }

    static defaultProps = {
      type: undefined,
      collection: undefined,
    }

    getCollectionsList() {
      const { collectionsConfig } = this.props;

      return Object.keys(collectionsConfig);
    }

    renderTypeSelector() {
      const {
        onChange, collection, collectionsConfig, type, projection, metadata,
      } = this.props;

      if (collection) {
        return (
          <TypeSelector
            collectionConfig={collectionsConfig[collection]}
            type={type}
            projection={projection}
            onChange={onChange}
            metadata={metadata}
          />
        );
      }
      return null;
    }

    render() {
      const { onChange, collection } = this.props;

      return (
        <>
          <Select
            placeholder="Select a collection"
            value={collection}
            onChange={(value) => onChange({ collection: value })}
          >
            {this.getCollectionsList().map((i) => (
              <Select.Option value={i} key={i}>
                {i}
              </Select.Option>
            ))}
          </Select>
          {this.renderTypeSelector()}
        </>
      );
    }
}
