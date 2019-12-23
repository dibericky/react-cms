/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Switch, Route } from 'react-router';
import PropTypes from 'prop-types';
import { join } from 'path';

import ListContent from './ListContent';
import DetailItemContent from './DetailItemContent';


export default function Content({ basePath }) {
  return (
    <Switch>
      <Route path={join(basePath, 'default', ':content', ':id')} component={DetailItemContent} />
      <Route path={join(basePath, ':type', ':content', ':category?')} component={ListContent} />
    </Switch>
  );
}

Content.propTypes = {
  basePath: PropTypes.string.isRequired,
};
