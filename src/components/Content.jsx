import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router';
import { join } from 'path';

import ListContent from './ListContent';
import DetailItemContent from './DetaiItemContent';

const { Content: AntdContent } = Layout;

export default function Content({
  name,
  data,
  config,
  editCollectionItemById,
  isCustom,
  basePath,
}) {
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
        {!isCustom ? (
          <Route path={join(basePath, ':id')} component={DetailItemContent} />
        ) : null}
        <Route
          path={basePath}
          render={() => (
            <ListContent
              name={name}
              data={data}
              config={config}
              editCollectionItemById={editCollectionItemById}
            />
          )}
        />
        <Redirect to="/" />
      </Switch>
    </AntdContent>
  );
}

Content.propTypes = {
  name: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  config: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ),
  editCollectionItemById: PropTypes.func.isRequired,
  isCustom: PropTypes.bool,
  basePath: PropTypes.string.isRequired,
};

Content.defaultProps = {
  name: null,
  data: [],
  config: [],
  isCustom: false,
};
