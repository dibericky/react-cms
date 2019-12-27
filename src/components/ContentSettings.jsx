/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit, equals } from 'ramda';
import { Button } from 'antd';

import PanelContent from './PanelContent';
import FormCustomView from './FormCustomView/index';
import validateValues from './FormCustomView/validateValuesBySchema';

export default class ContentSettings extends Component {
  static propTypes = {
    view: PropTypes.object,
    type: PropTypes.oneOf(['custom']),
    configs: PropTypes.object,
    editCustomView: PropTypes.func,
  }

  static defaultProps = {
    view: {},
    type: undefined,
    configs: {},
    editCustomView: () => {},
  }


  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      isSaving: false,
      values: omit(['id'], props.view),
    };
  }

  componentDidUpdate(prevProps) {
    const { view } = this.props;
    const { view: prevView } = prevProps;

    if (!equals(view, prevView)) {
      this.setState({
        values: omit(['id'], view),
      });
    }
  }

  saveValues = () => {
    const { editCustomView } = this.props;
    const { values, errors } = this.state;
    if (errors.length === 0) {
      this.setState({ isSaving: true });
      editCustomView(values, () => {
        this.setState({ isSaving: false });
      });
    }
  }

  onChange = (changedValue) => {
    const { values } = this.state;
    const newValues = {
      ...values,
      ...changedValue,
    };
    const validation = validateValues(newValues);
    const { errors } = validation;
    this.setState({
      errors,
      values: newValues,
    });
  }

  render() {
    const { type, configs } = this.props;
    const { errors, values, isSaving } = this.state;
    if (type !== 'custom') {
      return null;
    }
    return (
      <PanelContent>
        <div style={{ display: 'grid', gridGap: 10, gridTemplateRows: '1fr min-content' }}>
          <div>
            <FormCustomView
              fields={values}
              onChange={this.onChange}
              showErrors={errors.length > 0}
              errors={errors}
              collectionsConfig={configs}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="primary"
              onClick={this.saveValues}
              disabled={errors.length !== 0}
              loading={isSaving}
            >
            Save
            </Button>
          </div>
        </div>
      </PanelContent>
    );
  }
}
