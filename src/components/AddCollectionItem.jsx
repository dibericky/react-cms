/* eslint-disable react/state-in-constructor */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditableItemOverview from './EditableItemOverview';

export default class AddCollectionItem extends Component {
    static propTypes = {
      config: PropTypes.arrayOf(PropTypes.object).isRequired,
    }

    state = {
      data: {},
    }

    render() {
      const { config } = this.props;
      const { data } = this.state;
      return (
        <EditableItemOverview
          data={data}
          config={config}
          editCollectionItemById={(values) => {
            this.state({
              data: {
                ...data,
                ...values,
              },
            });
          }}
        />
      );
    }
}
