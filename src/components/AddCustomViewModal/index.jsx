/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Select } from 'antd';
import styled from 'styled-components';

import SourceCollectionCreator from './SourceCollectionCreator';
import validateValues from './validateValuesBySchema';


const SOURCES = ['collections'];

export default class AddCustomViewModal extends Component {
    static propTypes = {
      onConfirm: PropTypes.func.isRequired,
      isVisible: PropTypes.bool,
      onCancel: PropTypes.func.isRequired,
      collectionsConfig: PropTypes.object.isRequired,
    }

    static defaultProps = {
      isVisible: false,
    }

    state = {
      name: undefined,
      source: undefined,
      type: undefined,
      collection: undefined,
      projection: [],
      metadata: [],
      errors: [],
      categorizedBy: undefined,
    }

    onChange(values) {
      this.setState({
        ...values,
      }, () => this.validate());
    }

    getValuesForCreation() {
      const {
        name, type, collection, projection, metadata, categorizedBy,
      } = this.state;
      return {
        name, type, collection, projection, metadata, categorizedBy,
      };
    }

    validate() {
      const values = this.getValuesForCreation();
      const validation = validateValues(values);
      const { errors } = validation;
      this.setState({
        errors,
      });
      return validation.isValid;
    }

    renderBySource() {
      const { collectionsConfig } = this.props;
      const {
        source, type, collection, projection, metadata, categorizedBy,
      } = this.state;
      switch (source) {
        case 'collections': {
          return (
            <SourceCollectionCreator
              collectionsConfig={collectionsConfig}
              type={type}
              collection={collection}
              projection={projection}
              categorizedBy={categorizedBy}
              metadata={metadata}
              onChange={(values) => {
                this.onChange({
                  ...values,
                });
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
        onConfirm, isVisible, onCancel,
      } = this.props;
      const {
        name, source, showErrors, errors, type,
      } = this.state;

      return (
        <Modal
          visible={isVisible}
          onCancel={onCancel}
          onOk={() => {
            const isValid = this.validate();
            if (isValid) {
              onConfirm(this.getValuesForCreation());
            }
          }}
          okButtonProps={{
            disabled: !type || errors.length > 0,
          }}
        >
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
        </Modal>
      );
    }
}

const FormContainer = styled.div`
  display: grid;
  grid-gap: 10px;
`;
