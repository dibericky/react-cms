import React from 'react';
import { Layout } from 'antd';
import { Route, Redirect, Switch } from 'react-router';

import Header from './components/Header';

import CollectionsSection from './containers/CollectionsSection';

function App() {
  return (
    <Layout style={{ height: '100%', overflow: 'hidden' }}>
      <Header />
      <Switch>
        <Route path="/collections" component={CollectionsSection} />
        <Redirect to="/collections" />
      </Switch>
    </Layout>
  );
}

export default App;
