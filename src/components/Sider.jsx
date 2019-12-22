import React from 'react';
import PropTypes from 'prop-types';
import {
  Layout, Menu, Icon as AntdIcon,
} from 'antd';
import styled from 'styled-components';

const { SubMenu } = Menu;

function Sider({
  menuItems, onCategoryClick, onClickAdd, defaultOpenKeys,
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
        onClick={(item) => onCategoryClick(item.key)}
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
                      {
                        menuItem.addButton
                          ? (
                            <div style={{ display: 'inline-block', float: 'right' }}>
                              <Icon
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onClickAdd(menuItem.id);
                                }}
                                type="plus-circle"
                              />
                            </div>
                          ) : null
                      }
                    </span>
            )}
                >
                  {
            menuItem.children.map((child) => (
              <Menu.Item key={child.id}>{child.name}</Menu.Item>
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
  onCategoryClick: PropTypes.func.isRequired,
  onClickAdd: PropTypes.func.isRequired,
};


export default Sider;
