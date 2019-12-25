/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Switch, Route } from 'react-router';
import PropTypes from 'prop-types';
import { join } from 'path';

import ListContent from './ListContent';
import ContentSettings from './ContentSettings';

export default function ViewsContentRouting({ match: { path } }) {
  return (
    <Switch>
      <Route path={join(path, 'category', ':category?')} component={ListContent} />
      <Route path={join(path, 'settings')} component={ContentSettings} />
      <Route component={ListContent} />
    </Switch>
  );
}

ViewsContentRouting.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};
