/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Switch, Route } from 'react-router';
import PropTypes from 'prop-types';
import { join } from 'path';
import { Layout } from 'antd';

import ListContent from './ListContent';
import DetailItemContent from './DetailItemContent';

const { Content: AntdContent } = Layout;

export default function Content({ basePath }) {
  return (
    <AntdContent
      style={{
        background: '#fff',
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
      <Switch>
        <Route path={join(basePath, 'default', ':content', ':id')} component={DetailItemContent} />
        <Route path={join(basePath, ':type', ':content')} component={ListContent} />
      </Switch>
    </AntdContent>
  );
}

Content.propTypes = {
  basePath: PropTypes.string.isRequired,
};
