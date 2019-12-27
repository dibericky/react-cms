/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import validateValues from './FormCustomView/validateValuesBySchema';
import FormCustomView from './FormCustomView/index';

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

    onChange = (values) => {
      this.setState({
        ...values,
      }, () => this.validate());
    }

    getValuesForCreation() {
      const {
        name, type, collection, projection, metadata, categorizedBy, source,
      } = this.state;
      return {
        name, type, collection, projection, metadata, categorizedBy, source,
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

    render() {
      const {
        onConfirm, isVisible, onCancel, collectionsConfig,
      } = this.props;
      const {
        showErrors, errors, type,
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
          <FormCustomView
            fields={this.getValuesForCreation()}
            onChange={this.onChange}
            showErrors={showErrors}
            errors={errors}
            collectionsConfig={collectionsConfig}
          />
        </Modal>
      );
    }
}
