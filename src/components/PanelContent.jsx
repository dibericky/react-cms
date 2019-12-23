import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

const { Content } = Layout;

export default function PanelContent({ children }) {
  return (
    <Content
      style={{
        background: '#fff',
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
      {children}
    </Content>
  );
}

PanelContent.propTypes = {
  children: PropTypes.node.isRequired,
}
;