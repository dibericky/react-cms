/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/static-property-placement */
import React, { Component } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';

import TypeSelector from './TypeSelector';
import CategorizedSelector from './CetegorizedSelector';

export default class SourceCollectionCreator extends Component {
    static propTypes = {
      collectionsConfig: PropTypes.object.isRequired,
      onChange: PropTypes.func.isRequired,
      type: PropTypes.string,
      collection: PropTypes.string,
      projection: PropTypes.arrayOf(PropTypes.string).isRequired,
      metadata: PropTypes.arrayOf(PropTypes.string).isRequired,
      categorizedBy: PropTypes.string,
    }

    static defaultProps = {
      type: undefined,
      collection: undefined,
      categorizedBy: undefined,
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

    renderCategorizedSelector() {
      const {
        onChange, collection, collectionsConfig, categorizedBy,
      } = this.props;

      if (collection) {
        return (
          <CategorizedSelector
            categorizedBy={categorizedBy}
            collectionConfig={collectionsConfig[collection]}
            onChange={(value) => onChange({ categorizedBy: value })}
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
          {this.renderCategorizedSelector()}
          {this.renderTypeSelector()}
        </>
      );
    }
}
