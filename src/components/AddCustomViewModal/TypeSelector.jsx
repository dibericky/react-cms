/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/static-property-placement */
import React, { Component } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import { omit } from 'ramda';

import GalleryCreator from './GalleryCreator';

const TYPES = ['gallery'];

export default class TypeSelector extends Component {
    static propTypes = {
      onChange: PropTypes.func.isRequired,
      type: PropTypes.string,
      collectionConfig: PropTypes.arrayOf(PropTypes.object),
      projection: PropTypes.arrayOf(PropTypes.string).isRequired,
      metadata: PropTypes.arrayOf(PropTypes.string).isRequired,
    }

    static defaultProps = {
      type: undefined,
      collectionConfig: [],
    }

    renderByType() {
      const {
        onChange, type, collectionConfig, projection, metadata,
      } = this.props;

      switch (type) {
        case 'gallery': {
          return (
            <GalleryCreator
              collectionConfig={collectionConfig}
              onChange={(values) => {
                if (values.imageColumn) {
                  return onChange({
                    ...omit(['imageColumn'], values),
                    projection: [values.imageColumn],
                  });
                }
                return onChange(values);
              }}
              imageColumn={projection[0]}
              metadata={metadata}
            />
          );
        }
        default: {
          return null;
        }
      }
    }

    render() {
      const { onChange, type } = this.props;
      return (
        <>
          <Select
            placeholder="Select a type"
            value={type}
            onChange={(value) => onChange({ type: value })}
          >
            {TYPES.map((i) => (
              <Select.Option value={i} key={i}>
                {i}
              </Select.Option>
            ))}
          </Select>
          {this.renderByType()}
        </>
      );
    }
}
