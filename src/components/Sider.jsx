import React from 'react';
import PropTypes from 'prop-types';
import {
  Layout, Menu, Icon as AntdIcon,
} from 'antd';
import styled from 'styled-components';

const { SubMenu } = Menu;

function ClickableMenuIcon({ onClick, icon }) {
  return (
    <Icon
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      type={icon}
    />
  );
}

function Sider({
  menuItems, onItemViewClick, onClickAdd, defaultOpenKeys, onEditViewClick,
}) {
  return (
    <Layout.Sider
      width={200}
      collapsed={false}
      style={{
        background: '#fff',
        maxHeight: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <Menu
        mode="inline"
        defaultOpenKeys={defaultOpenKeys}
        style={{ height: '100%', borderRight: 0 }}
        onClick={(item) => onItemViewClick(item.key)}
      >
        {
          menuItems.map((menuItem) => {
            if (menuItem.children) {
              return (
                <SubMenu
                  key={menuItem.id}
                  title={(
                    <span>
                      <AntdIcon type="user" />
                      {menuItem.name}
                      <div style={{ display: 'inline-block', float: 'right' }}>
                        {
                        menuItem.addButton
                          ? (
                            <ClickableMenuIcon
                              onClick={() => onClickAdd(menuItem.id)}
                              icon="plus-circle"
                            />
                          ) : null
                      }
                      </div>
                    </span>
            )}
                >
                  {
            menuItem.children.map((child) => (
              <Menu.Item
                key={child.id}
              >
                {child.name}
                <div style={{ display: 'inline-block', float: 'right' }}>
                  {
                        child.editPath
                          ? (
                            <ClickableMenuIcon
                              onClick={() => onEditViewClick(child.editPath)}
                              icon="edit"
                            />
                          ) : null
                      }
                </div>
              </Menu.Item>
            ))
          }
                </SubMenu>
              );
            }
            return (
              <Menu.Item key={menuItem.id}>{menuItem.name}</Menu.Item>
            );
          })
        }
      </Menu>
    </Layout.Sider>
  );
}

const Icon = styled(AntdIcon)`
  color:  #1890ff;

  &:hover {
    color: #7abdfb;
  }
`;
Sider.defaultProps = {
  menuItems: [],
  defaultOpenKeys: [],
};
Sider.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      children: PropTypes.arrayOf(PropTypes.shape()),
      addButton: PropTypes.bool,
    }),
  ),
  defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
  onItemViewClick: PropTypes.func.isRequired,
  onEditViewClick: PropTypes.func.isRequired,
  onClickAdd: PropTypes.func.isRequired,
};


export default Sider;
