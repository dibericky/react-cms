/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';
import styled from 'styled-components';

import SourceCollectionCreator from './SourceCollectionCreator';


const SOURCES = ['collection'];

export default class AddCustomViewModal extends Component {
    static propTypes = {
      errors: PropTypes.arrayOf(PropTypes.object),
      showErrors: PropTypes.bool,
      collectionsConfig: PropTypes.object.isRequired,
      fields: PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        collection: PropTypes.string,
        projection: PropTypes.arrayOf(PropTypes.string),
        metadata: PropTypes.arrayOf(PropTypes.string),
        categorizedBy: PropTypes.string,
        source: PropTypes.string,
      }),
      onChange: PropTypes.func.isRequired,
    }

    static defaultProps = {
      fields: {},
      errors: [],
      showErrors: false,
    }


    onChange(values) {
      const { onChange } = this.props;
      onChange(values);
    }

    getValuesForCreation() {
      const { fields } = this.props;
      return fields;
    }

    renderBySource() {
      const { collectionsConfig, fields } = this.props;
      const {
        source, type, collection, projection, metadata, categorizedBy,
      } = fields;
      switch (source) {
        case 'collection': {
          return (
            <SourceCollectionCreator
              collectionsConfig={collectionsConfig}
              type={type}
              collection={collection}
              projection={projection}
              categorizedBy={categorizedBy}
              metadata={metadata}
              onChange={(values) => {
                this.onChange(values);
              }}
            />
          );
        }
        default: {
          return null;
        }
      }
    }

    render() {
      const {
        fields,
        showErrors,
        errors,
      } = this.props;
      const {
        name, source,
      } = fields;

      return (
        <FormContainer>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => {
              this.onChange({ name: e.target.value });
            }}
          />
          <Select
            placeholder="Select a source"
            value={source}
            onChange={(value) => this.onChange({ source: value })}
          >
            {SOURCES.map((i) => (
              <Select.Option value={i} key={i}>
                {i}
              </Select.Option>
            ))}
          </Select>
          {this.renderBySource()}
          {
              showErrors ? (
                <ul>
                  {errors.map((error) => <li>{error.message}</li>)}
                </ul>
              ) : null
            }
        </FormContainer>
      );
    }
}

const FormContainer = styled.div`
  display: grid;
  grid-gap: 10px;
`;
